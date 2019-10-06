"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
const AppError_1 = require("../../../../shared/core/AppError");
const RefreshAccessTokenErrors_1 = require("./RefreshAccessTokenErrors");
class RefreshAccessToken {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async execute(req) {
        const { refreshToken } = req;
        let user;
        let username;
        try {
            // Get the username for the user that owns the refresh token
            try {
                username = await this.authService.getUserNameFromRefreshToken(refreshToken);
            }
            catch (err) {
                return Result_1.left(new RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.RefreshTokenNotFound());
            }
            try {
                // get the user by username
                user = await this.userRepo.getUserByUserName(username);
            }
            catch (err) {
                return Result_1.left(new RefreshAccessTokenErrors_1.RefreshAccessTokenErrors.UserNotFoundOrDeletedError());
            }
            const accessToken = this.authService.signJWT({
                username: user.username.value,
                email: user.email.value,
                isEmailVerified: user.isEmailVerified,
                userId: user.userId.id.toString(),
                adminUser: user.isAdminUser,
            });
            // sign a new jwt for that user
            user.setAccessToken(accessToken, refreshToken);
            // save it
            await this.authService.saveAuthenticatedUser(user);
            // return the new access token
            return Result_1.right(Result_1.Result.ok(accessToken));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.RefreshAccessToken = RefreshAccessToken;
//# sourceMappingURL=RefreshAccessToken.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginErrors_1 = require("./LoginErrors");
const AppError_1 = require("../../../../shared/core/AppError");
const Result_1 = require("../../../../shared/core/Result");
const userName_1 = require("../../domain/userName");
const userPassword_1 = require("../../domain/userPassword");
class LoginUserUseCase {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async execute(request) {
        let user;
        let userName;
        let password;
        try {
            const usernameOrError = userName_1.UserName.create({ name: request.username });
            const passwordOrError = userPassword_1.UserPassword.create({ value: request.password });
            const payloadResult = Result_1.Result.combine([usernameOrError, passwordOrError]);
            if (payloadResult.isFailure) {
                return Result_1.left(Result_1.Result.fail(payloadResult.error));
            }
            userName = usernameOrError.getValue();
            password = passwordOrError.getValue();
            user = await this.userRepo.getUserByUserName(userName);
            const userFound = !!user;
            if (!userFound) {
                return Result_1.left(new LoginErrors_1.LoginUseCaseErrors.UserNameDoesntExistError());
            }
            const passwordValid = await user.password.comparePassword(password.value);
            if (!passwordValid) {
                return Result_1.left(new LoginErrors_1.LoginUseCaseErrors.PasswordDoesntMatchError());
            }
            const accessToken = this.authService.signJWT({
                email: user.email.value,
                isEmailVerified: user.isEmailVerified,
                userId: user.userId.toString(),
                adminUser: user.isAdminUser,
            });
            const refreshToken = this.authService
                .createRefreshToken();
            user.setAccessToken(accessToken, refreshToken);
            // await this.userRepo.save(user);
            return Result_1.right(Result_1.Result.ok({
                accessToken,
                refreshToken
            }));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err.toString()));
        }
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
//# sourceMappingURL=LoginUseCase.js.map
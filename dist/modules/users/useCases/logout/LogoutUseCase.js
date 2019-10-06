"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../shared/core/Result");
const AppError_1 = require("../../../../shared/core/AppError");
const LogoutErrors_1 = require("./LogoutErrors");
class LogoutUseCase {
    constructor(userRepo, authService) {
        this.userRepo = userRepo;
        this.authService = authService;
    }
    async execute(request) {
        let user;
        const { userId } = request;
        try {
            try {
                user = await this.userRepo.getUserByUserId(userId);
            }
            catch (err) {
                return Result_1.left(new LogoutErrors_1.LogoutErrors.UserNotFoundOrDeletedError());
            }
            await this.authService.deAuthenticateUser(user.username.value);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.LogoutUseCase = LogoutUseCase;
//# sourceMappingURL=LogoutUseCase.js.map
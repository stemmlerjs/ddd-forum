"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteUserErrors_1 = require("./DeleteUserErrors");
const Result_1 = require("../../../../shared/core/Result");
const AppError_1 = require("../../../../shared/core/AppError");
class DeleteUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(request) {
        try {
            const user = await this.userRepo.getUserByUserId(request.userId);
            const userFound = !!user === true;
            if (!userFound) {
                return Result_1.left(new DeleteUserErrors_1.DeleteUserErrors.UserNotFoundError());
            }
            user.delete();
            await this.userRepo.save(user);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.DeleteUserUseCase = DeleteUserUseCase;
//# sourceMappingURL=DeleteUserUseCase.js.map
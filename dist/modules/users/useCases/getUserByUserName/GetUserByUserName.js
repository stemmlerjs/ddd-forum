"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GetUserByUserNameErrors_1 = require("./GetUserByUserNameErrors");
const Result_1 = require("../../../../shared/core/Result");
const userName_1 = require("../../domain/userName");
const AppError_1 = require("../../../../shared/core/AppError");
class GetUserByUserName {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(request) {
        try {
            const userNameOrError = userName_1.UserName.create({ name: request.username });
            if (userNameOrError.isFailure) {
                return Result_1.left(Result_1.Result.fail(userNameOrError.error.toString()));
            }
            const userName = userNameOrError.getValue();
            const user = await this.userRepo.getUserByUserName(userName);
            const userFound = !!user === true;
            if (userFound) {
                return Result_1.left(new GetUserByUserNameErrors_1.GetUserByUserNameErrors.UserNotFoundError(userName.value));
            }
            return Result_1.right(Result_1.Result.ok(user));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetUserByUserName = GetUserByUserName;
//# sourceMappingURL=GetUserByUserName.js.map
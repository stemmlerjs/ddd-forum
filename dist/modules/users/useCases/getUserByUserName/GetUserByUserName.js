"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("shared/core/Result");
const userName_1 = require("modules/users/domain/userName");
class GetUserByUserName {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(request) {
        const userNameOrError = userName_1.UserName.create({ name: request.username });
        if (userNameOrError.isFailure) {
            return Result_1.left(Result_1.Result.fail(userNameOrError.error.toString()));
        }
        const userName = userNameOrError.getValue();
        const user = await this.userRepo.getUserByUserName(userName);
    }
}
exports.GetUserByUserName = GetUserByUserName;
//# sourceMappingURL=GetUserByUserName.js.map
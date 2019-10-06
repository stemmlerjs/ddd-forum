"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const GetMemberByUserNameErrors_1 = require("./GetMemberByUserNameErrors");
class GetMemberByUserName {
    constructor(memberRepo) {
        this.memberRepo = memberRepo;
    }
    async execute(request) {
        let memberDetails;
        const { username } = request;
        try {
            try {
                memberDetails = await this.memberRepo.getMemberDetailsByUserName(username);
            }
            catch (err) {
                return Result_1.left(new GetMemberByUserNameErrors_1.GetMemberByUserNameErrors.MemberNotFoundError(username));
            }
            return Result_1.right(Result_1.Result.ok(memberDetails));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetMemberByUserName = GetMemberByUserName;
//# sourceMappingURL=GetMemberByUserName.js.map
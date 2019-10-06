"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const CreateMemberErrors_1 = require("./CreateMemberErrors");
const member_1 = require("../../../domain/member");
class CreateMember {
    constructor(userRepo, memberRepo) {
        this.userRepo = userRepo;
        this.memberRepo = memberRepo;
    }
    async execute(request) {
        let user;
        let member;
        const { userId } = request;
        try {
            try {
                user = await this.userRepo.getUserByUserId(userId);
            }
            catch (err) {
                return Result_1.left(new CreateMemberErrors_1.CreateMemberErrors.UserDoesntExistError(userId));
            }
            try {
                member = await this.memberRepo.getMemberByUserId(userId);
                const memberExists = !!member === true;
                if (memberExists) {
                    return Result_1.left(new CreateMemberErrors_1.CreateMemberErrors.MemberAlreadyExistsError(userId));
                }
            }
            catch (err) { }
            // Member doesn't exist already (good), so we want to create it
            const memberOrError = member_1.Member.create({
                userId: user.userId,
                username: user.username,
            });
            if (memberOrError.isFailure) {
                return Result_1.left(memberOrError);
            }
            member = memberOrError.getValue();
            await this.memberRepo.save(member);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
        return null;
    }
}
exports.CreateMember = CreateMember;
//# sourceMappingURL=CreateMember.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const member_1 = require("../domain/member");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const userName_1 = require("../../users/domain/userName");
const userId_1 = require("../../users/domain/userId");
class MemberMap {
    static toDomain(raw) {
        const userNameOrError = userName_1.UserName.create({ name: raw.BaseUser.username });
        const userIdOrError = userId_1.UserId.create(new UniqueEntityID_1.UniqueEntityID(raw.BaseUser.base_user_id));
        const memberOrError = member_1.Member.create({
            username: userNameOrError.getValue(),
            reputation: raw.reputation,
            userId: userIdOrError.getValue()
        }, new UniqueEntityID_1.UniqueEntityID(raw.member_id));
        memberOrError.isFailure ? console.log(memberOrError.error) : '';
        return memberOrError.isSuccess ? memberOrError.getValue() : null;
    }
    static toPersistence(member) {
        return {
            member_id: member.memberId.id.toString(),
            member_base_id: member.userId.id.toString(),
            reputation: member.reputation
        };
    }
}
exports.MemberMap = MemberMap;
//# sourceMappingURL=memberMap.js.map
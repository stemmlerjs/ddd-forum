"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const memberId_1 = require("../domain/memberId");
class MemberIdMap {
    static toDomain(rawMember) {
        const memberIdOrError = memberId_1.MemberId.create(new UniqueEntityID_1.UniqueEntityID(rawMember.member_id));
        return memberIdOrError.isSuccess ? memberIdOrError.getValue() : null;
    }
}
exports.MemberIdMap = MemberIdMap;
//# sourceMappingURL=memberIdMap.js.map
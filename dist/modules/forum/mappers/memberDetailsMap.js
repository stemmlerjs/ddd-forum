"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memberDetails_1 = require("../domain/memberDetails");
const userName_1 = require("../../users/domain/userName");
class MemberDetailsMap {
    static toDomain(raw) {
        const userNameOrError = userName_1.UserName.create({ name: raw.BaseUser.username });
        const memberDetailsOrError = memberDetails_1.MemberDetails.create({
            reputation: raw.reputation,
            username: userNameOrError.getValue(),
        });
        memberDetailsOrError.isFailure ? console.log(memberDetailsOrError.error) : '';
        return memberDetailsOrError.isSuccess ? memberDetailsOrError.getValue() : null;
    }
    static toDTO(memberDetails) {
        return {
            reputation: memberDetails.reputation,
            user: {
                username: memberDetails.username.value
            }
        };
    }
}
exports.MemberDetailsMap = MemberDetailsMap;
//# sourceMappingURL=memberDetailsMap.js.map
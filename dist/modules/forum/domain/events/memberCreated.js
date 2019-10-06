"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemberCreated {
    constructor(member) {
        this.dateTimeOccurred = new Date();
        this.member = member;
    }
    getAggregateId() {
        return this.member.id;
    }
}
exports.MemberCreated = MemberCreated;
//# sourceMappingURL=memberCreated.js.map
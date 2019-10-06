"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
const memberCreated_1 = require("./events/memberCreated");
const memberId_1 = require("./memberId");
class Member extends AggregateRoot_1.AggregateRoot {
    get memberId() {
        return memberId_1.MemberId.create(this._id)
            .getValue();
    }
    get userId() {
        return this.props.userId;
    }
    get username() {
        return this.props.username;
    }
    get reputation() {
        return this.props.reputation;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.userId, argumentName: 'userId' },
            { argument: props.username, argumentName: 'username' }
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        const defaultValues = Object.assign(Object.assign({}, props), { reputation: props.reputation ? props.reputation : 0 });
        const member = new Member(defaultValues, id);
        const isNewMember = !!id === false;
        if (isNewMember) {
            member.addDomainEvent(new memberCreated_1.MemberCreated(member));
        }
        return Result_1.Result.ok(member);
    }
}
exports.Member = Member;
//# sourceMappingURL=member.js.map
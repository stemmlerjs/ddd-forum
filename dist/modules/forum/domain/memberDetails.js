"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
/**
 * @desc Read model for member
 */
class MemberDetails extends ValueObject_1.ValueObject {
    get username() {
        return this.props.username;
    }
    get reputation() {
        return this.props.reputation;
    }
    get isAdminUser() {
        return this.props.isAdminUser;
    }
    get isDeleted() {
        return this.props.isDeleted;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.username, argumentName: 'username' },
            { argument: props.reputation, argumentName: 'reputation' }
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        return Result_1.Result.ok(new MemberDetails(Object.assign(Object.assign({}, props), { isAdminUser: props.isAdminUser ? props.isAdminUser : false, isDeleted: props.isDeleted ? props.isDeleted : false })));
    }
}
exports.MemberDetails = MemberDetails;
//# sourceMappingURL=memberDetails.js.map
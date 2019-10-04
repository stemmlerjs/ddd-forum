"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../shared/core/Result");
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Guard_1 = require("../../../shared/core/Guard");
class UserName extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.name;
    }
    static create(props) {
        const usernameResult = Guard_1.Guard.againstNullOrUndefined(props.name, 'username');
        if (!usernameResult.succeeded) {
            return Result_1.Result.fail(usernameResult.message);
        }
        const minLengthResult = Guard_1.Guard.againstAtLeast(this.minLength, props.name);
        if (!minLengthResult.succeeded) {
            return Result_1.Result.fail(minLengthResult.message);
        }
        const maxLengthResult = Guard_1.Guard.againstAtMost(this.maxLength, props.name);
        if (!maxLengthResult.succeeded) {
            return Result_1.Result.fail(minLengthResult.message);
        }
        return Result_1.Result.ok(new UserName(props));
    }
}
exports.UserName = UserName;
UserName.maxLength = 15;
UserName.minLength = 2;
//# sourceMappingURL=userName.js.map
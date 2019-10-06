"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class PostTitle extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(props) {
        const nullGuardResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'postTitle');
        if (!nullGuardResult.succeeded) {
            return Result_1.Result.fail(nullGuardResult.message);
        }
        const minGuardResult = Guard_1.Guard.againstAtLeast(this.minLength, props.value);
        const maxGuardResult = Guard_1.Guard.againstAtMost(this.maxLength, props.value);
        if (!minGuardResult.succeeded) {
            return Result_1.Result.fail(minGuardResult.message);
        }
        if (!maxGuardResult.succeeded) {
            return Result_1.Result.fail(maxGuardResult.message);
        }
        return Result_1.Result.ok(new PostTitle(props));
    }
}
exports.PostTitle = PostTitle;
PostTitle.minLength = 2;
PostTitle.maxLength = 85;
//# sourceMappingURL=postTitle.js.map
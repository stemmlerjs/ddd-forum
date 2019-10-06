"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class PostText extends ValueObject_1.ValueObject {
    constructor(props) {
        super(props);
    }
    static create(props) {
        const nullGuardResult = Guard_1.Guard.againstNullOrUndefined(props.value, 'postText');
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
        return Result_1.Result.ok(new PostText(props));
    }
}
exports.PostText = PostText;
PostText.minLength = 2;
PostText.maxLength = 10000;
//# sourceMappingURL=postText.js.map
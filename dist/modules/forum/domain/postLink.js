"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
const TextUtils_1 = require("../../../shared/utils/TextUtils");
class PostLink extends ValueObject_1.ValueObject {
    get url() {
        return this.props.url;
    }
    constructor(props) {
        super(props);
    }
    ;
    static create(props) {
        const nullGuard = Guard_1.Guard.againstNullOrUndefined(props.url, 'url');
        if (!nullGuard.succeeded) {
            return Result_1.Result.fail(nullGuard.message);
        }
        if (!TextUtils_1.TextUtils.validateWebURL(props.url)) {
            return Result_1.Result.fail(`Url {${props.url}} is not valid.`);
        }
        return Result_1.Result.ok(new PostLink(props));
    }
}
exports.PostLink = PostLink;
//# sourceMappingURL=postLink.js.map
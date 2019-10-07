"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var ReplyToPostErrors;
(function (ReplyToPostErrors) {
    class PostNotFoundError extends Result_1.Result {
        constructor(slug) {
            super(false, {
                message: `Couldn't find a post by slug {${slug}}.`
            });
        }
    }
    ReplyToPostErrors.PostNotFoundError = PostNotFoundError;
})(ReplyToPostErrors = exports.ReplyToPostErrors || (exports.ReplyToPostErrors = {}));
//# sourceMappingURL=ReplyToPostErrors.js.map
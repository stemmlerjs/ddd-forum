"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var GetPostBySlugErrors;
(function (GetPostBySlugErrors) {
    class PostNotFoundError extends Result_1.Result {
        constructor(slug) {
            super(false, {
                message: `Couldn't find a post by slug {${slug}}.`
            });
        }
    }
    GetPostBySlugErrors.PostNotFoundError = PostNotFoundError;
})(GetPostBySlugErrors = exports.GetPostBySlugErrors || (exports.GetPostBySlugErrors = {}));
//# sourceMappingURL=GetPostBySlugErrors.js.map
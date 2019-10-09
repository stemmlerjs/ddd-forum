"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var GetCommentsByPostSlugErrors;
(function (GetCommentsByPostSlugErrors) {
    class PostNotFoundError extends Result_1.Result {
        constructor(slug) {
            super(false, {
                message: `Couldn't find a post by slug {${slug}}.`
            });
        }
    }
    GetCommentsByPostSlugErrors.PostNotFoundError = PostNotFoundError;
})(GetCommentsByPostSlugErrors = exports.GetCommentsByPostSlugErrors || (exports.GetCommentsByPostSlugErrors = {}));
//# sourceMappingURL=GetCommentsByPostSlugErrors.js.map
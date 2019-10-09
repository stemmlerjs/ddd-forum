"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var GetCommentByCommentIdErrors;
(function (GetCommentByCommentIdErrors) {
    class CommentNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a comment by comment id {${commentId}}.`
            });
        }
    }
    GetCommentByCommentIdErrors.CommentNotFoundError = CommentNotFoundError;
})(GetCommentByCommentIdErrors = exports.GetCommentByCommentIdErrors || (exports.GetCommentByCommentIdErrors = {}));
//# sourceMappingURL=GetCommentByCommentIdErrors.js.map
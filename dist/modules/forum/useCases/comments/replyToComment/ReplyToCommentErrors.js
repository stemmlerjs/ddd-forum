"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var ReplyToCommentErrors;
(function (ReplyToCommentErrors) {
    class PostNotFoundError extends Result_1.Result {
        constructor(slug) {
            super(false, {
                message: `Couldn't find a post by slug {${slug}}.`
            });
        }
    }
    ReplyToCommentErrors.PostNotFoundError = PostNotFoundError;
    class CommentNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a comment by commentId {${commentId}}.`
            });
        }
    }
    ReplyToCommentErrors.CommentNotFoundError = CommentNotFoundError;
    class MemberNotFoundError extends Result_1.Result {
        constructor(userId) {
            super(false, {
                message: `Couldn't find a member by userId {${userId}}.`
            });
        }
    }
    ReplyToCommentErrors.MemberNotFoundError = MemberNotFoundError;
})(ReplyToCommentErrors = exports.ReplyToCommentErrors || (exports.ReplyToCommentErrors = {}));
//# sourceMappingURL=ReplyToCommentErrors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var DownvoteCommentErrors;
(function (DownvoteCommentErrors) {
    class MemberNotFoundError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Couldn't find a member to downvote the comment.`
            });
        }
    }
    DownvoteCommentErrors.MemberNotFoundError = MemberNotFoundError;
    class CommentNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a comment with id {${commentId}}.`
            });
        }
    }
    DownvoteCommentErrors.CommentNotFoundError = CommentNotFoundError;
    class PostNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a post for comment {${commentId}}.`
            });
        }
    }
    DownvoteCommentErrors.PostNotFoundError = PostNotFoundError;
})(DownvoteCommentErrors = exports.DownvoteCommentErrors || (exports.DownvoteCommentErrors = {}));
//# sourceMappingURL=DownvoteCommentErrors.js.map
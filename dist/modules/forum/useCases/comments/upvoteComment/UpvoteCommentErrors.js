"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var UpvoteCommentErrors;
(function (UpvoteCommentErrors) {
    class MemberNotFoundError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Couldn't find a member to upvote the post.`
            });
        }
    }
    UpvoteCommentErrors.MemberNotFoundError = MemberNotFoundError;
    class CommentNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a comment with id {${commentId}}.`
            });
        }
    }
    UpvoteCommentErrors.CommentNotFoundError = CommentNotFoundError;
    class PostNotFoundError extends Result_1.Result {
        constructor(commentId) {
            super(false, {
                message: `Couldn't find a post for comment {${commentId}}.`
            });
        }
    }
    UpvoteCommentErrors.PostNotFoundError = PostNotFoundError;
})(UpvoteCommentErrors = exports.UpvoteCommentErrors || (exports.UpvoteCommentErrors = {}));
//# sourceMappingURL=UpvoteCommentErrors.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var UpvotePostErrors;
(function (UpvotePostErrors) {
    class MemberNotFoundError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Couldn't find a member to upvote the post.`
            });
        }
    }
    UpvotePostErrors.MemberNotFoundError = MemberNotFoundError;
    class PostNotFoundError extends Result_1.Result {
        constructor(postId) {
            super(false, {
                message: `Couldn't find a post by postId {${postId}}.`
            });
        }
    }
    UpvotePostErrors.PostNotFoundError = PostNotFoundError;
    class AlreadyUpvotedError extends Result_1.Result {
        constructor(postId, userId) {
            super(false, {
                message: `This post was already upvoted postId {${postId}}, userId {${userId}}.`
            });
        }
    }
    UpvotePostErrors.AlreadyUpvotedError = AlreadyUpvotedError;
})(UpvotePostErrors = exports.UpvotePostErrors || (exports.UpvotePostErrors = {}));
//# sourceMappingURL=UpvotePostErrors.js.map
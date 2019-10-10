"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
var DownvotePostErrors;
(function (DownvotePostErrors) {
    class MemberNotFoundError extends Result_1.Result {
        constructor() {
            super(false, {
                message: `Couldn't find a member to upvote the post.`
            });
        }
    }
    DownvotePostErrors.MemberNotFoundError = MemberNotFoundError;
    class PostNotFoundError extends Result_1.Result {
        constructor(slug) {
            super(false, {
                message: `Couldn't find a post by slug {${slug}}.`
            });
        }
    }
    DownvotePostErrors.PostNotFoundError = PostNotFoundError;
    class AlreadyDownvotedError extends Result_1.Result {
        constructor(postId, memberId) {
            super(false, {
                message: `This post was already downvoted, postId {${postId}}, memberId {${memberId}}.`
            });
        }
    }
    DownvotePostErrors.AlreadyDownvotedError = AlreadyDownvotedError;
})(DownvotePostErrors = exports.DownvotePostErrors || (exports.DownvotePostErrors = {}));
//# sourceMappingURL=DownvotePostErrors.js.map
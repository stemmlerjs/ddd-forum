"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../comment");
const Result_1 = require("../../../../shared/core/Result");
class PostService {
    // public upvotePost (): Either<Result<any>, Result<Post>> {
    // }
    replyToComment(post, member, parentComment, newCommentText) {
        const commentOrError = comment_1.Comment.create({
            memberId: member.memberId,
            text: newCommentText,
            postId: post.postId,
            parentCommentId: parentComment.commentId
        });
        if (commentOrError.isFailure) {
            return Result_1.left(commentOrError);
        }
        const comment = commentOrError.getValue();
        post.addComment(comment);
        return Result_1.right(Result_1.Result.ok(post));
    }
}
exports.PostService = PostService;
//# sourceMappingURL=postService.js.map
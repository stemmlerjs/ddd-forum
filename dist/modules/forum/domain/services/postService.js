"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../comment");
const Result_1 = require("../../../../shared/core/Result");
const postVote_1 = require("../postVote");
const commentVote_1 = require("../commentVote");
class PostService {
    toggleCommentDownvote(post, member, comment, existingVotesOnCommentByMember) {
        const existingDownvote = existingVotesOnCommentByMember
            .find((v) => v.isUpvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            comment.removeVote(existingDownvote);
        }
        else {
            const downvoteOrError = commentVote_1.CommentVote
                .createDownvote(member.memberId, comment.commentId);
            if (downvoteOrError.isFailure) {
                return Result_1.left(downvoteOrError);
            }
            const downvote = downvoteOrError.getValue();
            comment.addVote(downvote);
        }
        // Aggregate knows the update
        post.updateComment(comment);
        return Result_1.right(Result_1.Result.ok());
    }
    toggleCommentUpvote(post, member, comment, existingVotesOnCommentByMember) {
        const existingUpvote = existingVotesOnCommentByMember
            .find((v) => v.isUpvote());
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            comment.removeVote(existingUpvote);
        }
        else {
            const upvoteOrError = commentVote_1.CommentVote
                .createUpvote(member.memberId, comment.commentId);
            if (upvoteOrError.isFailure) {
                return Result_1.left(upvoteOrError);
            }
            const upvote = upvoteOrError.getValue();
            comment.addVote(upvote);
        }
        // Aggregate knows the update
        post.updateComment(comment);
        return Result_1.right(Result_1.Result.ok());
    }
    togglePostDownvote(post, member, existingVotesOnPostByMember) {
        const existingDownvote = existingVotesOnPostByMember
            .find((v) => v.isDownvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            post.removeVote(existingDownvote);
            return Result_1.right(Result_1.Result.ok());
        }
        const downvoteOrError = postVote_1.PostVote
            .createDownvote(member.memberId, post.postId);
        if (downvoteOrError.isFailure) {
            return Result_1.left(downvoteOrError);
        }
        const downvote = downvoteOrError.getValue();
        post.addVote(downvote);
        return Result_1.right(Result_1.Result.ok());
    }
    togglePostUpvote(post, member, existingVotesOnPostByMember) {
        const existingUpvote = existingVotesOnPostByMember
            .find((v) => v.isUpvote());
        // If already upvoted, remove the upvote
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            post.removeVote(existingUpvote);
            return Result_1.right(Result_1.Result.ok());
        }
        // If not upvoted, add to votes
        const upvoteOrError = postVote_1.PostVote
            .createUpvote(member.memberId, post.postId);
        if (upvoteOrError.isFailure) {
            return Result_1.left(upvoteOrError);
        }
        const upvote = upvoteOrError.getValue();
        post.addVote(upvote);
        return Result_1.right(Result_1.Result.ok());
    }
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
        return Result_1.right(Result_1.Result.ok());
    }
}
exports.PostService = PostService;
//# sourceMappingURL=postService.js.map
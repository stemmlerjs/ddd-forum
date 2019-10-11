"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../comment");
const Result_1 = require("../../../../shared/core/Result");
const postVote_1 = require("../postVote");
const commentVote_1 = require("../commentVote");
class PostService {
    downvoteComment(post, member, comment, existingVotesOnCommentByMember) {
        // If it was already downvoted, do nothing.
        const existingDownvote = existingVotesOnCommentByMember
            .find((v) => v.isDownvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            // Do nothing
            return Result_1.right(Result_1.Result.ok());
        }
        // If upvote exists, we need to remove it.
        const existingUpvote = existingVotesOnCommentByMember
            .find((v) => v.isUpvote());
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            comment.removeVote(existingUpvote);
            post.updateComment(comment);
            return Result_1.right(Result_1.Result.ok());
        }
        // Neither, let's create the downvote ourselves.
        const downvoteOrError = commentVote_1.CommentVote
            .createDownvote(member.memberId, comment.commentId);
        if (downvoteOrError.isFailure) {
            return Result_1.left(downvoteOrError);
        }
        const downvote = downvoteOrError.getValue();
        comment.addVote(downvote);
        post.updateComment(comment);
        return Result_1.right(Result_1.Result.ok());
    }
    upvoteComment(post, member, comment, existingVotesOnCommentByMember) {
        // If upvote already exists 
        const existingUpvote = existingVotesOnCommentByMember
            .find((v) => v.isUpvote());
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            // Do nothing
            return Result_1.right(Result_1.Result.ok());
        }
        // If downvote exists, we need to promote the remove it.
        const existingDownvote = existingVotesOnCommentByMember
            .find((v) => v.isDownvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            comment.removeVote(existingDownvote);
            post.updateComment(comment);
            return Result_1.right(Result_1.Result.ok());
        }
        // Otherwise, give the comment an upvote
        const upvoteOrError = commentVote_1.CommentVote
            .createUpvote(member.memberId, comment.commentId);
        if (upvoteOrError.isFailure) {
            return Result_1.left(upvoteOrError);
        }
        const upvote = upvoteOrError.getValue();
        comment.addVote(upvote);
        post.updateComment(comment);
        return Result_1.right(Result_1.Result.ok());
    }
    downvotePost(post, member, existingVotesOnPostByMember) {
        // If already downvoted, do nothing
        const existingDownvote = existingVotesOnPostByMember
            .find((v) => v.isDownvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            return Result_1.right(Result_1.Result.ok());
        }
        // If upvote exists, we need to remove it
        const existingUpvote = existingVotesOnPostByMember
            .find((v) => v.isUpvote());
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            post.removeVote(existingUpvote);
            return Result_1.right(Result_1.Result.ok());
        }
        // Otherwise, we get to create the downvote now
        const downvoteOrError = postVote_1.PostVote
            .createDownvote(member.memberId, post.postId);
        if (downvoteOrError.isFailure) {
            return Result_1.left(downvoteOrError);
        }
        const downvote = downvoteOrError.getValue();
        post.addVote(downvote);
        return Result_1.right(Result_1.Result.ok());
    }
    upvotePost(post, member, existingVotesOnPostByMember) {
        const existingUpvote = existingVotesOnPostByMember
            .find((v) => v.isUpvote());
        // If already upvoted, do nothing
        const upvoteAlreadyExists = !!existingUpvote;
        if (upvoteAlreadyExists) {
            return Result_1.right(Result_1.Result.ok());
        }
        // If downvoted, remove the downvote
        const existingDownvote = existingVotesOnPostByMember
            .find((v) => v.isDownvote());
        const downvoteAlreadyExists = !!existingDownvote;
        if (downvoteAlreadyExists) {
            post.removeVote(existingDownvote);
            return Result_1.right(Result_1.Result.ok());
        }
        // Otherwise, add upvote
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
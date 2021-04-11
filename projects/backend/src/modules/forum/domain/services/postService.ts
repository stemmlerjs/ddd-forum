
import { Post } from "../post";
import { Member } from "../member";
import { Comment } from "../comment";
import { CommentText } from "../commentText";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { PostVote } from "../postVote";
import { UpvotePostResponse } from "../../useCases/post/upvotePost/UpvotePostResponse";
import { DownvotePostResponse } from "../../useCases/post/downvotePost/DownvotePostResponse";
import { CommentVote } from "../commentVote";
import { UpvoteCommentResponse } from "../../useCases/comments/upvoteComment/UpvoteCommentResonse";
import { DownvoteCommentResponse } from "../../useCases/comments/downvoteComment/DownvoteCommentResponse";

export class PostService {

  public downvoteComment (
    post: Post, 
    member: Member, 
    comment: Comment, 
    existingVotesOnCommentByMember: CommentVote[]
  ): DownvoteCommentResponse {

    // If it was already downvoted, do nothing.

    const existingDownvote: CommentVote = existingVotesOnCommentByMember
      .find((v) => v.isDownvote());

    const downvoteAlreadyExists = !!existingDownvote;

    if (downvoteAlreadyExists) {
      // Do nothing
      return right(Result.ok<void>())
    }

    // If upvote exists, we need to remove it.
    const existingUpvote: CommentVote = existingVotesOnCommentByMember
      .find((v) => v.isUpvote());

    const upvoteAlreadyExists = !!existingUpvote;

    if (upvoteAlreadyExists) {

      comment.removeVote(existingUpvote);

      post.updateComment(comment);

      return right(Result.ok<void>());
    }

    // Neither, let's create the downvote ourselves.
    const downvoteOrError = CommentVote
      .createDownvote(member.memberId, comment.commentId)

    if (downvoteOrError.isFailure) {
      return left(downvoteOrError);
    }

    const downvote: CommentVote = downvoteOrError.getValue();
    comment.addVote(downvote);
    post.updateComment(comment);

    return right(Result.ok<void>());  
  }

  public upvoteComment (
    post: Post, 
    member: Member, 
    comment: Comment, 
    existingVotesOnCommentByMember: CommentVote[]
  ): UpvoteCommentResponse {

    // If upvote already exists 
    const existingUpvote: CommentVote = existingVotesOnCommentByMember
      .find((v) => v.isUpvote());

    const upvoteAlreadyExists = !!existingUpvote;
    if (upvoteAlreadyExists) {
      // Do nothing
      return right(Result.ok<void>());
    } 
    
    // If downvote exists, we need to promote the remove it.
    const existingDownvote: CommentVote = existingVotesOnCommentByMember
      .find((v) => v.isDownvote());

    const downvoteAlreadyExists = !!existingDownvote;
    if (downvoteAlreadyExists) {
      comment.removeVote(existingDownvote);

      post.updateComment(comment);

      return right(Result.ok<void>());
    } 

    // Otherwise, give the comment an upvote
    const upvoteOrError = CommentVote
      .createUpvote(member.memberId, comment.commentId)

    if (upvoteOrError.isFailure) {
      return left(upvoteOrError);
    }

    const upvote: CommentVote = upvoteOrError.getValue();
    comment.addVote(upvote);

    post.updateComment(comment);

    return right(Result.ok<void>()); 
  }

  public downvotePost (
    post: Post,
    member: Member,
    existingVotesOnPostByMember: PostVote[]
  ): DownvotePostResponse {

    // If already downvoted, do nothing
    const existingDownvote: PostVote = existingVotesOnPostByMember
      .find((v) => v.isDownvote());

    const downvoteAlreadyExists = !!existingDownvote;

    if (downvoteAlreadyExists) {
      return right(Result.ok<void>());
    }

    // If upvote exists, we need to remove it
    const existingUpvote: PostVote = existingVotesOnPostByMember
      .find((v) => v.isUpvote());

    const upvoteAlreadyExists = !!existingUpvote;

    if (upvoteAlreadyExists) {

      post.removeVote(existingUpvote);

      return right(Result.ok<void>());
    }

    // Otherwise, we get to create the downvote now

    const downvoteOrError = PostVote
      .createDownvote(member.memberId, post.postId);

    if (downvoteOrError.isFailure) {
      return left(downvoteOrError);
    }

    const downvote: PostVote = downvoteOrError.getValue();
    post.addVote(downvote);

    return right(Result.ok<void>());
    
  }

  public upvotePost (
    post: Post, 
    member: Member, 
    existingVotesOnPostByMember: PostVote[]
  ): UpvotePostResponse {

    const existingUpvote: PostVote = existingVotesOnPostByMember
      .find((v) => v.isUpvote());

    // If already upvoted, do nothing
    const upvoteAlreadyExists = !!existingUpvote;

    if (upvoteAlreadyExists) {
      return right(Result.ok<void>());
    } 

    // If downvoted, remove the downvote
    const existingDownvote: PostVote = existingVotesOnPostByMember
    .find((v) => v.isDownvote());

    const downvoteAlreadyExists = !!existingDownvote;

    if (downvoteAlreadyExists) {
      post.removeVote(existingDownvote);
      return right(Result.ok<void>());
    }

    // Otherwise, add upvote
    const upvoteOrError = PostVote
      .createUpvote(member.memberId, post.postId);

    if (upvoteOrError.isFailure) {
      return left(upvoteOrError);
    }

    const upvote: PostVote = upvoteOrError.getValue();
    post.addVote(upvote);

    return right(Result.ok<void>());
  }

  public replyToComment (
    post: Post, 
    member: Member, 
    parentComment: Comment, 
    newCommentText: CommentText
  ): Either<Result<any>, Result<void>> {

    const commentOrError = Comment.create({
      memberId: member.memberId,
      text: newCommentText,
      postId: post.postId,
      parentCommentId: parentComment.commentId
    });

    if (commentOrError.isFailure) {
      return left(commentOrError);
    }

    const comment: Comment = commentOrError.getValue();

    post.addComment(comment);

    return right(Result.ok<void>());
  }
}
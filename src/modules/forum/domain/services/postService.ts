
import { Post } from "../post";
import { Member } from "../member";
import { Comment } from "../comment";
import { CommentText } from "../commentText";
import { Either, Result, left, right } from "../../../../shared/core/Result";
import { PostVote } from "../postVote";
import { UpvotePostResponse } from "../../useCases/post/upvotePost/UpvotePostResponse";
import { UpvotePostErrors } from "../../useCases/post/upvotePost/UpvotePostErrors";
import { DownvotePostResponse } from "../../useCases/post/downvotePost/DownvotePostResponse";
import { DownvotePostErrors } from "../../useCases/post/downvotePost/DownvotePostErrors";

export class PostService {

  public togglePostDownvote (
    post: Post,
    member: Member,
    existingVotesOnPostByMember: PostVote[]
  ): DownvotePostResponse {

    const downvoteAlreadyExists = !!existingVotesOnPostByMember
      .find((v) => v.isDownvote()); 

    if (downvoteAlreadyExists) {
      return left(
        new DownvotePostErrors.AlreadyDownvotedError(
          post.postId.id.toString(), member.memberId.id.toString()
        )
      )
    }

    const upvoteExists = !!existingVotesOnPostByMember
      .find((v) => v.isUpvote());
      
    // if (upvoteExists) {
    //   post.removeUpvote()
    // }

    const upvoteOrError = PostVote
      .createDownvote(member.memberId, post.postId);

    if (upvoteOrError.isFailure) {
      return left(upvoteOrError);
    }

    post.addVote(upvoteOrError.getValue());

    return right(Result.ok<void>());
  }

  public togglePostUpvote (
    post: Post, 
    member: Member, 
    existingVotesOnPostByMember: PostVote[]
  ): UpvotePostResponse {

    const upvoteAlreadyExists = !!existingVotesOnPostByMember
      .find((v) => v.isUpvote());

    if (upvoteAlreadyExists) {
      return left(
        new UpvotePostErrors.AlreadyUpvotedError(
          post.postId.id.toString(), member.memberId.id.toString()
        )
      )
    }

    const upvoteOrError = PostVote
      .createUpvote(member.memberId, post.postId);

    if (upvoteOrError.isFailure) {
      return left(upvoteOrError);
    }

    post.addVote(upvoteOrError.getValue());

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
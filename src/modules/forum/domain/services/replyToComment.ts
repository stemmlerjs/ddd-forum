
import { DomainService } from "../../../../shared/domain/DomainService";
import { Member } from "../member";
import { Post } from "../post";
import { Comment } from "../comment";
import { CommentText } from "../commentText";
import { Either, Result, left, right } from "../../../../shared/core/Result";

export class ReplyToCommentService implements DomainService {

  execute (post: Post, member: Member, parentComment: Comment, newCommentText: CommentText): Either<Result<any>, Result<Post>> {
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

    return right(Result.ok<Post>(post));
  }
}
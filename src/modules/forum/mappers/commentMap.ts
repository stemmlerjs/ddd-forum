
import { Mapper } from "../../../shared/infra/Mapper";
import { Comment } from "../domain/comment";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { PostId } from "../domain/postId";
import { MemberId } from "../domain/memberId";
import { CommentId } from "../domain/commentId";
import { CommentText } from "../domain/commentText";

export class CommentMap implements Mapper<Comment> {

  public static toPersistence (comment: Comment): any {
    return {
      post_id: comment.postId.id.toString(),
      comment_id: comment.commentId.id.toString(),
      member_id: comment.memberId.id.toString(),
      parent_comment_id: comment.parentCommentId ? comment.parentCommentId.id.toString() : null,
      text: comment.text.value,
      points: comment.points
    }
  }

  public static toDomain (raw: any): Comment {
    const commentOrError = Comment.create({
      postId: PostId.create(new UniqueEntityID(raw.post_id)).getValue(),
      memberId: MemberId.create(new UniqueEntityID(raw.member_id)).getValue(),
      parentCommentId: raw.parent_comment_id ? CommentId.create(new UniqueEntityID(raw.parent_comment_id)).getValue() : null,
      text: CommentText.create({ value: raw.text }).getValue(),
    }, new UniqueEntityID(raw.comment_id));

    commentOrError.isFailure ? console.log(commentOrError.getErrorValue()) : '';

    return commentOrError.isSuccess ? commentOrError.getValue() : null;
  }
}
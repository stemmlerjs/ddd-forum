
import { Mapper } from "../../../shared/infra/Mapper";
import { Comment } from "../domain/comment";

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
    // TODO:
    return null;
  }
}
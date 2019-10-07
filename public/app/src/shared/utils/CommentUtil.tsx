
import { Comment } from "../../modules/forum/models/Comment";
import { CommentDTO } from "../../modules/forum/dtos/commentDTO";

export class CommentUtil {

  public static maxCommentLength: number = 10000;
  public static minCommentLength: number = 20;

  public static toViewModel (dto: CommentDTO): Comment {
    return {
      postSlug: dto.postSlug,
      commentId: dto.commentId,
      parentCommentId: dto.parentCommentId,
      text: dto.text,
      member: {
        username: dto.member.user.username,
        reputation: dto.member.reputation,
      },
      createdAt: dto.createdAt,
      childComments: []
    }
  }

  public static getSortedComments (comments: Comment[]): Comment[] {
    comments.forEach((c) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        // get the index of the parent comment
        const parentCommentIndex = comments.findIndex((cc) => cc.commentId === c.parentCommentId);
        
        if (parentCommentIndex !== -1) {
          comments[parentCommentIndex].childComments.push(c)
        }
      }
    });

    return comments.filter((c) => !!c.parentCommentId === false);
  }

  public static getThread (comments: Comment[]): Comment[] {
    comments.forEach((c, cIndex) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        const parentCommentIndex = comments.findIndex((cc) => cc.commentId === c.parentCommentId);
        const foundParentComment = parentCommentIndex !== -1;

        if (foundParentComment) {
          // Add to thread
          comments[parentCommentIndex].childComments.push(c)
          
          // Remove from root thread
          comments.splice(cIndex, 1)
        }
      }
    });

    return comments.filter((c) => !!c.parentCommentId === true);
  }

}
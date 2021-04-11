
import { Comment } from "../models/Comment";
import { CommentDTO } from "../dtos/commentDTO";

export class CommentUtil {

  public static maxCommentLength: number = 10000;
  public static minCommentLength: number = 20;

  private static sortByDateDesc (a: Comment, b: Comment) {
    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
  }

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
      childComments: [],
      postTitle: dto.postTitle,
      points: dto.points
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

          // Sort
          comments[parentCommentIndex].childComments = comments[parentCommentIndex].childComments
            .sort(this.sortByDateDesc);
        }
      }
    });

    return comments.filter((c) => !!c.parentCommentId === false);
  }

  public static getThread (parentCommentId: string, comments: Comment[]): Comment[] {
    comments.forEach((c, cIndex) => {
      const hasParentComment = !!c.parentCommentId === true;
      if (hasParentComment) {
        const parentCommentIndex = comments.findIndex((cc) => cc.commentId === c.parentCommentId);
        const foundParentComment = parentCommentIndex !== -1;

        if (foundParentComment) {
          // Add to thread
          comments[parentCommentIndex].childComments.push(c);

          // Sort
          comments[parentCommentIndex].childComments = comments[parentCommentIndex].childComments
            .sort(this.sortByDateDesc);

          
          // Remove from root thread
          comments.splice(cIndex, 1)
        }
      }
    });

    const parentComment = this.traverseToComment(parentCommentId, comments);
    return !!parentComment === true 
      ? parentComment.childComments.filter((c) => c.commentId !== parentCommentId)
      : [];
  }

  private static traverseToComment (targetCommentId: string, comments: Comment[]): Comment {
    return comments.find((comment) => {
      const found = comment.commentId === targetCommentId
      if (found) {
        return comment;
      } else {
        return this.traverseToComment(targetCommentId, comment.childComments);
      }
    }) as Comment;
  }

}
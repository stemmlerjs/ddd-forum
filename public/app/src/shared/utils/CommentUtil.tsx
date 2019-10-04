
import { Comment } from "../../modules/forum/models/Comment";

export class CommentUtil {
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
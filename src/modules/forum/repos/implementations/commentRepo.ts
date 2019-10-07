
import { ICommentRepo } from "../commentRepo";
import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentMap } from "../../mappers/commentMap";
import { CommentId } from "../../domain/commentId";

export class CommentRepo implements ICommentRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  private createBaseDetailsQuery (): any {
    return {
      where: {},
    }
  }

  exists (commentId: string): Promise<boolean> {
    return null;
  }

  getCommentDetailsByPostSlug (slug: string): Promise<CommentDetails[]> {
    return null;
  }

  async deleteComment (commentId: CommentId): Promise<void> {
    const CommentModel = this.models.Comment;
    return CommentModel.destroy({ where: { comment_id: commentId.id.toString() }});
  }

  async save (comment: Comment): Promise<void> {
    const CommentModel = this.models.Comment;
    const exists = await this.exists(comment.commentId.id.toString());
    const rawSequelizeComment = await CommentMap.toPersistence(comment);

      if (!exists) {
        
        try {
          await CommentModel.create(rawSequelizeComment);
        } catch (err) {
          await this.deleteComment(comment.commentId);
          throw new Error(err.toString());
        }
        
      } else {
        const sequelizeCommentInstance = CommentModel.findOne({ 
          where: { comment_id: comment.commentId.id.toString() }
        });
        await sequelizeCommentInstance.update(rawSequelizeComment);
      }
  }

  async saveBulk (comments: Comment[]): Promise<void> {
    for (let comment of comments) {
      await this.save(comment);
    }
  }
  
}

import { ICommentRepo } from "../commentRepo";
import { Comment } from "../../domain/comment";
import { CommentDetails } from "../../domain/commentDetails";
import { CommentMap } from "../../mappers/commentMap";
import { CommentId } from "../../domain/commentId";
import { CommentDetailsMap } from "../../mappers/commentDetailsMap";

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
    const models = this.models;
    return {
      where: {},
      include: [
        { model: models.Post, as: 'Post', where: {} },
        { 
          model: models.Member, 
          as: 'Member', 
          include: [
            { model: models.BaseUser, as: 'BaseUser' }
          ] 
        },
      ],
      limit: 15,
      offset: 0
    }
  }

  exists (commentId: string): Promise<boolean> {
    return null;
  }

  async getCommentDetailsByPostSlug (slug: string): Promise<CommentDetails[]> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.include[0].where['slug'] = slug;
    const comments = await CommentModel.findAll(detailsQuery);
    return comments.map((c) => CommentDetailsMap.toDomain(c));
  }

  async getCommentDetailsByCommentId (commentId: string): Promise<CommentDetails> {
    const CommentModel = this.models.Comment;
    const detailsQuery = this.createBaseDetailsQuery();
    detailsQuery.where['comment_id'] = commentId;
    const comment = await CommentModel.findOne(detailsQuery);
    const found = !!comment === true;
    if (!found) throw new Error('Comment not found');
    return CommentDetailsMap.toDomain(comment);
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
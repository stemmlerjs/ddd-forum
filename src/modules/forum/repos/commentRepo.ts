
import { Comment } from "../domain/comment";
import { CommentDetails } from "../domain/commentDetails";
import { CommentId } from "../domain/commentId";

export interface ICommentRepo {
  exists (commentId: string): Promise<boolean>;
  getCommentDetailsByPostSlug (slug: string, offset?: number): Promise<CommentDetails[]>;
  save (comment: Comment): Promise<void>;
  saveBulk (comments: Comment[]): Promise<void>;
  deleteComment (commentId: CommentId): Promise<void>;
}
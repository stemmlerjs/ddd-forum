
import { Comment } from "../domain/comment";
import { CommentDetails } from "../domain/commentDetails";
import { CommentId } from "../domain/commentId";
import { MemberId } from "../domain/memberId";

export interface ICommentRepo {
  exists (commentId: string): Promise<boolean>;
  getCommentDetailsByPostSlug (slug: string, memberId?: MemberId, offset?: number): Promise<CommentDetails[]>;
  getCommentDetailsByCommentId (commentId: string, memberId?: MemberId): Promise<CommentDetails>;
  getCommentByCommentId (commentId: string): Promise<Comment>;
  save (comment: Comment): Promise<void>;
  saveBulk (comments: Comment[]): Promise<void>;
  deleteComment (commentId: CommentId): Promise<void>;
}

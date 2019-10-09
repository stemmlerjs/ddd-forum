
import { CommentVote } from "../domain/commentVote";
import { MemberId } from "../domain/memberId";
import { CommentId } from "../domain/commentId";

export interface ICommentVotesRepo {
  getVotesForCommentByMemberId (commentId: CommentId, memberId: MemberId): Promise<CommentVote[]>;
}
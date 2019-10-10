
import { CommentVote } from "../domain/commentVote";
import { MemberId } from "../domain/memberId";
import { CommentId } from "../domain/commentId";
import { CommentVotes } from "../domain/commentVotes";
import { VoteType } from "../domain/vote";

export interface ICommentVotesRepo {
  exists (commentId: CommentId, memberId: MemberId, voteType: VoteType): Promise<boolean>;
  getVotesForCommentByMemberId (commentId: CommentId, memberId: MemberId): Promise<CommentVote[]>;
  saveBulk (votes: CommentVotes): Promise<any>;
  save (vote: CommentVote): Promise<any>;
  delete (vote: CommentVote): Promise<any>;
}
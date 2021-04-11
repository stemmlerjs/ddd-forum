
import { CommentVote } from "../domain/commentVote";
import { MemberId } from "../domain/memberId";
import { CommentId } from "../domain/commentId";
import { CommentVotes } from "../domain/commentVotes";
import { VoteType } from "../domain/vote";
import { PostId } from "../domain/postId";

export interface ICommentVotesRepo {
  exists (commentId: CommentId, memberId: MemberId, voteType: VoteType): Promise<boolean>;
  getVotesForCommentByMemberId (commentId: CommentId, memberId: MemberId): Promise<CommentVote[]>;
  countUpvotesForCommentByCommentId (comment: CommentId): Promise<number>;
  countDownvotesForCommentByCommentId (comment: CommentId): Promise<number>;
  countAllPostCommentUpvotes (postId: PostId): Promise<number>;
  countAllPostCommentDownvotes (postId: PostId): Promise<number>;
  countAllPostCommentUpvotesExcludingOP (postId: PostId): Promise<number>;
  countAllPostCommentDownvotesExcludingOP (postId: PostId): Promise<number>;
  saveBulk (votes: CommentVotes): Promise<any>;
  save (vote: CommentVote): Promise<any>;
  delete (vote: CommentVote): Promise<any>;
}
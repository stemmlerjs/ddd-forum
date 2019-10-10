
import { PostVote } from "../domain/postVote";
import { MemberId } from "../domain/memberId";
import { PostId } from "../domain/postId";
import { VoteType } from "../domain/vote";
import { PostVotes } from "../domain/postVotes";

export interface IPostVotesRepo {
  exists (postId: PostId, memberId: MemberId, voteType: VoteType): Promise<boolean>;
  getVotesForPostByMemberId (postId: PostId, memberId: MemberId): Promise<PostVote[]>;
  countPostUpvotesByPostId (postId: PostId): Promise<number>;
  countPostDownvotesByPostId (postId: PostId): Promise<number>;
  saveBulk (votes: PostVotes): Promise<any>;
  save (votes: PostVote): Promise<any>;
  delete (vote: PostVote): Promise<any>;
}
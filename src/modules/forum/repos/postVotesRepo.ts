
import { PostVote } from "../domain/postVote";
import { MemberId } from "../domain/memberId";
import { PostId } from "../domain/postId";
import { VoteType } from "../domain/vote";

export interface IPostVotesRepo {
  exists (postId: PostId, memberId: MemberId, voteType: VoteType): Promise<boolean>;
  getVotesForPostByMemberId (postId: PostId, memberId: MemberId): Promise<PostVote[]>;
  saveBulk (votes: PostVote[]): Promise<any>;
  save (votes: PostVote): Promise<any>;
}
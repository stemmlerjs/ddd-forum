
import { PostVote } from "../domain/postVote";
import { MemberId } from "../domain/memberId";
import { PostId } from "../domain/postId";

export interface IPostVotesRepo {
  getVotesForPostByMemberId (postId: PostId, memberId: MemberId): Promise<PostVote[]>;
}

import { IPostVotesRepo } from "../postVotesRepo";
import { PostVote } from "../../domain/postVote";
import { MemberId } from "../../domain/memberId";
import { PostId } from "../../domain/postId";
import { PostVoteMap } from "../../mappers/postVoteMap";

export class PostVotesRepo implements IPostVotesRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  async getVotesForPostByMemberId (postId: PostId, memberId: MemberId): Promise<PostVote[]> {
    const PostVote = this.models.PostVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['post_id'] = postId.id.toString();
    const votes = await PostVote.findAll(baseQuery);
    return votes.map((v) => PostVoteMap.toDomain(v));
  }

}
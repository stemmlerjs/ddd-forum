
import { IPostVotesRepo } from "../postVotesRepo";
import { PostVote } from "../../domain/postVote";
import { MemberId } from "../../domain/memberId";
import { PostId } from "../../domain/postId";
import { PostVoteMap } from "../../mappers/postVoteMap";
import { VoteType } from "../../domain/vote";

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

  public async exists (postId: PostId, memberId: MemberId, voteType: VoteType): Promise<boolean> {
    const PostVote = this.models.PostVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['post_id'] = postId.id.toString();
    baseQuery.where['type'] = voteType;
    const vote = await PostVote.findOne(baseQuery);
    return !!vote === true;
  }

  async getVotesForPostByMemberId (postId: PostId, memberId: MemberId): Promise<PostVote[]> {
    const PostVote = this.models.PostVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['post_id'] = postId.id.toString();
    const votes = await PostVote.findAll(baseQuery);
    return votes.map((v) => PostVoteMap.toDomain(v));
  }

  async save (vote: PostVote): Promise<any> {
    const PostVoteModel = this.models.PostVote;
    const exists = await this.exists(vote.postId, vote.memberId, vote.type);
    const rawSequelizePostVote = PostVoteMap.toPersistence(vote);

    if (!exists) {
      
      try {
        await PostVoteModel.create(rawSequelizePostVote);
      } catch (err) {
        throw new Error(err.toString());
      }
      
    } else {
      // TODO: Handle what to do when it already exists, we can delete
      // const sequelizeVoteInstance = PostVoteModel.findOne({ 
      //   where: { comment_id: comment.commentId.id.toString() }
      // });
      // await sequelizeVoteInstance.update(rawSequelizePostVote);
    }
  }

  async saveBulk (votes: PostVote[]): Promise<any> {
    for (let vote of votes) {
      await this.save(vote);
    }
  }

}
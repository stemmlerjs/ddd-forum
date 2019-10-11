
import { IPostVotesRepo } from "../postVotesRepo";
import { PostVote } from "../../domain/postVote";
import { MemberId } from "../../domain/memberId";
import { PostId } from "../../domain/postId";
import { PostVoteMap } from "../../mappers/postVoteMap";
import { VoteType } from "../../domain/vote";
import { PostVotes } from "../../domain/postVotes";

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
      throw new Error('Invalid state. Votes arent updated.')
    }
  }

  public async delete (vote: PostVote): Promise<any> {
    const PostVoteModel = this.models.PostVote;
    return PostVoteModel.destroy({ 
      where: { 
        post_id: vote.postId.id.toString(),
        member_id: vote.memberId.id.toString()
      }
    })
  }

  async saveBulk (votes: PostVotes): Promise<any> {
    for (let vote of votes.getRemovedItems()) {
      await this.delete(vote);
    }

    for (let vote of votes.getNewItems()) {
      await this.save(vote);
    }
  }

  async countPostUpvotesByPostId (postId: PostId| string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `select COUNT(*) 
        from post_vote 
        where post_id = "${postId}"
        and type = "UPVOTE"`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

  async countPostDownvotesByPostId (postId: PostId | string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `select COUNT(*) 
        from post_vote 
        where post_id = "${postId}"
        and type = "DOWNVOTE"`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

}

import { ICommentVotesRepo } from "../commentVotesRepo";
import { CommentVote } from "../../domain/commentVote";
import { MemberId } from "../../domain/memberId";
import { CommentId } from "../../domain/commentId";
import { CommentVoteMap } from "../../mappers/commentVoteMap";
import { CommentVotes } from "../../domain/commentVotes";
import { VoteType } from "../../domain/vote";

export class CommentVotesRepo implements ICommentVotesRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  async exists (commentId: CommentId, memberId: MemberId, voteType: VoteType): Promise<boolean> {
    const CommentVote = this.models.CommentVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['comment_id'] = commentId.id.toString();
    baseQuery.where['type'] = voteType;
    const vote = await CommentVote.findOne(baseQuery);
    return !!vote === true;
  }

  async saveBulk (votes: CommentVotes): Promise<any> {
    for (let vote of votes.getRemovedItems()) {
      await this.delete(vote);
    }

    for (let vote of votes.getNewItems()) {
      await this.save(vote);
    }
  }

  async save (vote: CommentVote): Promise<any> {
    const CommentVoteModel = this.models.CommentVote;
    const exists = await this.exists(vote.commentId, vote.memberId, vote.type);
    const rawSequelizeCommentVote = CommentVoteMap.toPersistence(vote);

    if (!exists) {
      try {
        await CommentVoteModel.create(rawSequelizeCommentVote);
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      throw new Error('Invalid state. Votes arent updated.')
    }
  }

  async delete (vote: CommentVote): Promise<any> {
    const CommentVoteModel = this.models.CommentVote;
    return CommentVoteModel.destroy({ 
      where: { 
        comment_id: vote.commentId.id.toString(),
        member_id: vote.memberId.id.toString()
      }
    })
  }

  async getVotesForCommentByMemberId (CommentId: CommentId, memberId: MemberId): Promise<CommentVote[]> {
    const CommentVote = this.models.CommentVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['comment_id'] = CommentId.id.toString();
    const votes = await CommentVote.findAll(baseQuery);
    return votes.map((v) => CommentVoteMap.toDomain(v));
  }

}
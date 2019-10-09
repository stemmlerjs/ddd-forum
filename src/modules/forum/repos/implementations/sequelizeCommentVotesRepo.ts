
import { ICommentVotesRepo } from "../commentVotesRepo";
import { CommentVote } from "../../domain/commentVote";
import { MemberId } from "../../domain/memberId";
import { CommentId } from "../../domain/commentId";
import { CommentVoteMap } from "../../mappers/commentVoteMap";

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

  async getVotesForCommentByMemberId (CommentId: CommentId, memberId: MemberId): Promise<CommentVote[]> {
    const CommentVote = this.models.CommentVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['comment_id'] = CommentId.id.toString();
    const votes = await CommentVote.findAll(baseQuery);
    return votes.map((v) => CommentVoteMap.toDomain(v));
  }

}
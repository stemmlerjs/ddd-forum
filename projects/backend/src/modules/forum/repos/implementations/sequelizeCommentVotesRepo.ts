
import { ICommentVotesRepo } from "../commentVotesRepo";
import { CommentVote } from "../../domain/commentVote";
import { MemberId } from "../../domain/memberId";
import { CommentId } from "../../domain/commentId";
import { CommentVoteMap } from "../../mappers/commentVoteMap";
import { CommentVotes } from "../../domain/commentVotes";
import { VoteType } from "../../domain/vote";
import { PostId } from "../../domain/postId";

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
    const isNew = !exists
    const rawSequelizeCommentVote = CommentVoteMap.toPersistence(vote);

    if (isNew) {
      try {
        await CommentVoteModel.create(rawSequelizeCommentVote);
      } catch (err) {
        throw new Error(err.toString());
      }
    } else {
      throw new Error("Shouldn't be re-saving a vote. Only deleting and saving.");
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

  async getVotesForCommentByMemberId (commentId: CommentId, memberId: MemberId): Promise<CommentVote[]> {
    const CommentVote = this.models.CommentVote;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_id'] = memberId.id.toString();
    baseQuery.where['comment_id'] = commentId.id.toString();
    const votes = await CommentVote.findAll(baseQuery);
    return votes.map((v) => CommentVoteMap.toDomain(v));
  }

  async countUpvotesForCommentByCommentId (commentId: CommentId | string): Promise<number> {
    commentId  = commentId instanceof CommentId 
    ? (<CommentId>commentId).id.toString() 
    : commentId;

    const result = await this.models.sequelize.query(
      `select COUNT(*) 
        from comment_vote 
        where comment_id = "${commentId}"
        and type = "UPVOTE"`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

  async countDownvotesForCommentByCommentId (commentId: CommentId | string): Promise<number> {
    commentId  = commentId instanceof CommentId 
    ? (<CommentId>commentId).id.toString() 
    : commentId;

    const result = await this.models.sequelize.query(
      `select COUNT(*) 
        from comment_vote 
        where comment_id = "${commentId}"
        and type = "DOWNVOTE"`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

  async countAllPostCommentUpvotesExcludingOP (postId: PostId | string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM (
        SELECT COUNT(*) as upvotes
        from post P
        join comment CM on CM.post_id = P.post_id
        join comment_vote CV on CV.comment_id = CM.comment_id
        where P.post_id = "${postId}"
        and CV.type = "UPVOTE" 
        and CV.member_id != CM.member_id
        group by CV.comment_id
      ) as upvotes_total;`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

  async countAllPostCommentDownvotesExcludingOP (postId: PostId | String): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM (
        SELECT COUNT(*) as upvotes
        from post P
        join comment CM on CM.post_id = P.post_id
        join comment_vote CV on CV.comment_id = CM.comment_id
        where P.post_id = "${postId}"
        and CV.type = "DOWNVOTE" 
        and CV.member_id != CM.member_id
        group by CV.comment_id
      ) as upvotes_total;`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }
  
  async countAllPostCommentUpvotes (postId: PostId | string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM (
        SELECT COUNT(*) as upvotes
        from post P
        join comment CM on CM.post_id = P.post_id
        join comment_vote CV on CV.comment_id = CM.comment_id
        where P.post_id = "${postId}"
        and CV.type = "UPVOTE" 
        group by CV.comment_id
      ) as upvotes_total;`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

  async countAllPostCommentDownvotes (postId: PostId | string): Promise<number> {
    postId  = postId instanceof PostId 
    ? (<PostId>postId).id.toString() 
    : postId;

    const result = await this.models.sequelize.query(
      `SELECT COUNT(*) FROM (
        SELECT COUNT(*) as downvotes
        from post P
        join comment CM on CM.post_id = P.post_id
        join comment_vote CV on CV.comment_id = CM.comment_id
        where P.post_id = "${postId}"
        and CV.type = "DOWNVOTE"
        group by CV.comment_id
      ) as downvotes_total;`
    );

    const count = result[0][0]['COUNT(*)'];
    return count;
  }

}
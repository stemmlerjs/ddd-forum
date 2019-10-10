"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentVoteMap_1 = require("../../mappers/commentVoteMap");
class CommentVotesRepo {
    constructor(models) {
        this.models = models;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(commentId, memberId, voteType) {
        const CommentVote = this.models.CommentVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['comment_id'] = commentId.id.toString();
        baseQuery.where['type'] = voteType;
        const vote = await CommentVote.findOne(baseQuery);
        return !!vote === true;
    }
    async saveBulk(votes) {
        for (let vote of votes.getRemovedItems()) {
            await this.delete(vote);
        }
        for (let vote of votes.getNewItems()) {
            await this.save(vote);
        }
    }
    async save(vote) {
        const CommentVoteModel = this.models.CommentVote;
        const exists = await this.exists(vote.commentId, vote.memberId, vote.type);
        const rawSequelizeCommentVote = commentVoteMap_1.CommentVoteMap.toPersistence(vote);
        if (!exists) {
            try {
                await CommentVoteModel.create(rawSequelizeCommentVote);
            }
            catch (err) {
                throw new Error(err.toString());
            }
        }
        else {
            throw new Error('Invalid state. Votes arent updated.');
        }
    }
    async delete(vote) {
        const CommentVoteModel = this.models.CommentVote;
        return CommentVoteModel.destroy({
            where: {
                comment_id: vote.commentId.id.toString(),
                member_id: vote.memberId.id.toString()
            }
        });
    }
    async getVotesForCommentByMemberId(commentId, memberId) {
        const CommentVote = this.models.CommentVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['comment_id'] = commentId.id.toString();
        const votes = await CommentVote.findAll(baseQuery);
        return votes.map((v) => commentVoteMap_1.CommentVoteMap.toDomain(v));
    }
}
exports.CommentVotesRepo = CommentVotesRepo;
//# sourceMappingURL=sequelizeCommentVotesRepo.js.map
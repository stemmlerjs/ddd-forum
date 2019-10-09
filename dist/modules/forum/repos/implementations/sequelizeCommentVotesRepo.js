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
    async getVotesForCommentByMemberId(CommentId, memberId) {
        const CommentVote = this.models.CommentVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['comment_id'] = CommentId.id.toString();
        const votes = await CommentVote.findAll(baseQuery);
        return votes.map((v) => commentVoteMap_1.CommentVoteMap.toDomain(v));
    }
}
exports.CommentVotesRepo = CommentVotesRepo;
//# sourceMappingURL=sequelizeCommentVotesRepo.js.map
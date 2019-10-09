"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postVoteMap_1 = require("../../mappers/postVoteMap");
class PostVotesRepo {
    constructor(models) {
        this.models = models;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async getVotesForPostByMemberId(postId, memberId) {
        const PostVote = this.models.PostVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['post_id'] = postId.id.toString();
        const votes = await PostVote.findAll(baseQuery);
        return votes.map((v) => postVoteMap_1.PostVoteMap.toDomain(v));
    }
}
exports.PostVotesRepo = PostVotesRepo;
//# sourceMappingURL=sequelizePostVotesRepo.js.map
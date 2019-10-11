"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postId_1 = require("../../domain/postId");
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
    async exists(postId, memberId, voteType) {
        const PostVote = this.models.PostVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['post_id'] = postId.id.toString();
        baseQuery.where['type'] = voteType;
        const vote = await PostVote.findOne(baseQuery);
        return !!vote === true;
    }
    async getVotesForPostByMemberId(postId, memberId) {
        const PostVote = this.models.PostVote;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_id'] = memberId.id.toString();
        baseQuery.where['post_id'] = postId.id.toString();
        const votes = await PostVote.findAll(baseQuery);
        return votes.map((v) => postVoteMap_1.PostVoteMap.toDomain(v));
    }
    async save(vote) {
        const PostVoteModel = this.models.PostVote;
        const exists = await this.exists(vote.postId, vote.memberId, vote.type);
        const rawSequelizePostVote = postVoteMap_1.PostVoteMap.toPersistence(vote);
        if (!exists) {
            try {
                await PostVoteModel.create(rawSequelizePostVote);
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
        const PostVoteModel = this.models.PostVote;
        return PostVoteModel.destroy({
            where: {
                post_id: vote.postId.id.toString(),
                member_id: vote.memberId.id.toString()
            }
        });
    }
    async saveBulk(votes) {
        for (let vote of votes.getRemovedItems()) {
            await this.delete(vote);
        }
        for (let vote of votes.getNewItems()) {
            await this.save(vote);
        }
    }
    async countPostUpvotesByPostId(postId) {
        postId = postId instanceof postId_1.PostId
            ? postId.id.toString()
            : postId;
        const result = await this.models.sequelize.query(`select COUNT(*) 
        from post_vote 
        where post_id = "${postId}"
        and type = "UPVOTE"`);
        const count = result[0][0]['COUNT(*)'];
        return count;
    }
    async countPostDownvotesByPostId(postId) {
        postId = postId instanceof postId_1.PostId
            ? postId.id.toString()
            : postId;
        const result = await this.models.sequelize.query(`select COUNT(*) 
        from post_vote 
        where post_id = "${postId}"
        and type = "DOWNVOTE"`);
        const count = result[0][0]['COUNT(*)'];
        return count;
    }
}
exports.PostVotesRepo = PostVotesRepo;
//# sourceMappingURL=sequelizePostVotesRepo.js.map
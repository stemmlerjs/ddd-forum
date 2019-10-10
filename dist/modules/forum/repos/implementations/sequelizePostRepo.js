"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postId_1 = require("../../domain/postId");
const postMap_1 = require("../../mappers/postMap");
const postDetailsMap_1 = require("../../mappers/postDetailsMap");
class PostRepo {
    constructor(models, commentRepo, postVotesRepo) {
        this.models = models;
        this.commentRepo = commentRepo;
        this.postVotesRepo = postVotesRepo;
    }
    createBaseQuery() {
        const models = this.models;
        return {
            where: {},
            include: []
        };
    }
    createBaseDetailsQuery() {
        const models = this.models;
        return {
            where: {},
            include: [
                {
                    model: models.Member,
                    as: 'Member',
                    include: [
                        { model: models.BaseUser, as: 'BaseUser' }
                    ]
                }
            ],
            limit: 15,
            offset: 0
        };
    }
    async getPostByPostId(postId) {
        postId = postId instanceof postId_1.PostId
            ? postId.id.toString()
            : postId;
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseQuery();
        detailsQuery.where['post_id'] = postId;
        const post = await PostModel.findOne(detailsQuery);
        const found = !!post === true;
        if (!found)
            throw new Error("Post not found");
        return postMap_1.PostMap.toDomain(post);
    }
    async getNumberOfCommentsByPostId(postId) {
        postId = postId instanceof postId_1.PostId
            ? postId.id.toString()
            : postId;
        const result = await this.models.sequelize.query(`SELECT COUNT(*) FROM comment WHERE post_id = "${postId}";`);
        const count = result[0][0]['COUNT(*)'];
        return count;
    }
    async getPostDetailsBySlug(slug, offset) {
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.where['slug'] = slug;
        const post = await PostModel.findOne(detailsQuery);
        const found = !!post === true;
        if (!found)
            throw new Error("Post not found");
        return postDetailsMap_1.PostDetailsMap.toDomain(post);
    }
    async getRecentPosts(memberId, offset) {
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.offset = offset ? offset : detailsQuery.offset;
        if (!!memberId === true) {
            detailsQuery.include.push({
                model: this.models.PostVote,
                as: 'Votes',
                where: { member_id: memberId.id.toString() },
                required: false
            });
        }
        const posts = await PostModel.findAll(detailsQuery);
        return posts.map((p) => postDetailsMap_1.PostDetailsMap.toDomain(p));
    }
    async getPopularPosts(memberId, offset) {
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.offset = offset ? offset : detailsQuery.offset;
        detailsQuery['order'] = [
            ['points', 'DESC'],
        ];
        if (!!memberId === true) {
            detailsQuery.include.push({
                model: this.models.PostVote,
                as: 'Votes',
                where: { member_id: memberId.id.toString() },
                required: false
            });
        }
        const posts = await PostModel.findAll(detailsQuery);
        return posts.map((p) => postDetailsMap_1.PostDetailsMap.toDomain(p));
    }
    async getPostBySlug(slug) {
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseQuery();
        detailsQuery.where['slug'] = slug;
        const post = await PostModel.findOne(detailsQuery);
        const found = !!post === true;
        if (!found)
            throw new Error("Post not found");
        return postMap_1.PostMap.toDomain(post);
    }
    async exists(postId) {
        const PostModel = this.models.Post;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['post_id'] = postId.id.toString();
        const post = await PostModel.findOne(baseQuery);
        const found = !!post === true;
        return found;
    }
    delete(postId) {
        const PostModel = this.models.Post;
        return PostModel.destroy({ where: { post_id: postId.id.toString() } });
    }
    saveComments(comments) {
        return this.commentRepo.saveBulk(comments);
    }
    savePostVotes(postVotes) {
        return this.postVotesRepo.saveBulk(postVotes);
    }
    async save(post) {
        const PostModel = this.models.Post;
        const exists = await this.exists(post.postId);
        const isNewPost = !exists;
        const rawSequelizePost = await postMap_1.PostMap.toPersistence(post);
        if (isNewPost) {
            try {
                await PostModel.create(rawSequelizePost);
                await this.saveComments(post.comments);
                await this.savePostVotes(post.getVotes());
            }
            catch (err) {
                await this.delete(post.postId);
                throw new Error(err.toString());
            }
        }
        else {
            // Save non-aggregate tables before saving the aggregate
            // so that any domain events on the aggregate get dispatched
            await this.saveComments(post.comments);
            await this.savePostVotes(post.getVotes());
            await PostModel.update(rawSequelizePost, {
                // To make sure your hooks always run, make sure to include this in
                // the query
                individualHooks: true,
                hooks: true,
                where: { post_id: post.postId.id.toString() }
            });
        }
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=sequelizePostRepo.js.map
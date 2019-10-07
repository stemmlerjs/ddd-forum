"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postMap_1 = require("../../mappers/postMap");
const postDetailsMap_1 = require("../../mappers/postDetailsMap");
class PostRepo {
    constructor(models, commentRepo) {
        this.models = models;
        this.commentRepo = commentRepo;
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
                { model: models.Member, as: 'Member', include: [
                        { model: models.BaseUser, as: 'BaseUser' }
                    ] }
            ],
            limit: 15,
            offset: 0
        };
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
    async getRecentPosts(offset) {
        const PostModel = this.models.Post;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.offset = offset ? offset : detailsQuery.offset;
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
    async save(post) {
        const PostModel = this.models.Post;
        const exists = await this.exists(post.postId);
        const isNewPost = !exists;
        const rawSequelizePost = await postMap_1.PostMap.toPersistence(post);
        if (isNewPost) {
            try {
                await PostModel.create(rawSequelizePost);
                await this.saveComments(post.comments);
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
            const sequelizePostInstance = await PostModel.findOne({
                where: { post_id: post.postId.id.toString() }
            });
            await sequelizePostInstance.update(rawSequelizePost);
        }
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=sequelizePostRepo.js.map
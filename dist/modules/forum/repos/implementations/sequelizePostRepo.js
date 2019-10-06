"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postMap_1 = require("../../mappers/postMap");
class PostRepo {
    constructor(models) {
        this.models = models;
    }
    createBaseQuery() {
        const models = this.models;
        return {
            where: {},
            include: []
        };
    }
    async exists(postId) {
        const PostModel = this.models.Post;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['post_id'] = postId.id.toString();
        const post = await PostModel.findOne(baseQuery);
        const found = !!post === true;
        return found;
    }
    async save(post) {
        const PostModel = this.models.Post;
        const exists = await this.exists(post.postId);
        if (!exists) {
            const rawSequelizePost = await postMap_1.PostMap.toPersistence(post);
            await PostModel.create(rawSequelizePost);
        }
    }
}
exports.PostRepo = PostRepo;
//# sourceMappingURL=sequelizePostRepo.js.map
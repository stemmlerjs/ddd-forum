"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentMap_1 = require("../../mappers/commentMap");
const commentDetailsMap_1 = require("../../mappers/commentDetailsMap");
class CommentRepo {
    constructor(models) {
        this.models = models;
    }
    createBaseQuery() {
        return {
            where: {},
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
                },
                { model: models.Post, as: 'Post' }
            ],
            limit: 15,
            offset: 0
        };
    }
    exists(commentId) {
        return null;
    }
    async getCommentDetailsByPostSlug(slug) {
        const CommentModel = this.models.Comment;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.where['slug'] = slug;
        const comments = await CommentModel.findAll(detailsQuery);
        console.log(comments);
        return comments.map((c) => commentDetailsMap_1.CommentDetailsMap.toDomain(c));
    }
    async deleteComment(commentId) {
        const CommentModel = this.models.Comment;
        return CommentModel.destroy({ where: { comment_id: commentId.id.toString() } });
    }
    async save(comment) {
        const CommentModel = this.models.Comment;
        const exists = await this.exists(comment.commentId.id.toString());
        const rawSequelizeComment = await commentMap_1.CommentMap.toPersistence(comment);
        if (!exists) {
            try {
                await CommentModel.create(rawSequelizeComment);
            }
            catch (err) {
                await this.deleteComment(comment.commentId);
                throw new Error(err.toString());
            }
        }
        else {
            const sequelizeCommentInstance = CommentModel.findOne({
                where: { comment_id: comment.commentId.id.toString() }
            });
            await sequelizeCommentInstance.update(rawSequelizeComment);
        }
    }
    async saveBulk(comments) {
        for (let comment of comments) {
            await this.save(comment);
        }
    }
}
exports.CommentRepo = CommentRepo;
//# sourceMappingURL=commentRepo.js.map
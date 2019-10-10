"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentMap_1 = require("../../mappers/commentMap");
const commentDetailsMap_1 = require("../../mappers/commentDetailsMap");
class CommentRepo {
    constructor(models, commentVotesRepo) {
        this.models = models;
        this.commentVotesRepo = commentVotesRepo;
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
                { model: models.Post, as: 'Post', where: {} },
                {
                    model: models.Member,
                    as: 'Member',
                    include: [
                        { model: models.BaseUser, as: 'BaseUser' }
                    ]
                },
            ],
            limit: 15,
            offset: 0
        };
    }
    async exists(commentId) {
        const CommentModel = this.models.Comment;
        const detailsQuery = this.createBaseQuery();
        detailsQuery.where['comment_id'] = commentId;
        const comment = await CommentModel.findOne(detailsQuery);
        const found = !!comment === true;
        return found;
    }
    async getCommentDetailsByPostSlug(slug) {
        const CommentModel = this.models.Comment;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.include[0].where['slug'] = slug;
        const comments = await CommentModel.findAll(detailsQuery);
        return comments.map((c) => commentDetailsMap_1.CommentDetailsMap.toDomain(c));
    }
    async getCommentByCommentId(commentId) {
        const CommentModel = this.models.Comment;
        const detailsQuery = this.createBaseQuery();
        detailsQuery.where['comment_id'] = commentId;
        const comment = await CommentModel.findOne(detailsQuery);
        const found = !!comment === true;
        if (!found)
            throw new Error('Comment not found');
        return commentMap_1.CommentMap.toDomain(comment);
    }
    async getCommentDetailsByCommentId(commentId) {
        const CommentModel = this.models.Comment;
        const detailsQuery = this.createBaseDetailsQuery();
        detailsQuery.where['comment_id'] = commentId;
        const comment = await CommentModel.findOne(detailsQuery);
        const found = !!comment === true;
        if (!found)
            throw new Error('Comment not found');
        return commentDetailsMap_1.CommentDetailsMap.toDomain(comment);
    }
    async deleteComment(commentId) {
        const CommentModel = this.models.Comment;
        return CommentModel.destroy({ where: { comment_id: commentId.id.toString() } });
    }
    saveCommentVotes(commentVotes) {
        return this.commentVotesRepo.saveBulk(commentVotes);
    }
    async save(comment) {
        const CommentModel = this.models.Comment;
        const exists = await this.exists(comment.commentId.id.toString());
        const rawSequelizeComment = commentMap_1.CommentMap.toPersistence(comment);
        if (!exists) {
            try {
                await CommentModel.create(rawSequelizeComment);
                await this.saveCommentVotes(comment.getVotes());
            }
            catch (err) {
                throw new Error(err.toString());
            }
        }
        else {
            await this.saveCommentVotes(comment.getVotes());
            const sequelizeCommentInstance = await CommentModel.findOne({
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
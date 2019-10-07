"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const ReplyToPostErrors_1 = require("./ReplyToPostErrors");
const comment_1 = require("../../../domain/comment");
const commentText_1 = require("../../../domain/commentText");
const postSlug_1 = require("../../../domain/postSlug");
class ReplyToPost {
    constructor(memberRepo, postRepo) {
        this.memberRepo = memberRepo;
        this.postRepo = postRepo;
    }
    async execute(req) {
        let post;
        let member;
        let slug;
        const { userId } = req;
        try {
            const slugOrError = postSlug_1.PostSlug.createFromExisting(req.slug);
            if (slugOrError.isFailure) {
                return Result_1.left(slugOrError);
            }
            slug = slugOrError.getValue();
            try {
                [post, member] = await Promise.all([
                    this.postRepo.getPostBySlug(slug.value),
                    this.memberRepo.getMemberByUserId(userId),
                ]);
            }
            catch (err) {
                return Result_1.left(new ReplyToPostErrors_1.ReplyToPostErrors.PostNotFoundError(slug.value));
            }
            const commentTextOrError = commentText_1.CommentText.create({ value: req.comment });
            if (commentTextOrError.isFailure) {
                return Result_1.left(commentTextOrError);
            }
            const commentOrError = comment_1.Comment.create({
                memberId: member.memberId,
                text: commentTextOrError.getValue(),
                postId: post.postId
            });
            if (commentOrError.isFailure) {
                return Result_1.left(commentOrError);
            }
            const comment = commentOrError.getValue();
            post.addComment(comment);
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.ReplyToPost = ReplyToPost;
//# sourceMappingURL=ReplyToPost.js.map
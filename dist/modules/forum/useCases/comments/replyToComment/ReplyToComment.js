"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const postSlug_1 = require("../../../domain/postSlug");
const ReplyToCommentErrors_1 = require("./ReplyToCommentErrors");
const commentText_1 = require("../../../domain/commentText");
class ReplyToComment {
    constructor(memberRepo, postRepo, commentRepo, postService) {
        this.memberRepo = memberRepo;
        this.postRepo = postRepo;
        this.commentRepo = commentRepo;
        this.postService = postService;
    }
    async getPost(slug) {
        try {
            const post = await this.postRepo.getPostBySlug(slug.value);
            return Result_1.right(Result_1.Result.ok(post));
        }
        catch (err) {
            return Result_1.left(new ReplyToCommentErrors_1.ReplyToCommentErrors.PostNotFoundError(slug.value));
        }
    }
    async getMember(userId) {
        try {
            const member = await this.memberRepo.getMemberByUserId(userId);
            return Result_1.right(Result_1.Result.ok(member));
        }
        catch (err) {
            return Result_1.left(new ReplyToCommentErrors_1.ReplyToCommentErrors.MemberNotFoundError(userId));
        }
    }
    async getParentComment(commentId) {
        try {
            const comment = await this.commentRepo.getCommentByCommentId(commentId);
            return Result_1.right(Result_1.Result.ok(comment));
        }
        catch (err) {
            return Result_1.left(new ReplyToCommentErrors_1.ReplyToCommentErrors.CommentNotFoundError(commentId));
        }
    }
    async execute(req) {
        let post;
        let member;
        let slug;
        let parentComment;
        const { userId, parentCommentId } = req;
        try {
            const slugOrError = postSlug_1.PostSlug.createFromExisting(req.slug);
            if (slugOrError.isFailure) {
                return Result_1.left(slugOrError);
            }
            slug = slugOrError.getValue();
            const asyncResults = await Promise.all([
                this.getPost(slug),
                this.getMember(userId),
                this.getParentComment(parentCommentId)
            ]);
            for (let result of asyncResults) {
                if (result.isLeft()) {
                    return Result_1.left(result.value);
                }
            }
            const [postResult, memberResult, parentCommentResult] = asyncResults;
            post = postResult.value.getValue();
            member = memberResult.value.getValue();
            parentComment = parentCommentResult.value.getValue();
            const commentTextOrError = commentText_1.CommentText.create({ value: req.comment });
            if (commentTextOrError.isFailure) {
                return Result_1.left(commentTextOrError);
            }
            const commentText = commentTextOrError.getValue();
            const replyToCommentResult = this.postService
                .replyToComment(post, member, parentComment, commentText);
            if (replyToCommentResult.isLeft()) {
                return Result_1.left(replyToCommentResult.value);
            }
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.ReplyToComment = ReplyToComment;
//# sourceMappingURL=ReplyToComment.js.map
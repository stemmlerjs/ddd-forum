"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class GetCommentsByPostSlug {
    constructor(commentRepo, memberRepo) {
        this.commentRepo = commentRepo;
        this.memberRepo = memberRepo;
    }
    async execute(req) {
        let memberId;
        let comments;
        const { slug, offset } = req;
        const isAuthenticated = !!req.userId === true;
        if (isAuthenticated) {
            memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
        }
        try {
            try {
                comments = await this.commentRepo.getCommentDetailsByPostSlug(slug, memberId, offset);
            }
            catch (err) {
                return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
            }
            return Result_1.right(Result_1.Result.ok(comments));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetCommentsByPostSlug = GetCommentsByPostSlug;
//# sourceMappingURL=GetCommentsByPostSlug.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class GetCommentsByPostSlug {
    constructor(commentRepo) {
        this.commentRepo = commentRepo;
    }
    async execute(req) {
        let comments;
        const { slug, offset } = req;
        try {
            try {
                comments = await this.commentRepo.getCommentDetailsByPostSlug(slug, offset);
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
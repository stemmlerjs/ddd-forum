"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const GetCommentsByPostSlugErrors_1 = require("./GetCommentsByPostSlugErrors");
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
                console.log(err);
                return Result_1.left(new GetCommentsByPostSlugErrors_1.GetCommentsByPostSlugErrors.PostNotFoundError(slug));
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
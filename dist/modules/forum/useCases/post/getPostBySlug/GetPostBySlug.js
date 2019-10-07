"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const GetPostBySlugErrors_1 = require("./GetPostBySlugErrors");
class GetPostBySlug {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async execute(req) {
        let postDetails;
        const { slug } = req;
        try {
            try {
                postDetails = await this.postRepo.getPostDetailsBySlug(slug);
            }
            catch (err) {
                return Result_1.left(new GetPostBySlugErrors_1.GetPostBySlugErrors.PostNotFoundError(slug));
            }
            return Result_1.right(Result_1.Result.ok(postDetails));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetPostBySlug = GetPostBySlug;
//# sourceMappingURL=GetPostBySlug.js.map
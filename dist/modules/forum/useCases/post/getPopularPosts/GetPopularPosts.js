"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class GetPopularPosts {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async execute(req) {
        try {
            const posts = await this.postRepo.getPopularPosts(req.offset);
            return Result_1.right(Result_1.Result.ok(posts));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetPopularPosts = GetPopularPosts;
//# sourceMappingURL=GetPopularPosts.js.map
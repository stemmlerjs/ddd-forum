"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class GetRecentPosts {
    constructor(postRepo) {
        this.postRepo = postRepo;
    }
    async execute(req) {
        try {
            const posts = await this.postRepo.getRecentPosts(req.offset);
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetRecentPosts = GetRecentPosts;
//# sourceMappingURL=GetRecentPosts.js.map
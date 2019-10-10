"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class GetPopularPosts {
    constructor(postRepo, memberRepo) {
        this.postRepo = postRepo;
        this.memberRepo = memberRepo;
    }
    async execute(req) {
        let memberId;
        try {
            const isAuthenticated = !!req.userId === true;
            if (isAuthenticated) {
                memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
            }
            const posts = await this.postRepo.getPopularPosts(memberId, req.offset);
            return Result_1.right(Result_1.Result.ok(posts));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetPopularPosts = GetPopularPosts;
//# sourceMappingURL=GetPopularPosts.js.map
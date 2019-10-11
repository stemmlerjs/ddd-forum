"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const UpdatePostStatsErrors_1 = require("./UpdatePostStatsErrors");
class UpdatePostStats {
    constructor(postRepo, postVotesRepo) {
        this.postRepo = postRepo;
        this.postVotesRepo = postVotesRepo;
    }
    async execute(response) {
        const { postId } = response;
        let post;
        try {
            try {
                post = await this.postRepo.getPostByPostId(response.postId);
            }
            catch (err) {
                return Result_1.left(new UpdatePostStatsErrors_1.UpdatePostStatsErrors.PostNotFoundError(postId));
            }
            const commentCount = await this.postRepo.getNumberOfCommentsByPostId(response.postId);
            // Update comment count
            post.updateTotalNumberComments(commentCount);
            // Update post points
            const [numPostUpvotes, numPostDownvotes] = await Promise.all([
                this.postVotesRepo.countPostUpvotesByPostId(post.postId),
                this.postVotesRepo.countPostDownvotesByPostId(post.postId)
            ]);
            post.updatePostScore(numPostUpvotes, numPostDownvotes, 0, 0);
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.UpdatePostStats = UpdatePostStats;
//# sourceMappingURL=UpdatePostStats.js.map
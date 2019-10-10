"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class UpdateCommentStats {
    constructor(commentRepo, commentVotesRepo) {
        this.commentRepo = commentRepo;
        this.commentVotesRepo = commentVotesRepo;
    }
    async execute(req) {
        try {
            // Get the comment
            const comment = await this.commentRepo
                .getCommentByCommentId(req.commentId.id.toString());
            // Get number upvotes and downvotes
            let [numUpvotes, numDownvotes] = await Promise.all([
                this.commentVotesRepo.countUpvotesForCommentByCommentId(req.commentId),
                this.commentVotesRepo.countDownvotesForCommentByCommentId(req.commentId)
            ]);
            console.log('Num upvotes', numUpvotes, 'num downvotes', numDownvotes);
            comment.updateScore(numUpvotes, numDownvotes);
            await this.commentRepo.save(comment);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.UpdateCommentStats = UpdateCommentStats;
//# sourceMappingURL=UpdateCommentStats.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const GetCommentByCommentIdErrors_1 = require("./GetCommentByCommentIdErrors");
class GetCommentByCommentId {
    constructor(commentRepo) {
        this.commentRepo = commentRepo;
    }
    async execute(req) {
        let comment;
        try {
            try {
                comment = await this.commentRepo.getCommentDetailsByCommentId(req.commentId);
            }
            catch (err) {
                return Result_1.left(new GetCommentByCommentIdErrors_1.GetCommentByCommentIdErrors.CommentNotFoundError(req.commentId));
            }
            return Result_1.right(Result_1.Result.ok(comment));
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.GetCommentByCommentId = GetCommentByCommentId;
//# sourceMappingURL=GetCommentByCommentId.js.map
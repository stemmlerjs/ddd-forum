"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const DownvoteCommentErrors_1 = require("./DownvoteCommentErrors");
class DownvoteComment {
    constructor(postRepo, memberRepo, commentRepo, commentVotesRepo, postService) {
        this.postRepo = postRepo;
        this.memberRepo = memberRepo;
        this.commentRepo = commentRepo;
        this.commentVotesRepo = commentVotesRepo;
        this.postService = postService;
    }
    async execute(req) {
        let member;
        let post;
        let comment;
        let existingVotesOnCommentByMember;
        try {
            try {
                member = await this.memberRepo.getMemberByUserId(req.userId);
            }
            catch (err) {
                return Result_1.left(new DownvoteCommentErrors_1.DownvoteCommentErrors.MemberNotFoundError());
            }
            try {
                comment = await this.commentRepo.getCommentByCommentId(req.commentId);
            }
            catch (err) {
                return Result_1.left(new DownvoteCommentErrors_1.DownvoteCommentErrors.CommentNotFoundError(req.commentId));
            }
            try {
                post = await this.postRepo.getPostByPostId(comment.postId.id.toString());
            }
            catch (err) {
                return Result_1.left(new DownvoteCommentErrors_1.DownvoteCommentErrors.PostNotFoundError(req.commentId));
            }
            existingVotesOnCommentByMember = await this.commentVotesRepo
                .getVotesForCommentByMemberId(comment.commentId, member.memberId);
            const downVoteCommentResult = this.postService
                .downvoteComment(post, member, comment, existingVotesOnCommentByMember);
            if (downVoteCommentResult.isLeft()) {
                return Result_1.left(downVoteCommentResult.value);
            }
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.DownvoteComment = DownvoteComment;
//# sourceMappingURL=DownvoteComment.js.map
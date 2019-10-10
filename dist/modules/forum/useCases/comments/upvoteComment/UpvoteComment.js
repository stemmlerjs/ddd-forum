"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const UpvoteCommentErrors_1 = require("./UpvoteCommentErrors");
class UpvoteComment {
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
                return Result_1.left(new UpvoteCommentErrors_1.UpvoteCommentErrors.MemberNotFoundError());
            }
            try {
                comment = await this.commentRepo.getCommentByCommentId(req.commentId);
            }
            catch (err) {
                return Result_1.left(new UpvoteCommentErrors_1.UpvoteCommentErrors.CommentNotFoundError(req.commentId));
            }
            try {
                post = await this.postRepo.getPostByPostId(comment.postId.id.toString());
            }
            catch (err) {
                return Result_1.left(new UpvoteCommentErrors_1.UpvoteCommentErrors.PostNotFoundError(req.commentId));
            }
            existingVotesOnCommentByMember = await this.commentVotesRepo
                .getVotesForCommentByMemberId(comment.commentId, member.memberId);
            const upvoteCommentResult = this.postService
                .toggleCommentUpvote(post, member, comment, existingVotesOnCommentByMember);
            if (upvoteCommentResult.isLeft()) {
                return Result_1.left(upvoteCommentResult.value);
            }
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.UpvoteComment = UpvoteComment;
//# sourceMappingURL=UpvoteComment.js.map
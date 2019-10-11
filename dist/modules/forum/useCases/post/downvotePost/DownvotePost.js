"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const DownvotePostErrors_1 = require("./DownvotePostErrors");
class DownvotePost {
    constructor(memberRepo, postRepo, postVotesRepo, postService) {
        this.memberRepo = memberRepo;
        this.postRepo = postRepo;
        this.postVotesRepo = postVotesRepo;
        this.postService = postService;
    }
    async execute(req) {
        let member;
        let post;
        let existingVotesOnPostByMember;
        try {
            try {
                member = await this.memberRepo.getMemberByUserId(req.userId);
            }
            catch (err) {
                return Result_1.left(new DownvotePostErrors_1.DownvotePostErrors.MemberNotFoundError());
            }
            try {
                post = await this.postRepo.getPostBySlug(req.slug);
            }
            catch (err) {
                return Result_1.left(new DownvotePostErrors_1.DownvotePostErrors.PostNotFoundError(req.slug));
            }
            existingVotesOnPostByMember = await this.postVotesRepo
                .getVotesForPostByMemberId(post.postId, member.memberId);
            const downvotePostResult = this.postService
                .downvotePost(post, member, existingVotesOnPostByMember);
            if (downvotePostResult.isLeft()) {
                return Result_1.left(downvotePostResult.value);
            }
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.DownvotePost = DownvotePost;
//# sourceMappingURL=DownvotePost.js.map
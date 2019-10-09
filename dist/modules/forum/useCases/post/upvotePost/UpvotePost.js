"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
class UpvotePost {
    constructor(memberRepo, postRepo) {
        this.memberRepo = memberRepo;
        this.postRepo = postRepo;
    }
    async execute(req) {
        try {
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.UpvotePost = UpvotePost;
//# sourceMappingURL=UpvotePost.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../../../../../shared/core/Result");
const AppError_1 = require("../../../../../shared/core/AppError");
const CreatePostErrors_1 = require("./CreatePostErrors");
const post_1 = require("../../../domain/post");
const postTitle_1 = require("../../../domain/postTitle");
const postText_1 = require("../../../domain/postText");
const postSlug_1 = require("../../../domain/postSlug");
const postLink_1 = require("../../../domain/postLink");
class CreatePost {
    constructor(postRepo, memberRepo) {
        this.postRepo = postRepo;
        this.memberRepo = memberRepo;
    }
    async execute(request) {
        let member;
        let title;
        let text;
        let link;
        let slug;
        let post;
        const { userId } = request;
        try {
            try {
                member = await this.memberRepo.getMemberByUserId(userId);
            }
            catch (err) {
                return Result_1.left(new CreatePostErrors_1.CreatePostErrors.MemberDoesntExistError());
            }
            const titleOrError = postTitle_1.PostTitle.create({ value: request.title });
            if (titleOrError.isFailure) {
                return Result_1.left(titleOrError);
            }
            if (request.postType === 'text') {
                const textOrError = postText_1.PostText.create({ value: request.text });
                if (textOrError.isFailure) {
                    return Result_1.left(textOrError);
                }
                text = textOrError.getValue();
            }
            else {
                const linkOrError = postLink_1.PostLink.create({ url: request.link });
                if (linkOrError.isFailure) {
                    return Result_1.left(linkOrError);
                }
                link = linkOrError.getValue();
            }
            title = titleOrError.getValue();
            const slugOrError = postSlug_1.PostSlug.create(title);
            if (slugOrError.isFailure) {
                return Result_1.left(slugOrError);
            }
            slug = slugOrError.getValue();
            const postProps = {
                title,
                slug,
                type: request.postType,
                memberId: member.memberId,
                text,
                link
            };
            const postOrError = post_1.Post.create(postProps);
            if (postOrError.isFailure) {
                return Result_1.left(postOrError);
            }
            post = postOrError.getValue();
            await this.postRepo.save(post);
            return Result_1.right(Result_1.Result.ok());
        }
        catch (err) {
            return Result_1.left(new AppError_1.AppError.UnexpectedError(err));
        }
    }
}
exports.CreatePost = CreatePost;
//# sourceMappingURL=CreatePost.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = require("../domain/post");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const memberId_1 = require("../domain/memberId");
const postSlug_1 = require("../domain/postSlug");
const postTitle_1 = require("../domain/postTitle");
const postText_1 = require("../domain/postText");
const postLink_1 = require("../domain/postLink");
class PostMap {
    static toDomain(raw) {
        const postType = raw.type;
        const postOrError = post_1.Post.create({
            memberId: memberId_1.MemberId.create(new UniqueEntityID_1.UniqueEntityID(raw.member_id)).getValue(),
            slug: postSlug_1.PostSlug.createFromExisting(raw.slug).getValue(),
            title: postTitle_1.PostTitle.create({ value: raw.title }).getValue(),
            type: postType,
            text: postType === 'text' ? postText_1.PostText.create({ value: raw.text }).getValue() : null,
            link: postType === 'link' ? postLink_1.PostLink.create({ url: raw.link }).getValue() : null,
            points: raw.points,
            totalNumComments: raw.total_num_comments
        }, new UniqueEntityID_1.UniqueEntityID(raw.post_id));
        postOrError.isFailure ? console.log(postOrError.error) : '';
        return postOrError.isSuccess ? postOrError.getValue() : null;
    }
    static toPersistence(post) {
        return {
            total_num_comments: post.totalNumComments,
            updatedAt: new Date().toString(),
            title: post.title.value,
            post_id: post.postId.id.toString(),
            member_id: post.memberId.id.toString(),
            text: post.isTextPost() ? post.text.value : null,
            slug: post.slug.value,
            points: post.points,
            type: post.type,
            link: post.isLinkPost() ? post.link.url : null,
        };
    }
}
exports.PostMap = PostMap;
//# sourceMappingURL=postMap.js.map
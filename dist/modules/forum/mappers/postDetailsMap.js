"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postDetails_1 = require("../domain/postDetails");
const postSlug_1 = require("../domain/postSlug");
const postTitle_1 = require("../domain/postTitle");
const memberDetailsMap_1 = require("./memberDetailsMap");
const postText_1 = require("../domain/postText");
const postLink_1 = require("../domain/postLink");
const postVoteMap_1 = require("./postVoteMap");
class PostDetailsMap {
    static toDomain(raw) {
        const slug = postSlug_1.PostSlug.createFromExisting(raw.slug).getValue();
        const title = postTitle_1.PostTitle.create({ value: raw.title }).getValue();
        const postType = raw.type;
        const memberDetails = memberDetailsMap_1.MemberDetailsMap.toDomain(raw.Member);
        const votes = raw.Votes ? raw.Votes.map((v) => postVoteMap_1.PostVoteMap.toDomain(v)) : [];
        const postDetailsOrError = postDetails_1.PostDetails.create({
            slug,
            title,
            type: raw.type,
            points: raw.points,
            numComments: raw.total_num_comments,
            dateTimePosted: raw.createdAt,
            member: memberDetails,
            text: postType === 'text' ? postText_1.PostText.create({ value: raw.text }).getValue() : null,
            link: postType === 'link' ? postLink_1.PostLink.create({ url: raw.link }).getValue() : null,
            wasUpvotedByMe: !!votes.find((v) => v.isUpvote()),
            wasDownvotedByMe: !!votes.find((v) => v.isDownvote())
        });
        postDetailsOrError.isFailure ? console.log(postDetailsOrError.error) : '';
        return postDetailsOrError.isSuccess ? postDetailsOrError.getValue() : null;
    }
    static toDTO(postDetails) {
        return {
            slug: postDetails.slug.value,
            title: postDetails.title.value,
            createdAt: postDetails.dateTimePosted,
            memberPostedBy: memberDetailsMap_1.MemberDetailsMap.toDTO(postDetails.member),
            numComments: postDetails.numComments,
            points: postDetails.points,
            text: postDetails.text ? postDetails.text.value : '',
            link: postDetails.link ? postDetails.link.url : '',
            type: postDetails.postType,
            wasUpvotedByMe: postDetails.wasUpvotedByMe,
            wasDownvotedByMe: postDetails.wasDownvotedByMe
        };
    }
}
exports.PostDetailsMap = PostDetailsMap;
//# sourceMappingURL=postDetailsMap.js.map
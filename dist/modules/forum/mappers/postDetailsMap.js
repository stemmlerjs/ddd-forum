"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postDetails_1 = require("../domain/postDetails");
const postSlug_1 = require("../domain/postSlug");
const postTitle_1 = require("../domain/postTitle");
const memberDetailsMap_1 = require("./memberDetailsMap");
/**
 * member: MemberDetails;
  slug: PostSlug;
  title: PostTitle;
  type: PostType;
  text?: PostText;
  link?: PostLink;
  numComments: number;
  points: number;
  dateTimePosted: string | Date;
 */
class PostDetailsMap {
    static toDomain(raw) {
        const slug = postSlug_1.PostSlug.createFromExisting(raw.slug).getValue();
        const title = postTitle_1.PostTitle.create({ value: raw.title }).getValue();
        const memberDetails = memberDetailsMap_1.MemberDetailsMap.toDomain(raw.Member);
        const postDetailsOrError = postDetails_1.PostDetails.create({
            slug,
            title,
            type: raw.type,
            points: raw.points,
            numComments: 0,
            dateTimePosted: raw.createdAt,
            member: memberDetails
        });
        postDetailsOrError.isFailure ? console.log(postDetailsOrError.error) : '';
        return postDetailsOrError.isSuccess ? postDetailsOrError.getValue() : null;
    }
    static toDTO(postDetails) {
        return null;
        // return {
        //   reputation: memberDetails.reputation,
        //   user: {
        //     username: memberDetails.username.value
        //   }
        // }
    }
}
exports.PostDetailsMap = PostDetailsMap;
//# sourceMappingURL=postDetailsMap.js.map
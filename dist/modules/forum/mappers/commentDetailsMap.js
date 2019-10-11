"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentDetails_1 = require("../domain/commentDetails");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const commentId_1 = require("../domain/commentId");
const commentText_1 = require("../domain/commentText");
const memberDetailsMap_1 = require("./memberDetailsMap");
const postSlug_1 = require("../domain/postSlug");
const postTitle_1 = require("../domain/postTitle");
const commentVoteMap_1 = require("./commentVoteMap");
class CommentDetailsMap {
    static toDomain(raw) {
        const votes = raw.CommentVotes ? raw.CommentVotes.map((v) => commentVoteMap_1.CommentVoteMap.toDomain(v)) : [];
        const commentDetailsOrError = commentDetails_1.CommentDetails.create({
            postTitle: postTitle_1.PostTitle.create({ value: raw.Post.title }).getValue(),
            commentId: commentId_1.CommentId.create(new UniqueEntityID_1.UniqueEntityID(raw.comment_id)).getValue(),
            text: commentText_1.CommentText.create({ value: raw.text }).getValue(),
            member: memberDetailsMap_1.MemberDetailsMap.toDomain(raw.Member),
            createdAt: raw.createdAt,
            postSlug: postSlug_1.PostSlug.createFromExisting(raw.Post.slug).getValue(),
            parentCommentId: raw.parent_comment_id ? commentId_1.CommentId.create(new UniqueEntityID_1.UniqueEntityID(raw.parent_comment_id)).getValue() : null,
            points: raw.points,
            wasUpvotedByMe: !!votes.find((v) => v.isUpvote()),
            wasDownvotedByMe: !!votes.find((v) => v.isDownvote())
        });
        commentDetailsOrError.isFailure ? console.log(commentDetailsOrError.error) : '';
        return commentDetailsOrError.isSuccess ? commentDetailsOrError.getValue() : null;
    }
    static toDTO(commentDetails) {
        return {
            postSlug: commentDetails.postSlug.value,
            commentId: commentDetails.commentId.id.toString(),
            parentCommentId: commentDetails.parentCommentId ? commentDetails.parentCommentId.id.toString() : null,
            text: commentDetails.text.value,
            member: memberDetailsMap_1.MemberDetailsMap.toDTO(commentDetails.member),
            createdAt: commentDetails.createdAt,
            childComments: [],
            postTitle: commentDetails.postTitle.value,
            points: commentDetails.points,
            wasUpvotedByMe: commentDetails.wasUpvotedByMe,
            wasDownvotedByMe: commentDetails.wasDownvotedByMe
        };
    }
}
exports.CommentDetailsMap = CommentDetailsMap;
//# sourceMappingURL=commentDetailsMap.js.map
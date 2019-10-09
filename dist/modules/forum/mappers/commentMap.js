"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../domain/comment");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const postId_1 = require("../domain/postId");
const memberId_1 = require("../domain/memberId");
const commentId_1 = require("../domain/commentId");
const commentText_1 = require("../domain/commentText");
class CommentMap {
    static toPersistence(comment) {
        return {
            post_id: comment.postId.id.toString(),
            comment_id: comment.commentId.id.toString(),
            member_id: comment.memberId.id.toString(),
            parent_comment_id: comment.parentCommentId ? comment.parentCommentId.id.toString() : null,
            text: comment.text.value,
            points: comment.points
        };
    }
    static toDomain(raw) {
        const commentOrError = comment_1.Comment.create({
            postId: postId_1.PostId.create(new UniqueEntityID_1.UniqueEntityID(raw.post_id)).getValue(),
            memberId: memberId_1.MemberId.create(new UniqueEntityID_1.UniqueEntityID(raw.member_id)).getValue(),
            parentCommentId: raw.parent_comment_id ? commentId_1.CommentId.create(new UniqueEntityID_1.UniqueEntityID(raw.parent_comment_id)).getValue() : null,
            text: commentText_1.CommentText.create({ value: raw.text }).getValue(),
        }, new UniqueEntityID_1.UniqueEntityID(raw.comment_id));
        commentOrError.isFailure ? console.log(commentOrError.error) : '';
        return commentOrError.isSuccess ? commentOrError.getValue() : null;
    }
}
exports.CommentMap = CommentMap;
//# sourceMappingURL=commentMap.js.map
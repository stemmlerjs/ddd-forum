"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commentVote_1 = require("../domain/commentVote");
const memberId_1 = require("../domain/memberId");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const commentId_1 = require("../domain/commentId");
class CommentVoteMap {
    static toDomain(raw) {
        const voteType = raw.type;
        const commentVoteOrError = commentVote_1.CommentVote.create({
            memberId: memberId_1.MemberId.create(new UniqueEntityID_1.UniqueEntityID(raw.member_id)).getValue(),
            commentId: commentId_1.CommentId.create(new UniqueEntityID_1.UniqueEntityID(raw.comment_id)).getValue(),
            type: voteType
        }, new UniqueEntityID_1.UniqueEntityID(raw.comment_vote_id));
        commentVoteOrError.isFailure ? console.log(commentVoteOrError.error) : '';
        return commentVoteOrError.isSuccess ? commentVoteOrError.getValue() : null;
    }
    static toPersistence(vote) {
        return {
            comment_vote_id: vote.id.toString(),
            comment_id: vote.commentId.id.toString(),
            member_id: vote.memberId.id.toString(),
            type: vote.type
        };
    }
}
exports.CommentVoteMap = CommentVoteMap;
//# sourceMappingURL=commentVoteMap.js.map
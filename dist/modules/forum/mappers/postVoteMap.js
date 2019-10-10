"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postVote_1 = require("../domain/postVote");
const memberId_1 = require("../domain/memberId");
const UniqueEntityID_1 = require("../../../shared/domain/UniqueEntityID");
const postId_1 = require("../domain/postId");
class PostVoteMap {
    static toDomain(raw) {
        const voteType = raw.type;
        const postVoteOrError = postVote_1.PostVote.create({
            memberId: memberId_1.MemberId.create(new UniqueEntityID_1.UniqueEntityID(raw.member_id)).getValue(),
            postId: postId_1.PostId.create(new UniqueEntityID_1.UniqueEntityID(raw.post_id)).getValue(),
            type: voteType
        }, new UniqueEntityID_1.UniqueEntityID(raw.post_vote_id));
        postVoteOrError.isFailure ? console.log(postVoteOrError.error) : '';
        return postVoteOrError.isSuccess ? postVoteOrError.getValue() : null;
    }
    static toPersistence(vote) {
        return {
            post_vote_id: vote.id.toString(),
            post_id: vote.postId.id.toString(),
            member_id: vote.memberId.id.toString(),
            type: vote.type
        };
    }
}
exports.PostVoteMap = PostVoteMap;
//# sourceMappingURL=postVoteMap.js.map
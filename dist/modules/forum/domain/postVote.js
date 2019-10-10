"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../../shared/domain/Entity");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class PostVote extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    get postId() {
        return this.props.postId;
    }
    get memberId() {
        return this.props.memberId;
    }
    get type() {
        return this.props.type;
    }
    isUpvote() {
        return this.props.type === 'UPVOTE';
    }
    isDownvote() {
        return this.props.type === 'DOWNVOTE';
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.memberId, argumentName: 'memberId' },
            { argument: props.postId, argumentName: 'postId' },
            { argument: props.type, argumentName: 'type' }
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new PostVote(props, id));
        }
    }
    static createUpvote(memberId, postId) {
        const memberGuard = Guard_1.Guard.againstNullOrUndefined(memberId, 'memberId');
        const postGuard = Guard_1.Guard.againstNullOrUndefined(postId, 'postId');
        if (!memberGuard.succeeded) {
            return Result_1.Result.fail(memberGuard.message);
        }
        if (!postGuard.succeeded) {
            return Result_1.Result.fail(postGuard.message);
        }
        return Result_1.Result.ok(new PostVote({
            memberId,
            postId,
            type: 'UPVOTE',
        }));
    }
    static createDownvote(memberId, postId) {
        const memberGuard = Guard_1.Guard.againstNullOrUndefined(memberId, 'memberId');
        const postGuard = Guard_1.Guard.againstNullOrUndefined(postId, 'postId');
        if (!memberGuard.succeeded) {
            return Result_1.Result.fail(memberGuard.message);
        }
        if (!postGuard.succeeded) {
            return Result_1.Result.fail(postGuard.message);
        }
        return Result_1.Result.ok(new PostVote({
            memberId,
            postId,
            type: 'DOWNVOTE',
        }));
    }
}
exports.PostVote = PostVote;
//# sourceMappingURL=postVote.js.map
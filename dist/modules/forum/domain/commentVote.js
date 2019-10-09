"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../../shared/domain/Entity");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class CommentVote extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    get commentId() {
        return this.props.CommentId;
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
            { argument: props.CommentId, argumentName: 'commentId' },
            { argument: props.type, argumentName: 'type' }
        ]);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new CommentVote(props, id));
        }
    }
}
exports.CommentVote = CommentVote;
//# sourceMappingURL=commentVote.js.map
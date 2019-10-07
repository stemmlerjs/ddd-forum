"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../../shared/domain/Entity");
const Result_1 = require("../../../shared/core/Result");
const commentId_1 = require("./commentId");
const Guard_1 = require("../../../shared/core/Guard");
const lodash_1 = require("lodash");
class Comment extends Entity_1.Entity {
    get commentId() {
        return commentId_1.CommentId.create(this._id)
            .getValue();
    }
    get postId() {
        return this.props.postId;
    }
    get parentCommentId() {
        return this.props.parentCommentId;
    }
    get memberId() {
        return this.props.memberId;
    }
    get text() {
        return this.props.text;
    }
    get points() {
        return this.props.points;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const nullGuard = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.memberId, argumentName: 'memberId' },
            { argument: props.text, argumentName: 'text' },
            { argument: props.postId, argumentName: 'postId' },
        ]);
        if (!nullGuard.succeeded) {
            return Result_1.Result.fail(nullGuard.message);
        }
        else {
            return Result_1.Result.ok(new Comment(Object.assign(Object.assign({}, props), { points: lodash_1.has(props, 'points') ? props.points : 1 }), id));
        }
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map
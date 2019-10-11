"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
class CommentDetails extends ValueObject_1.ValueObject {
    get commentId() {
        return this.props.commentId;
    }
    get text() {
        return this.props.text;
    }
    get member() {
        return this.props.member;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get postSlug() {
        return this.props.postSlug;
    }
    get postTitle() {
        return this.props.postTitle;
    }
    get parentCommentId() {
        return this.props.parentCommentId;
    }
    get points() {
        return this.props.points;
    }
    get wasUpvotedByMe() {
        return this.props.wasUpvotedByMe;
    }
    get wasDownvotedByMe() {
        return this.props.wasDownvotedByMe;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const nullGuard = Guard_1.Guard.againstNullOrUndefinedBulk([
            { argument: props.commentId, argumentName: 'commentId' },
            { argument: props.text, argumentName: 'text' },
            { argument: props.member, argumentName: 'member' },
            { argument: props.createdAt, argumentName: 'createdAt' },
            { argument: props.postSlug, argumentName: 'postSlug' },
            { argument: props.postTitle, argumentName: 'postTitle' },
            { argument: props.points, argumentName: 'points' }
        ]);
        if (!nullGuard.succeeded) {
            return Result_1.Result.fail(nullGuard.message);
        }
        return Result_1.Result.ok(new CommentDetails(Object.assign(Object.assign({}, props), { wasUpvotedByMe: props.wasUpvotedByMe ? props.wasUpvotedByMe : false, wasDownvotedByMe: props.wasDownvotedByMe ? props.wasDownvotedByMe : false })));
    }
}
exports.CommentDetails = CommentDetails;
//# sourceMappingURL=commentDetails.js.map
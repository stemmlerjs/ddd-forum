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
    get parentCommentId() {
        return this.props.parentCommentId;
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
            { argument: props.parentCommentId, argumentName: 'parentCommentId' }
        ]);
        if (!nullGuard.succeeded) {
            return Result_1.Result.fail(nullGuard.message);
        }
        return Result_1.Result.ok(new CommentDetails(props));
    }
}
exports.CommentDetails = CommentDetails;
//# sourceMappingURL=commentDetails.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../../shared/domain/Entity");
const Result_1 = require("../../../shared/core/Result");
const commentId_1 = require("./commentId");
const Guard_1 = require("../../../shared/core/Guard");
const lodash_1 = require("lodash");
const commentVote_1 = require("./commentVote");
const commentVotes_1 = require("./commentVotes");
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
    removeVote(vote) {
        if (!this.props.votes.exists(vote)) {
            return Result_1.Result.fail("This vote doesn't exist.");
        }
        this.props.votes.remove(vote);
        this.props.points--;
        return Result_1.Result.ok();
    }
    addVote(vote) {
        if (this.props.votes.exists(vote)) {
            return Result_1.Result.fail("Already added this vote.");
        }
        this.props.votes.add(vote);
        this.props.points++;
        return Result_1.Result.ok();
    }
    getVotes() {
        return this.props.votes;
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
            const isNewComment = !!id === false;
            const defaultCommentProps = Object.assign(Object.assign({}, props), { points: lodash_1.has(props, 'points') ? props.points : 0, votes: props.votes ? props.votes : commentVotes_1.CommentVotes.create([]) });
            const comment = new Comment(defaultCommentProps, id);
            if (isNewComment) {
                comment.addVote(commentVote_1.CommentVote.createUpvote(props.memberId, comment.commentId).getValue());
            }
            return Result_1.Result.ok(comment);
        }
    }
}
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map
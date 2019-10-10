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
        let initialValue = this.props.points;
        return initialValue
            + this.computeVotePoints();
    }
    computeVotePoints() {
        let tally = 0;
        for (let vote of this.props.votes.getNewItems()) {
            if (vote.isUpvote()) {
                tally++;
            }
            if (vote.isDownvote()) {
                tally--;
            }
        }
        for (let vote of this.props.votes.getRemovedItems()) {
            if (vote.isUpvote()) {
                tally--;
            }
            if (vote.isDownvote()) {
                tally++;
            }
        }
        return tally;
    }
    removeVote(vote) {
        this.props.votes.remove(vote);
        return Result_1.Result.ok();
    }
    addVote(vote) {
        this.props.votes.add(vote);
        return Result_1.Result.ok();
    }
    getVotes() {
        return this.props.votes;
    }
    updateScore(totalNumUpvotes, totalNumDownvotes) {
        this.props.points = totalNumUpvotes - totalNumDownvotes;
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
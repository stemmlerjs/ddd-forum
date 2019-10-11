"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("../../../shared/domain/AggregateRoot");
const Result_1 = require("../../../shared/core/Result");
const postId_1 = require("./postId");
const Guard_1 = require("../../../shared/core/Guard");
const lodash_1 = require("lodash");
const postCreated_1 = require("./events/postCreated");
const commentPosted_1 = require("./events/commentPosted");
const postVote_1 = require("./postVote");
const postVotesChanged_1 = require("./events/postVotesChanged");
const postVotes_1 = require("./postVotes");
const comments_1 = require("./comments");
const commentVotesChanged_1 = require("./events/commentVotesChanged");
class Post extends AggregateRoot_1.AggregateRoot {
    get postId() {
        return postId_1.PostId.create(this._id)
            .getValue();
    }
    get memberId() {
        return this.props.memberId;
    }
    get title() {
        return this.props.title;
    }
    get slug() {
        return this.props.slug;
    }
    get dateTimePosted() {
        return this.props.dateTimePosted;
    }
    get comments() {
        return this.props.comments;
    }
    get points() {
        return this.props.points;
    }
    get link() {
        return this.props.link;
    }
    get text() {
        return this.props.text;
    }
    get type() {
        return this.props.type;
    }
    get totalNumComments() {
        return this.props.totalNumComments;
    }
    updateTotalNumberComments(numComments) {
        if (numComments >= 0) {
            this.props.totalNumComments = numComments;
        }
    }
    updatePostScore(numPostUpvotes, numPostDownvotes, numPostCommentUpvotes, numPostCommentDownvotes) {
        this.props.points = (numPostUpvotes - numPostDownvotes) +
            (numPostCommentUpvotes - numPostCommentDownvotes);
    }
    addVote(vote) {
        this.props.votes.add(vote);
        this.addDomainEvent(new postVotesChanged_1.PostVotesChanged(this, vote));
        return Result_1.Result.ok();
    }
    removeVote(vote) {
        this.props.votes.remove(vote);
        this.addDomainEvent(new postVotesChanged_1.PostVotesChanged(this, vote));
        return Result_1.Result.ok();
    }
    removeCommentIfExists(comment) {
        if (this.props.comments.exists(comment)) {
            this.props.comments.remove(comment);
        }
    }
    addComment(comment) {
        this.removeCommentIfExists(comment);
        this.props.comments.add(comment);
        this.props.totalNumComments++;
        this.addDomainEvent(new commentPosted_1.CommentPosted(this, comment));
        return Result_1.Result.ok();
    }
    updateComment(comment) {
        this.removeCommentIfExists(comment);
        this.props.comments.add(comment);
        this.addDomainEvent(new commentVotesChanged_1.CommentVotesChanged(this, comment));
        return Result_1.Result.ok();
    }
    isLinkPost() {
        return this.props.type === 'link';
    }
    isTextPost() {
        return this.props.type === 'text';
    }
    getVotes() {
        return this.props.votes;
    }
    constructor(props, id) {
        super(props, id);
    }
    static isValidPostType(rawType) {
        const linkType = 'link';
        const textType = 'text';
        return rawType === textType || rawType === linkType;
    }
    static create(props, id) {
        const guardArgs = [
            { argument: props.memberId, argumentName: 'memberId' },
            { argument: props.slug, argumentName: 'slug' },
            { argument: props.title, argumentName: 'title' },
            { argument: props.type, argumentName: 'type' },
        ];
        if (props.type === 'link') {
            guardArgs.push({ argument: props.link, argumentName: 'link' });
        }
        else {
            guardArgs.push({ argument: props.text, argumentName: 'text' });
        }
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardArgs);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        if (!this.isValidPostType(props.type)) {
            return Result_1.Result.fail("Invalid post type provided.");
        }
        const defaultValues = Object.assign(Object.assign({}, props), { comments: props.comments ? props.comments : comments_1.Comments.create([]), points: lodash_1.has(props, 'points') ? props.points : 0, dateTimePosted: props.dateTimePosted ? props.dateTimePosted : new Date(), totalNumComments: props.totalNumComments ? props.totalNumComments : 0, votes: props.votes ? props.votes : postVotes_1.PostVotes.create([]) });
        const isNewPost = !!id === false;
        const post = new Post(defaultValues, id);
        if (isNewPost) {
            post.addDomainEvent(new postCreated_1.PostCreated(post));
            // Create with initial upvote from whomever created the post
            post.addVote(postVote_1.PostVote.createUpvote(props.memberId, post.postId).getValue());
        }
        return Result_1.Result.ok(post);
    }
}
exports.Post = Post;
//# sourceMappingURL=post.js.map
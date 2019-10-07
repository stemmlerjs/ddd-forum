"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValueObject_1 = require("../../../shared/domain/ValueObject");
const Result_1 = require("../../../shared/core/Result");
const Guard_1 = require("../../../shared/core/Guard");
const post_1 = require("./post");
class PostDetails extends ValueObject_1.ValueObject {
    get member() {
        return this.props.member;
    }
    get slug() {
        return this.props.slug;
    }
    get title() {
        return this.props.title;
    }
    get postType() {
        return this.props.type;
    }
    get text() {
        return this.props.text;
    }
    get link() {
        return this.props.link;
    }
    get numComments() {
        return this.props.numComments;
    }
    get points() {
        return this.props.points;
    }
    get dateTimePosted() {
        return this.props.dateTimePosted;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardArgs = [
            { argument: props.member, argumentName: 'member' },
            { argument: props.slug, argumentName: 'slug' },
            { argument: props.title, argumentName: 'title' },
            { argument: props.type, argumentName: 'type' },
            { argument: props.numComments, argumentName: 'numComments' },
            { argument: props.points, argumentName: 'points' },
            { argument: props.dateTimePosted, argumentName: 'dateTimePosted' }
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
        if (!post_1.Post.isValidPostType(props.type)) {
            return Result_1.Result.fail("Invalid post type provided.");
        }
        return Result_1.Result.ok(new PostDetails(props));
    }
}
exports.PostDetails = PostDetails;
//# sourceMappingURL=postDetails.js.map
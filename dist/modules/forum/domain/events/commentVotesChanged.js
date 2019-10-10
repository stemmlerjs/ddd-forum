"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentVotesChanged {
    constructor(post, comment) {
        this.dateTimeOccurred = new Date();
        this.post = post;
        this.comment = comment;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.CommentVotesChanged = CommentVotesChanged;
//# sourceMappingURL=commentVotesChanged.js.map
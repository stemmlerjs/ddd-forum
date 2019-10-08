"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentPosted {
    constructor(post, comment) {
        this.dateTimeOccurred = new Date();
        this.post = post;
        this.comment = comment;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.CommentPosted = CommentPosted;
//# sourceMappingURL=commentPosted.js.map
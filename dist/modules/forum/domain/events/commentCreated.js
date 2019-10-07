"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentCreated {
    constructor(post, comment) {
        this.dateTimeOccurred = new Date();
        this.post = post;
        this.comment = comment;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.CommentCreated = CommentCreated;
//# sourceMappingURL=commentCreated.js.map
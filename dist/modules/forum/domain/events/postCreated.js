"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostCreated {
    constructor(post) {
        this.dateTimeOccurred = new Date();
        this.post = post;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.PostCreated = PostCreated;
//# sourceMappingURL=postCreated.js.map
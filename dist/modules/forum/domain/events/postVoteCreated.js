"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostVoteCreated {
    constructor(post, vote) {
        this.dateTimeOccurred = new Date();
        this.post = post;
        this.vote = vote;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.PostVoteCreated = PostVoteCreated;
//# sourceMappingURL=postVoteCreated.js.map
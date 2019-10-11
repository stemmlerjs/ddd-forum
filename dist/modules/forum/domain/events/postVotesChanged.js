"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostVotesChanged {
    constructor(post, vote) {
        this.dateTimeOccurred = new Date();
        this.post = post;
        this.vote = vote;
    }
    getAggregateId() {
        return this.post.id;
    }
}
exports.PostVotesChanged = PostVotesChanged;
//# sourceMappingURL=postVotesChanged.js.map
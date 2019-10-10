"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = require("../../../shared/domain/events/DomainEvents");
const commentVotesChanged_1 = require("../domain/events/commentVotesChanged");
class AfterCommentVotesChanged {
    constructor(updatePostStats, updateCommentStats) {
        this.setupSubscriptions();
        this.updatePostStats = updatePostStats;
        this.updateCommentStats = updateCommentStats;
    }
    setupSubscriptions() {
        // Register to the domain event
        DomainEvents_1.DomainEvents.register(this.onCommentVotesChanged.bind(this), commentVotesChanged_1.CommentVotesChanged.name);
    }
    async onCommentVotesChanged(event) {
        try {
            // First, update the comment stats
            await this.updateCommentStats.execute({ commentId: event.comment.commentId });
            // Then, update the post stats
            await this.updatePostStats.execute({ postId: event.post.postId.id.toString() });
        }
        catch (err) {
            console.log(err);
            console.log(`[AfterCommentVotesChanged]: Failed to update postId={${event.post.postId.id.toString()}}`);
        }
    }
}
exports.AfterCommentVotesChanged = AfterCommentVotesChanged;
//# sourceMappingURL=afterCommentVotesChanged.js.map
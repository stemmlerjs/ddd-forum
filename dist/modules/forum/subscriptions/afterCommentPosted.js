"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = require("../../../shared/domain/events/DomainEvents");
const commentPosted_1 = require("../domain/events/commentPosted");
class AfterCommentPosted {
    constructor(updatePostStats) {
        this.setupSubscriptions();
        this.updatePostStats = updatePostStats;
    }
    setupSubscriptions() {
        // Register to the domain event
        DomainEvents_1.DomainEvents.register(this.onCommentPosted.bind(this), commentPosted_1.CommentPosted.name);
    }
    async onCommentPosted(event) {
        try {
            await this.updatePostStats.execute({ postId: event.post.postId.id.toString() });
            console.log(`[AfterCommentPosted]: Updated post stats for {${event.post.title.value}}`);
        }
        catch (err) {
            console.log(`[AfterCommentPosted]: Failed to update post stats for {${event.post.title.value}}`);
        }
    }
}
exports.AfterCommentPosted = AfterCommentPosted;
//# sourceMappingURL=afterCommentPosted.js.map
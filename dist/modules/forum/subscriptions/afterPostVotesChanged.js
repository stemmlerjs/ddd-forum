"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DomainEvents_1 = require("../../../shared/domain/events/DomainEvents");
const postVotesChanged_1 = require("../domain/events/postVotesChanged");
class AfterPostVotesChanged {
    constructor(updatePostStats) {
        this.setupSubscriptions();
        this.updatePostStats = updatePostStats;
    }
    setupSubscriptions() {
        // Register to the domain event
        DomainEvents_1.DomainEvents.register(this.onPostVotesChanged.bind(this), postVotesChanged_1.PostVotesChanged.name);
    }
    async onPostVotesChanged(event) {
        let postId = event.post.postId;
        try {
            // Then, update the post stats
            await this.updatePostStats.execute({ postId: postId.id.toString() });
            console.log(`[AfterPostVotesChanged]: Updated votes on postId={${postId.id.toString()}}`);
        }
        catch (err) {
            console.log(err);
            console.log(`[AfterPostVotesChanged]: Failed to update votes on postId={${postId.id.toString()}}`);
        }
    }
}
exports.AfterPostVotesChanged = AfterPostVotesChanged;
//# sourceMappingURL=afterPostVotesChanged.js.map
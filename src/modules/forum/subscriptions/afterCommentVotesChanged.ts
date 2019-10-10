
import { IHandle } from "../../../shared/domain/events/IHandle";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { UpdatePostStats } from "../useCases/post/updatePostStats/UpdatePostStats";
import { CommentVotesChanged } from "../domain/events/commentVotesChanged";
import { UpdateCommentStats } from "../useCases/comments/updateCommentStats/UpdateCommentStats";

export class AfterCommentVotesChanged implements IHandle<CommentVotesChanged> {
  private updatePostStats: UpdatePostStats;
  private updateCommentStats: UpdateCommentStats;

  constructor (updatePostStats: UpdatePostStats, updateCommentStats: UpdateCommentStats) {
    this.setupSubscriptions();
    this.updatePostStats = updatePostStats;
    this.updateCommentStats = updateCommentStats;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onCommentVotesChanged.bind(this), CommentVotesChanged.name);
  }

  private async onCommentVotesChanged (event: CommentVotesChanged): Promise<void> {
    try {
      // First, update the comment stats
      await this.updateCommentStats.execute({ commentId: event.comment.commentId });
      // Then, update the post stats
      await this.updatePostStats.execute({ postId: event.post.postId.id.toString() });
    } catch (err) {
      console.log(err);
      console.log(`[AfterCommentVotesChanged]: Failed to update postId={${event.post.postId.id.toString()}}`)
    }
  }

}
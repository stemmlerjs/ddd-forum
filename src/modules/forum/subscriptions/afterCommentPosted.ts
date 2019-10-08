
import { IHandle } from "../../../shared/domain/events/IHandle";
import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { CommentPosted } from "../domain/events/commentPosted";
import { UpdatePostStats } from "../useCases/post/updatePostStats/UpdatePostStats";

export class AfterCommentPosted implements IHandle<CommentPosted> {
  private updatePostStats: UpdatePostStats;

  constructor (updatePostStats: UpdatePostStats) {
    this.setupSubscriptions();
    this.updatePostStats = updatePostStats;
  }

  setupSubscriptions(): void {
    // Register to the domain event
    DomainEvents.register(this.onCommentPosted.bind(this), CommentPosted.name);
  }

  private async onCommentPosted (event: CommentPosted): Promise<void> {

    try {
      await this.updatePostStats.execute({ postId: event.post.postId.id.toString() });
      console.log(`[AfterCommentPosted]: Updated post stats for {${event.post.title.value}}`);
    } catch (err) {
      console.log(`[AfterCommentPosted]: Failed to update post stats for {${event.post.title.value}}`);
    }
  }

}
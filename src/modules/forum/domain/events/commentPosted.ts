
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Comment } from "../comment";
import { Post } from "../post";

export class CommentPosted implements IDomainEvent {
  public dateTimeOccurred: Date;
  public post: Post;
  public comment: Comment;

  constructor (post: Post, comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.post = post;
    this.comment = comment;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.post.id;
  }
}
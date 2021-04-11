
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Post } from "../post";

export class PostCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public post: Post;

  constructor (post: Post) {
    this.dateTimeOccurred = new Date();
    this.post = post;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.post.id;
  }
}
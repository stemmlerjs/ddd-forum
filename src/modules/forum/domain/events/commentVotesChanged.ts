

import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Post } from "../post";
import { Comment } from "../comment";

export class CommentVotesChanged implements IDomainEvent {
  public dateTimeOccurred: Date;
  public post: Post;
  public comment: Comment;

  constructor (post: Post, comment: Comment) {
    this.dateTimeOccurred = new Date();
    this.post = post;
    this.comment = comment
  }
  
  getAggregateId (): UniqueEntityID {
    return this.post.id;
  }
}
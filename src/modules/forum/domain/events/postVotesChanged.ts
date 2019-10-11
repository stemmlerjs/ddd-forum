

import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Post } from "../post";
import { PostVote } from "../postVote";

export class PostVotesChanged implements IDomainEvent {
  public dateTimeOccurred: Date;
  public post: Post;
  public vote: PostVote;

  constructor (post: Post, vote: PostVote) {
    this.dateTimeOccurred = new Date();
    this.post = post;
    this.vote = vote
  }
  
  getAggregateId (): UniqueEntityID {
    return this.post.id;
  }
}

import { Entity } from "../../../shared/domain/Entity";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CommentId } from "./commentId";
import { CommentText } from "./commentText";
import { MemberId } from "./memberId";
import { Guard } from "../../../shared/core/Guard";
import { PostId } from "./postId";
import { has } from 'lodash'
import { CommentVote } from "./commentVote";
import { CommentVotes } from "./commentVotes";

export interface CommentProps {
  memberId: MemberId;
  text: CommentText;
  postId: PostId;
  votes?: CommentVotes;
  parentCommentId?: CommentId;
  points?: number;
}

export class Comment extends Entity<CommentProps> {

  get commentId (): CommentId {
    return CommentId.create(this._id)
      .getValue();
  }

  get postId (): PostId {
    return this.props.postId;
  }

  get parentCommentId (): CommentId {
    return this.props.parentCommentId;
  }

  get memberId (): MemberId {
    return this.props.memberId;
  }

  get text (): CommentText {
    return this.props.text;
  }

  get points (): number {
    let initialValue = this.props.points;
    return initialValue 
      + this.computeVotePoints()
  }

  private computeVotePoints (): number {
    let tally = 0;
    
    for (let vote of this.props.votes.getNewItems()) {

      if (vote.isUpvote()) {
        tally++;
      } 

      if (vote.isDownvote()) {
        tally--;
      }
    } 

    for (let vote of this.props.votes.getRemovedItems()) {

      if (vote.isUpvote()) {
        tally--;
      } 

      if (vote.isDownvote()) {
        tally++;
      }
    } 

    return tally;
  }

  public removeVote (vote: CommentVote): Result<void> {
    this.props.votes.remove(vote);
    return Result.ok<void>();
  }

  public addVote (vote: CommentVote): Result<void> {
    this.props.votes.add(vote);
    return Result.ok<void>();
  }

  public getVotes (): CommentVotes {
    return this.props.votes;
  }

  public updateScore (totalNumUpvotes: number, totalNumDownvotes: number): void {
    this.props.points = totalNumUpvotes - totalNumDownvotes;
  }

  private constructor (props: CommentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: CommentProps, id?: UniqueEntityID): Result<Comment> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.text, argumentName: 'text' },
      { argument: props.postId, argumentName: 'postId' },
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Comment>(nullGuard.getErrorValue());
    } else {

      const isNewComment = !!id === false;

      const defaultCommentProps: CommentProps = {
        ...props,
        points: has(props, 'points') ? props.points : 0,
        votes: props.votes ? props.votes : CommentVotes.create([])
      }

      const comment = new Comment(defaultCommentProps, id);

      if (isNewComment) {
        comment.addVote(
          CommentVote.createUpvote(props.memberId, comment.commentId).getValue()
        )
      }

      return Result.ok<Comment>(comment);
    }
  }
}
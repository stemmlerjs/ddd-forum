
import { Entity } from "../../../shared/domain/Entity";
import { Result } from "../../../shared/core/Result";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CommentId } from "./commentId";
import { CommentText } from "./commentText";
import { MemberId } from "./memberId";
import { Guard } from "../../../shared/core/Guard";
import { PostId } from "./postId";
import { has } from 'lodash'

export interface CommentProps {
  memberId: MemberId;
  text: CommentText;
  postId: PostId;
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
    return this.props.points;
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

    if (!nullGuard.succeeded) {
      return Result.fail<Comment>(nullGuard.message);
    } else {

      return Result.ok<Comment>(new Comment({
        ...props,
        points: has(props, 'points') ? props.points : 1
      }, id));
    }
  }
}
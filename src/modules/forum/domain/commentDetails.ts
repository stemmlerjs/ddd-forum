
import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { CommentText } from "./commentText";
import { CommentId } from "./commentId";
import { Member } from "./member";
import { PostSlug } from "./postSlug";
import { Guard } from "../../../shared/core/Guard";

interface CommentDetailsProps {
  commentId: CommentId;
  text: CommentText;
  member: Member;
  createdAt: Date | string;
  postSlug: PostSlug;
  parentCommentId?: CommentId;
}

export class CommentDetails extends ValueObject<CommentDetailsProps> {

  get commentId (): CommentId {
    return this.props.commentId;
  }

  get text (): CommentText {
    return this.props.text;
  }

  get member (): Member {
    return this.props.member;
  }

  get createdAt (): Date | string {
    return this.props.createdAt;
  }

  get postSlug (): PostSlug {
    return this.props.postSlug
  }

  get parentCommentId (): CommentId {
    return this.props.parentCommentId;
  }

  private constructor (props: CommentDetailsProps) {
    super(props);
  }

  public static create (props: CommentDetailsProps): Result<CommentDetails> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.commentId, argumentName: 'commentId' },
      { argument: props.text, argumentName: 'text' },
      { argument: props.member, argumentName: 'member' },
      { argument: props.createdAt, argumentName: 'createdAt' },
      { argument: props.postSlug, argumentName: 'postSlug' },
      { argument: props.parentCommentId, argumentName: 'parentCommentId' }
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail<CommentDetails>(nullGuard.message);
    }

    return Result.ok<CommentDetails>(new CommentDetails(props));
  }
}
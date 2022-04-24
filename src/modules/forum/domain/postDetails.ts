
import { ValueObject } from "../../../shared/domain/ValueObject";
import { PostLink } from "./postLink";
import { PostText } from "./postText";
import { PostType } from "./postType";
import { PostTitle } from "./postTitle";
import { PostSlug } from "./postSlug";
import { MemberDetails } from "./memberDetails";
import { Result } from "../../../shared/core/Result";
import { IGuardArgument, Guard } from "../../../shared/core/Guard";
import { Post } from "./post";

interface PostDetailsProps {
  member: MemberDetails;
  slug: PostSlug;
  title: PostTitle;
  type: PostType;
  text?: PostText;
  link?: PostLink;
  numComments: number;
  points: number;
  dateTimePosted: string | Date;
  wasUpvotedByMe: boolean;
  wasDownvotedByMe: boolean;
}

export class PostDetails extends ValueObject<PostDetailsProps> {

  get member (): MemberDetails {
    return this.props.member;
  }

  get slug (): PostSlug {
    return this.props.slug;
  }

  get title (): PostTitle {
    return this.props.title;
  }

  get postType (): PostType {
    return this.props.type;
  }

  get text (): PostText {
    return this.props.text;
  }

  get link (): PostLink {
    return this.props.link;
  }

  get numComments (): number {
    return this.props.numComments;
  }

  get points (): number {
    return this.props.points;
  }

  get dateTimePosted (): string | Date {
    return this.props.dateTimePosted;
  }

  get wasUpvotedByMe (): boolean {
    return this.props.wasUpvotedByMe;
  }

  get wasDownvotedByMe (): boolean {
    return this.props.wasDownvotedByMe;
  }

  private constructor (props: PostDetailsProps) {
    super(props);
  }

  public static create (props: PostDetailsProps): Result<PostDetails> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.member, argumentName: 'member' },
      { argument: props.slug, argumentName: 'slug' },
      { argument: props.title, argumentName: 'title' },
      { argument: props.type, argumentName: 'type' },
      { argument: props.numComments, argumentName: 'numComments' },
      { argument: props.points, argumentName: 'points' },
      { argument: props.dateTimePosted, argumentName: 'dateTimePosted' },
    ];

    if (props.type === 'link') {
      guardArgs.push({ argument: props.link, argumentName: 'link' })
    } else {
      guardArgs.push({ argument: props.text, argumentName: 'text' })
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (guardResult.isFailure) {
      return Result.fail<PostDetails>(guardResult.getErrorValue());
    }

    if (!Post.isValidPostType(props.type)) {
      return Result.fail<PostDetails>("Invalid post type provided.")
    }

    return Result.ok<PostDetails>(new PostDetails({
      ...props,
      wasUpvotedByMe: props.wasUpvotedByMe ? props.wasUpvotedByMe : false,
      wasDownvotedByMe: props.wasDownvotedByMe ? props.wasDownvotedByMe : false
    }));
  }
}

import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { MemberId } from "./memberId";
import { PostSlug } from "./postSlug";
import { PostTitle } from "./postTitle";
import { PostId } from "./postId";
import { PostText } from "./postText";
import { Comment } from "./comment";
import { Guard, IGuardArgument } from "../../../shared/core/Guard";
import { has } from 'lodash'
import { PostCreated } from "./events/postCreated";
import { PostType } from "./postType";
import { PostLink } from "./postLink";
import { CommentPosted } from "./events/commentPosted";
import { PostVote } from "./postVote";
import { PostVoteCreated } from "./events/postVoteCreated";

export interface PostProps {
  memberId: MemberId;
  slug: PostSlug;
  title: PostTitle;
  type: PostType;
  text?: PostText;
  link?: PostLink;
  comments?: Comment[];
  votes?: PostVote[];
  totalNumComments?: number;
  points?: number; // posts can have negative or positive valued points
  dateTimePosted?: string | Date;
}

export class Post extends AggregateRoot<PostProps> {

  get postId (): PostId {
    return PostId.create(this._id)
    .getValue();
  }

  get memberId (): MemberId {
    return this.props.memberId;
  }

  get title (): PostTitle {
    return this.props.title;
  }

  get slug (): PostSlug {
    return this.props.slug;
  }

  get dateTimePosted (): string | Date {
    return this.props.dateTimePosted;
  }

  get comments (): Comment[] {
    return this.props.comments;
  }

  get points (): number {
    return this.props.points;
  }

  get link (): PostLink {
    return this.props.link;
  }

  get text (): PostText {
    return this.props.text;
  }

  get type (): PostType {
    return this.props.type;
  }

  get votes (): PostVote [] {
    return this.props.votes;
  }

  get totalNumComments (): number {
    return this.props.totalNumComments;
  }

  public updateTotalNumberComments (numComments: number): void {
    if (numComments >= 0) {
      this.props.totalNumComments = numComments;
    }
  }

  public addVote (vote: PostVote): Result<void> {
    this.props.votes.push(vote);
    if (vote.isUpvote()) {
      this.props.points++;
    } else {
      this.props.points--;
    }
    this.addDomainEvent(new PostVoteCreated(this, vote));
    return Result.ok<void>();
  }

  public removeUpvote (deletedVote: PostVote): Result<void> {
    this.props.points--;
    this.props.votes.push(deletedVote);
    // Domain event
    return Result.ok<void>();
  }

  public removeDownvote (deletedVote: PostVote): Result<void> {
    this.props.points++;
    this.props.votes.push(deletedVote);
    // Domain event
    return Result.ok<void>();
  }

  public addComment (comment: Comment): Result<void> {
    this.props.comments.push(comment);
    this.props.totalNumComments++;
    this.addDomainEvent(new CommentPosted(this, comment));
    return Result.ok<void>();
  }

  public isLinkPost (): boolean {
    return this.props.type === 'link';
  }

  public isTextPost (): boolean {
    return this.props.type === 'text';
  }

  private constructor (props: PostProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static isValidPostType (rawType: string): boolean {
    const linkType: PostType = 'link';
    const textType: PostType = 'text';
    return rawType === textType || rawType === linkType;
  }

  public static create (props: PostProps, id?: UniqueEntityID): Result<Post> {
    const guardArgs: IGuardArgument[] = [
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.slug, argumentName: 'slug' },
      { argument: props.title, argumentName: 'title' },
      { argument: props.type, argumentName: 'type' },
    ];

    if (props.type === 'link') {
      guardArgs.push({ argument: props.link, argumentName: 'link' })
    } else {
      guardArgs.push({ argument: props.text, argumentName: 'text' })
    }

    const guardResult = Guard.againstNullOrUndefinedBulk(guardArgs);

    if (!guardResult.succeeded) {
      return Result.fail<Post>(guardResult.message);
    }

    if (!this.isValidPostType(props.type)) {
      return Result.fail<Post>("Invalid post type provided.")
    }

    const defaultValues: PostProps = {
      ...props,
      comments: props.comments ? props.comments : [],
      points: has(props, 'points') ? props.points : 0,
      dateTimePosted: props.dateTimePosted ? props.dateTimePosted : new Date(),
      totalNumComments: props.totalNumComments ? props.totalNumComments : 0,
      votes: props.votes ? props.votes : []
    };

    const isNewPost = !!id === false;
    const post = new Post(defaultValues, id);

    if (isNewPost) {
      post.addDomainEvent(new PostCreated(post));

      // Create with initial upvote from whomever created the post
      post.addVote(
        PostVote.createUpvote(props.memberId, post.postId).getValue()
      )
    }

    return Result.ok<Post>(post);
  }
}

import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { PostId } from "./postId";
import { MemberId } from "./memberId";
import { Guard } from "../../../shared/core/Guard";
import { VoteType } from "./vote";

interface PostVoteProps {
  postId: PostId;
  memberId: MemberId;
  type: VoteType;
}

export class PostVote extends Entity<PostVoteProps> {

  get id (): UniqueEntityID {
    return this._id;
  }

  get postId (): PostId {
    return this.props.postId;
  }

  get memberId (): MemberId {
    return this.props.memberId;
  }

  get type (): VoteType {
    return this.props.type;
  }

  public isUpvote (): boolean {
    return this.props.type === 'UPVOTE';
  }

  public isDownvote (): boolean {
    return this.props.type === 'DOWNVOTE';
  }

  private constructor (props: PostVoteProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: PostVoteProps, id?: UniqueEntityID): Result<PostVote> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.memberId, argumentName: 'memberId' },
      { argument: props.postId, argumentName: 'postId' },
      { argument: props.type, argumentName: 'type' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<PostVote>(guardResult.getErrorValue());
    } else {
      return Result.ok<PostVote>(new PostVote(props, id));
    }
  }

  public static createUpvote (memberId: MemberId, postId: PostId): Result<PostVote> {
    const memberGuard = Guard.againstNullOrUndefined(memberId, 'memberId');
    const postGuard = Guard.againstNullOrUndefined(postId, 'postId');

    if (memberGuard.isFailure) {
      return Result.fail<PostVote>(memberGuard.getErrorValue());
    }

    if (postGuard.isFailure) {
      return Result.fail<PostVote>(postGuard.getErrorValue());
    }

    return Result.ok<PostVote>(new PostVote({
      memberId,
      postId,
      type: 'UPVOTE',
    }));
  }

  public static createDownvote (memberId: MemberId, postId: PostId): Result<PostVote> {
    const memberGuard = Guard.againstNullOrUndefined(memberId, 'memberId');
    const postGuard = Guard.againstNullOrUndefined(postId, 'postId');

    if (memberGuard.isFailure) {
      return Result.fail<PostVote>(memberGuard.getErrorValue());
    }

    if (postGuard.isFailure) {
      return Result.fail<PostVote>(postGuard.getErrorValue());
    }

    return Result.ok<PostVote>(new PostVote({
      memberId,
      postId,
      type: 'DOWNVOTE',
    }));
  }
}
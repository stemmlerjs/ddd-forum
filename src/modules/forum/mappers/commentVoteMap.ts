
import { Mapper } from "../../../shared/infra/Mapper";
import { CommentVote } from "../domain/commentVote";
import { MemberId } from "../domain/memberId";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { CommentId } from "../domain/commentId";
import { VoteType } from "../domain/vote";

export class CommentVoteMap implements Mapper<CommentVote> {

  public static toDomain (raw: any): CommentVote {
    const voteType: VoteType = raw.type;

    const commentVoteOrError = CommentVote.create({
      memberId: MemberId.create(new UniqueEntityID(raw.member_id)).getValue(),
      commentId: CommentId.create(new UniqueEntityID(raw.comment_id)).getValue(),
      type: voteType
    }, new UniqueEntityID(raw.comment_vote_id));

    commentVoteOrError.isFailure ? console.log(commentVoteOrError.getErrorValue()) : '';

    return commentVoteOrError.isSuccess ? commentVoteOrError.getValue() : null;
  }

  public static toPersistence (vote: CommentVote): any {
    return {
      comment_vote_id: vote.id.toString(),
      comment_id: vote.commentId.id.toString(),
      member_id: vote.memberId.id.toString(),
      type: vote.type
    }
  }
  
}

import { UseCase } from "../../../../../shared/core/UseCase";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpdateCommentStatsDTO } from "./UpdateCommentStatsDTO";
import { ICommentVotesRepo } from "../../../repos/commentVotesRepo";
import { ICommentRepo } from "../../../repos/commentRepo";
import { Comment } from "../../../domain/comment";

type Response = Either<
  AppError.UnexpectedError,
  Result<void>
>

export class UpdateCommentStats implements UseCase<UpdateCommentStatsDTO, Promise<Response>> {
  
  private commentRepo: ICommentRepo;
  private commentVotesRepo: ICommentVotesRepo;

  constructor (commentRepo: ICommentRepo, commentVotesRepo: ICommentVotesRepo) {
    this.commentRepo = commentRepo;
    this.commentVotesRepo = commentVotesRepo;
  }

  public async execute (req: UpdateCommentStatsDTO): Promise<any> {
    try {
      // Get the comment
      const comment: Comment = await this.commentRepo
        .getCommentByCommentId(req.commentId.id.toString());

      // Get number upvotes and downvotes
      let [ numUpvotes, numDownvotes ] = await Promise.all([
        this.commentVotesRepo.countUpvotesForCommentByCommentId(req.commentId),
        this.commentVotesRepo.countDownvotesForCommentByCommentId(req.commentId)
      ]);

      comment.updateScore(numUpvotes, numDownvotes);

      await this.commentRepo.save(comment);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

import { UseCase } from "../../../../../shared/core/UseCase";
import { ICommentRepo } from "../../../repos/commentRepo";
import { GetCommentByCommentIdRequestDTO } from "./GetCommentByCommentIdRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { CommentDetails } from "../../../domain/commentDetails";
import { AppError } from "../../../../../shared/core/AppError";
import { GetCommentByCommentIdErrors } from "./GetCommentByCommentIdErrors";

type Response = Either<
  GetCommentByCommentIdErrors.CommentNotFoundError |
  AppError.UnexpectedError,
  Result<CommentDetails>
>

export class GetCommentByCommentId implements UseCase<GetCommentByCommentIdRequestDTO, Promise<Response>> {
  private commentRepo: ICommentRepo;

  constructor (commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }

  public async execute (req: GetCommentByCommentIdRequestDTO): Promise<Response> {
    let comment: CommentDetails;

    try {

      try {
        comment = await this.commentRepo.getCommentDetailsByCommentId(
          req.commentId
        )
      } catch (err) {
        return left(new GetCommentByCommentIdErrors.CommentNotFoundError(req.commentId));
      }

      return right(Result.ok<CommentDetails>(comment));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

import { UseCase } from "../../../../../shared/core/UseCase"; 
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetCommentsByPostSlugErrors } from "./GetCommentsByPostSlugErrors";
import { CommentDetails } from "../../../domain/commentDetails";
import { GetCommentsByPostSlugRequestDTO } from "./GetCommentsByPostSlugRequestDTO";
import { ICommentRepo } from "../../../repos/commentRepo";

type Response = Either<
  GetCommentsByPostSlugErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<CommentDetails[]>
>

export class GetCommentsByPostSlug implements UseCase<any, Promise<Response>> {
  private commentRepo: ICommentRepo;

  constructor (commentRepo: ICommentRepo) {
    this.commentRepo = commentRepo;
  }

  public async execute (req: GetCommentsByPostSlugRequestDTO): Promise<Response> {
    let comments: CommentDetails[];
    const { slug, offset } = req;

    try {
      
      try {
        comments = await this.commentRepo.getCommentDetailsByPostSlug(slug, offset);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok<CommentDetails[]>(comments));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

}

import { UseCase } from "../../../../../shared/core/UseCase"; 
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetCommentsByPostSlugErrors } from "./GetCommentsByPostSlugErrors";
import { CommentDetails } from "../../../domain/commentDetails";
import { GetCommentsByPostSlugRequestDTO } from "./GetCommentsByPostSlugRequestDTO";
import { ICommentRepo } from "../../../repos/commentRepo";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";

type Response = Either<
  GetCommentsByPostSlugErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<CommentDetails[]>
>

export class GetCommentsByPostSlug implements UseCase<any, Promise<Response>> {
  private commentRepo: ICommentRepo;
  private memberRepo: IMemberRepo;

  constructor (commentRepo: ICommentRepo, memberRepo: IMemberRepo) {
    this.commentRepo = commentRepo;
    this.memberRepo = memberRepo;
  }

  public async execute (req: GetCommentsByPostSlugRequestDTO): Promise<Response> {
    let memberId: MemberId;
    let comments: CommentDetails[];
    const { slug, offset } = req;
    const isAuthenticated = !!req.userId === true;

    if (isAuthenticated) {
      memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
    }

    try {
      
      try {
        comments = await this.commentRepo.getCommentDetailsByPostSlug(slug, memberId, offset);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok<CommentDetails[]>(comments));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

}
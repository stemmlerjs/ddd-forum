
import { UseCase } from "../../../../../shared/core/UseCase";
import { UpvotePostDTO } from "./UpvotePostDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { left, Either, Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpvotePostErrors } from "./UpvotePostErrors";

type Response = Either<
  UpvotePostErrors.MemberNotFoundError |
  UpvotePostErrors.AlreadyUpvotedError |
  UpvotePostErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<void>
>

export class UpvotePost implements UseCase<UpvotePostDTO, Promise<Response>> {
  private memberRepo: IMemberRepo;
  private postRepo: IPostRepo;
  
  constructor (memberRepo: IMemberRepo, postRepo: IPostRepo) {
    this.memberRepo = memberRepo;
    this.postRepo = postRepo;
  }

  public async execute (req: UpvotePostDTO): Promise<Response> {
    try {
      


    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
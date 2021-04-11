
import { Either, Result } from "../../../../../shared/core/Result";
import { UpvotePostErrors } from "./UpvotePostErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type UpvotePostResponse = Either<
  UpvotePostErrors.MemberNotFoundError |
  UpvotePostErrors.AlreadyUpvotedError |
  UpvotePostErrors.PostNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>
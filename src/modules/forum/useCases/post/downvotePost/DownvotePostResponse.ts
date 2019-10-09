
import { Either, Result } from "../../../../../shared/core/Result";
import { DownvotePostErrors } from "./DownvotePostErrors";
import { AppError } from "../../../../../shared/core/AppError";

export type DownvotePostResponse = Either<
  DownvotePostErrors.MemberNotFoundError |
  DownvotePostErrors.AlreadyDownvotedError |
  DownvotePostErrors.PostNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>
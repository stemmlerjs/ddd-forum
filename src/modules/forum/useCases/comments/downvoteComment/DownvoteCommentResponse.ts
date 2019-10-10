
import { Either, Result } from "../../../../../shared/core/Result";

import { AppError } from "../../../../../shared/core/AppError";
import { DownvoteCommentErrors } from "./DownvoteCommentErrors";

export type DownvoteCommentResponse = Either<
  DownvoteCommentErrors.CommentNotFoundError |
  DownvoteCommentErrors.MemberNotFoundError |
  DownvoteCommentErrors.PostNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>


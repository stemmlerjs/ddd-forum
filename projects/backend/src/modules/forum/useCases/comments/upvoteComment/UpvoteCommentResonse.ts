
import { Either, Result } from "../../../../../shared/core/Result";
import { UpvoteCommentErrors } from "./UpvoteCommentErrors";
import { AppError } from "../../../../../shared/core/AppError";
import { UpvotePostErrors } from "../../post/upvotePost/UpvotePostErrors";

export type UpvoteCommentResponse = Either<
  UpvotePostErrors.PostNotFoundError |
  UpvoteCommentErrors.CommentNotFoundError |
  UpvoteCommentErrors.MemberNotFoundError | 
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>


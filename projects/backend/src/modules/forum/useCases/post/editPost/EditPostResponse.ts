
import { Either, Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { EditPostErrors } from "./EditPostErrors";

export type EditPostResponse = Either<
  EditPostErrors.PostNotFoundError | 
  AppError.UnexpectedError | 
  Result<any>,
  Result<void>
>
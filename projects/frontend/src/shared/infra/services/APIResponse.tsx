import { APIErrorMessage } from "./APIErrorMessage";
import { Either } from "../../core/Either";
import { Result } from "../../core/Result";

export type APIResponse<T> = Either<APIErrorMessage, Result<T>>;
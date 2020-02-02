
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetRecentPostsRequestDTO } from "./GetRecentPostsRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDetails[]>
>

export class GetRecentPosts implements UseCase<GetRecentPostsRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  
  public async execute (req: GetRecentPostsRequestDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getRecentPosts(req.offset);
      return right(Result.ok<PostDetails[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
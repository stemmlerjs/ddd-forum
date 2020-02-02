
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetPopularPostsRequestDTO } from "./GetPopularPostsRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";
import { MemberId } from "../../../domain/memberId";
import { IMemberRepo } from "../../../repos/memberRepo";

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDetails[]>
>

export class GetPopularPosts implements UseCase<GetPopularPostsRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }
  
  public async execute (req: GetPopularPostsRequestDTO): Promise<Response> {
    try {
      const posts = await this.postRepo.getPopularPosts(req.offset);
      return right(Result.ok<PostDetails[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
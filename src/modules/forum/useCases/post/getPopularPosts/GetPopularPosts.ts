
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
  private memberRepo: IMemberRepo;

  constructor (postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }
  
  public async execute (req: GetPopularPostsRequestDTO): Promise<Response> {
    let memberId: MemberId;
    try {
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      const posts = await this.postRepo.getPopularPosts(memberId, req.offset);
      return right(Result.ok<PostDetails[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
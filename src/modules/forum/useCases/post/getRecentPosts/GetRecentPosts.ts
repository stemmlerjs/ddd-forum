
import { UseCase } from "../../../../../shared/core/UseCase";
import { GetRecentPostsRequestDTO } from "./GetRecentPostsRequestDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { PostDetails } from "../../../domain/postDetails";
import { IPostRepo } from "../../../repos/postRepo";
import { Member } from "../../../domain/member";
import { Post } from "../../../domain/post";
import { IMemberRepo } from "../../../repos/memberRepo";
import { MemberId } from "../../../domain/memberId";

type Response = Either<
  AppError.UnexpectedError,
  Result<PostDetails[]>
>

export class GetRecentPosts implements UseCase<GetRecentPostsRequestDTO, Promise<Response>> {
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor (postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }
  
  public async execute (req: GetRecentPostsRequestDTO): Promise<Response> {
    let memberId: MemberId;

    try {
      const isAuthenticated = !!req.userId === true;

      if (isAuthenticated) {
        memberId = await this.memberRepo.getMemberIdByUserId(req.userId);
      }

      const posts = await this.postRepo.getRecentPosts(memberId, req.offset);
      return right(Result.ok<PostDetails[]>(posts))
    } catch (err) {
      return left(new AppError.UnexpectedError(err))
    }
  }
}
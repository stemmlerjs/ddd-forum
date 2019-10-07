

import { UseCase } from "../../../../../shared/core/UseCase"; 
import { IPostRepo } from "../../../repos/postRepo";
import { PostDetails } from "../../../domain/postDetails";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetPostBySlugErrors } from "./GetPostBySlugErrors";
import { GetPostBySlugDTO } from "./GetPostBySlugDTO";

type Response = Either<
  GetPostBySlugErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<PostDetails>
>

export class GetPostBySlug implements UseCase<any, Promise<Response>> {
  private postRepo: IPostRepo;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute (req: GetPostBySlugDTO): Promise<Response> {
    let postDetails: PostDetails;
    const { slug } = req;

    try {
      
      try {
        postDetails = await this.postRepo.getPostDetailsBySlug(slug);
      } catch (err) {
        return left(new GetPostBySlugErrors.PostNotFoundError(slug));
      }

      return right(Result.ok<PostDetails>(postDetails));

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }

}
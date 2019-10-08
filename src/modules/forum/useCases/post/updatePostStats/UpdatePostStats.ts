
import { UseCase } from "../../../../../shared/core/UseCase";
import { UpdatePostStatsDTO } from "./UpdatePostStatsDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpdatePostStatsErrors } from "./UpdatePostStatsErrors";
import { IPostRepo } from "../../../repos/postRepo";
import { Post } from "../../../domain/post";

type Response = Either<
  UpdatePostStatsErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<void>
>

export class UpdatePostStats implements UseCase<UpdatePostStatsDTO, Promise<Response>> {
  private postRepo: IPostRepo;
  
  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
  }

  public async execute (response: UpdatePostStatsDTO): Promise<Response> {
    const { postId } = response;
    let post: Post;

    try {

      try {
        post = await this.postRepo.getPostByPostId(response.postId);
      } catch (err) {
        return left(new UpdatePostStatsErrors.PostNotFoundError(postId))
      }
      
      const commentCount: number = await this.postRepo.getNumberOfCommentsByPostId(
        response.postId
      );

      post.updateTotalNumberComments(commentCount);

      // TODO: Calculate total number of points
      
      /**
       * How do we calculate points?
       * 
       * number of comments +
       * number of post upvotes + 
       * number of comment upvotes
       * 
       */
      
      await this.postRepo.save(post);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
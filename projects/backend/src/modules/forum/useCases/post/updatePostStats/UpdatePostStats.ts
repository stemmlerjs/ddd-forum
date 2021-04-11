
import { UseCase } from "../../../../../shared/core/UseCase";
import { UpdatePostStatsDTO } from "./UpdatePostStatsDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpdatePostStatsErrors } from "./UpdatePostStatsErrors";
import { IPostRepo } from "../../../repos/postRepo";
import { Post } from "../../../domain/post";
import { IPostVotesRepo } from "../../../repos/postVotesRepo";
import { ICommentVotesRepo } from "../../../repos/commentVotesRepo";

type Response = Either<
  UpdatePostStatsErrors.PostNotFoundError |
  AppError.UnexpectedError,
  Result<void>
>

export class UpdatePostStats implements UseCase<UpdatePostStatsDTO, Promise<Response>> {
  private postRepo: IPostRepo;
  private postVotesRepo: IPostVotesRepo;
  private commentVotesRepo: ICommentVotesRepo;
  
  constructor (postRepo: IPostRepo, postVotesRepo: IPostVotesRepo, commentVotesRepo: ICommentVotesRepo) {
    this.postRepo = postRepo;
    this.postVotesRepo = postVotesRepo;
    this.commentVotesRepo = commentVotesRepo;
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
      
      // Update comment count
      post.updateTotalNumberComments(commentCount);

      // Update post points
      const [ numPostUpvotes, numPostDownvotes, commentUpvotes, commentDownvotes ] = await Promise.all([
        this.postVotesRepo.countPostUpvotesByPostId(post.postId),
        this.postVotesRepo.countPostDownvotesByPostId(post.postId),
        this.commentVotesRepo.countAllPostCommentUpvotesExcludingOP(post.postId),
        this.commentVotesRepo.countAllPostCommentDownvotesExcludingOP(post.postId)
      ]);
      
      post.updatePostScore(numPostUpvotes, numPostDownvotes, commentUpvotes, commentDownvotes);
      
      await this.postRepo.save(post);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
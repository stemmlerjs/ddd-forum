import { UseCase } from "../../../../../shared/core/UseCase";
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { ReplyToPostErrors } from "./ReplyToPostErrors";
import { ReplyToPostDTO } from "./ReplyToPostDTO";
import { Post } from "../../../domain/post";
import { IMemberRepo } from "../../../repos/memberRepo";
import { Member } from "../../../domain/member";
import { Comment } from "../../../domain/comment";
import { CommentText } from "../../../domain/commentText";
import { PostSlug } from "../../../domain/postSlug";

type Response = Either<
  ReplyToPostErrors.PostNotFoundError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class ReplyToPost implements UseCase<ReplyToPostDTO, Promise<Response>> {
  private memberRepo: IMemberRepo;
  private postRepo: IPostRepo;

  constructor (
    memberRepo: IMemberRepo, 
    postRepo: IPostRepo
  ) {
    this.memberRepo = memberRepo;
    this.postRepo = postRepo;
  }

  public async execute (req: ReplyToPostDTO): Promise<Response> {
    let post: Post;
    let member: Member;
    let slug: PostSlug;
    const { userId } = req;
    try {

      const slugOrError = PostSlug.createFromExisting(req.slug);
      if (slugOrError.isFailure) {
        return left(slugOrError);
      }

      slug = slugOrError.getValue();

      try {
        [ post, member ] = await Promise.all([
          this.postRepo.getPostBySlug(slug.value),
          this.memberRepo.getMemberByUserId(userId),
        ]);
      } catch (err) {
        return left(new ReplyToPostErrors.PostNotFoundError(slug.value));
      }

      const commentTextOrError = CommentText.create({ 
        value: req.comment 
      });

      if (commentTextOrError.isFailure) {
        return left(commentTextOrError);
      }

      const commentOrError = Comment.create({
        memberId: member.memberId,
        text: commentTextOrError.getValue(),
        postId: post.postId
      });

      if (commentOrError.isFailure) {
        return left(commentOrError);
      }

      const comment: Comment = commentOrError.getValue();

      post.addComment(comment);

      await this.postRepo.save(post);

      return right(Result.ok<void>());

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

import { UseCase } from "../../../../../shared/core/UseCase"; 
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreatePostDTO } from "./CreatePostDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { Member } from "../../../domain/member";
import { CreatePostErrors } from "./CreatePostErrors";
import { Post } from "../../../domain/post";
import { PostTitle } from "../../../domain/postTitle";
import { PostText } from "../../../domain/postText";
import { PostSlug } from "../../../domain/postSlug";

type Response = Either<
  CreatePostErrors.MemberDoesntExistError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class CreatePost implements UseCase<CreatePostDTO, Promise<Response>> {
  private postRepo: IPostRepo;
  private memberRepo: IMemberRepo;

  constructor (postRepo: IPostRepo, memberRepo: IMemberRepo) {
    this.postRepo = postRepo;
    this.memberRepo = memberRepo;
  }
  
  public async execute (request: CreatePostDTO): Promise<Response> {
    let member: Member;
    let title: PostTitle;
    let text: PostText;
    let slug: PostSlug;
    let post: Post;

    const { userId } = request;

    try {

      try {
        member = await this.memberRepo.getMemberByUserId(userId);
      } catch (err) {
        return left(new CreatePostErrors.MemberDoesntExistError());
      }

      const titleOrError = PostTitle.create({ value: request.title });
      const textOrError = PostText.create({ value: request.text });

      const titleAndTextResult = Result.combine([
        titleOrError, textOrError
      ]);

      if (titleAndTextResult.isFailure) {
        return left(titleAndTextResult);
      }

      title = titleOrError.getValue();
      text = textOrError.getValue();

      const slugOrError = PostSlug.create(title);

      if (slugOrError.isFailure) {
        return left(slugOrError);
      }

      slug = slugOrError.getValue();

      const postOrError = Post.create({
        text, title, slug, 
        memberId: member.memberId, 
        type: request.postType
      });

      if (postOrError.isFailure) {
        return left(postOrError);
      }

      post = postOrError.getValue();

      await this.postRepo.save(post);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
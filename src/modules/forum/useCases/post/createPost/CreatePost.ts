
import { UseCase } from "../../../../../shared/core/UseCase"; 
import { IPostRepo } from "../../../repos/postRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreatePostDTO } from "./CreatePostDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { Member } from "../../../domain/member";
import { CreatePostErrors } from "./CreatePostErrors";
import { Post, PostProps } from "../../../domain/post";
import { PostTitle } from "../../../domain/postTitle";
import { PostText } from "../../../domain/postText";
import { PostSlug } from "../../../domain/postSlug";
import { PostLink } from "../../../domain/postLink";

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
    let link: PostLink;
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

      if (titleOrError.isFailure) {
        return left(titleOrError);
      }

      if (request.postType === 'text') {
        const textOrError = PostText.create({ value: request.text });

        if (textOrError.isFailure) {
          return left(textOrError);
        }
        
        text = textOrError.getValue();
      } else {
        const linkOrError = PostLink.create({ url: request.link });

        if (linkOrError.isFailure) {
          return left(linkOrError);
        }
        
        link = linkOrError.getValue();
      }

      title = titleOrError.getValue();
      const slugOrError = PostSlug.create(title);

      if (slugOrError.isFailure) {
        return left(slugOrError);
      }

      slug = slugOrError.getValue();

      const postProps: PostProps = {
        title,
        slug,
        type: request.postType,
        memberId: member.memberId,
        text,
        link
      }

      const postOrError = Post.create(postProps);

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
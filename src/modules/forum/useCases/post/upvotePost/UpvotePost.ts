
import { UseCase } from "../../../../../shared/core/UseCase";
import { UpvotePostDTO } from "./UpvotePostDTO";
import { IMemberRepo } from "../../../repos/memberRepo";
import { IPostRepo } from "../../../repos/postRepo";
import { left, right, Result } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { UpvotePostErrors } from "./UpvotePostErrors";
import { Member } from "../../../domain/member";
import { Post } from "../../../domain/post";
import { IPostVotesRepo } from "../../../repos/postVotesRepo";
import { PostVote } from "../../../domain/postVote";
import { PostService } from "../../../domain/services/postService";
import { UpvotePostResponse } from "./UpvotePostResponse";

export class UpvotePost implements UseCase<UpvotePostDTO, Promise<UpvotePostResponse>> {
  private memberRepo: IMemberRepo;
  private postRepo: IPostRepo;
  private postVotesRepo: IPostVotesRepo;
  private postService: PostService;
  
  constructor (memberRepo: IMemberRepo, postRepo: IPostRepo, postVotesRepo: IPostVotesRepo, postService: PostService) {
    this.memberRepo = memberRepo;
    this.postRepo = postRepo;
    this.postVotesRepo = postVotesRepo
    this.postService = postService;
  }

  public async execute (req: UpvotePostDTO): Promise<UpvotePostResponse> {
    let member: Member;
    let post: Post;
    let existingVotesOnPostByMember: PostVote[];

    try {
      
      try {
        member = await this.memberRepo.getMemberByUserId(req.userId);
      } catch (err) {
        return left(new UpvotePostErrors.MemberNotFoundError())
      }

      try {
        post = await this.postRepo.getPostBySlug(req.slug);
      } catch (err) {
        return left(new UpvotePostErrors.PostNotFoundError(req.slug));
      }

      existingVotesOnPostByMember = await this.postVotesRepo
        .getVotesForPostByMemberId(post.postId,  member.memberId);

      const upvotePostResult = this.postService
        .upvotePost(post, member, existingVotesOnPostByMember);

      if (upvotePostResult.isLeft()) {
        return left(upvotePostResult.value);
      }
      
      await this.postRepo.save(post);

      return right(Result.ok<void>())

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
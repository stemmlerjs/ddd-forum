
import { UseCase } from "../../../../../shared/core/UseCase";
import { IPostRepo } from "../../../repos/postRepo";
import { EditPostDTO } from "./EditPostDTO";
import { EditPostResponse } from "./EditPostResponse";
import { Post } from "../../../domain/post";
import { WithChanges, Changes } from "../../../../../shared/core/WithChanges";
import { right, Result, left } from "../../../../../shared/core/Result";
import { EditPostErrors } from "./EditPostErrors";
import { PostText } from "../../../domain/postText";
import { PostLink } from "../../../domain/postLink";
import { has } from 'lodash'

export class EditPost implements UseCase<EditPostDTO, Promise<EditPostResponse>>, WithChanges {
  private postRepo: IPostRepo;
  public changes: Changes;

  constructor (postRepo: IPostRepo) {
    this.postRepo = postRepo;
    this.changes = new Changes();
  }

  private updateText (request: EditPostDTO, post: Post) : void {
    let postText: PostText;
    let postTextOrError: Result<PostText>;

    if (has(request, 'text')) {
      postTextOrError = PostText.create({ value: request.text });

      // postTextOrError.isSuccess ? (
      //   this.changes.addChange(
      //     post.updateText(
      //       postTextOrError.getValue()
      //     ).value
      //   )
      // ) : 
      

      postText = postTextOrError.getValue();
      
      
    }
  }

  public async execute (request: EditPostDTO): Promise<EditPostResponse> {
    let post: Post;
    
    let postLink: PostLink;
    let postLinkOrError: Result<PostLink>;
    
    try {
      post = await this.postRepo.getPostByPostId(request.postId);
    } catch (err) {
      return left(new EditPostErrors.PostNotFoundError(post.postId.id.toString()))
    }

    

    if (has(request, 'link')) {
      postLinkOrError = PostLink.create({ url: request.link });
    }

    
    
    return right(Result.ok<void>())
  }
}


import { Post, PostType } from "../../../../modules/forum/models/Post"
import { IPostService } from "../services/postService"
import {  right } from "../../../core/Either";
import { Result } from "../../../core/Result";
import { APIResponse } from "../../../infra/services/APIResponse";

export class MockPostService implements IPostService {

  private posts: Post[];

  constructor (posts: Post[]) {
    this.posts = posts;
  }

  async createPost (title: string, type: PostType, text?: string, link?: string): Promise<APIResponse<void>> {
    if (text) {
      this.posts.push({
        title,
        text,
        type,
        createdAt: new Date(),
        slug: '',
        postAuthor: '',
        numComments: 0,
        points: 1,
        link: '',
        wasUpvotedByMe: true,
        wasDownvotedByMe: false
      })
    } 

    if (link) {
      this.posts.push({
        title,
        text: '',
        type,
        createdAt: new Date(),
        slug: '',
        postAuthor: '',
        numComments: 0,
        points: 1,
        link,
        wasUpvotedByMe: true,
        wasDownvotedByMe: false
      })
    }
    return right(Result.ok<void>());
  }

  async getRecentPosts (offset?: number): Promise<APIResponse<Post[]>> {
    return right(Result.ok<Post[]>(this.posts)); // Sort
  }

  async getPopularPosts (offset?: number): Promise<APIResponse<Post[]>> {
    return right(Result.ok<Post[]>(this.posts)); // Sort
  }

  async getPostBySlug (slug: string): Promise<APIResponse<Post>> {
    return right(Result.ok<Post>(this.posts[0])); 
  }
  
  async upvotePost (slug: string): Promise<APIResponse<void>> {
    return right(Result.ok<void>())
  }

  async downvotePost (slug: string): Promise<APIResponse<void>> {
    return right(Result.ok<void>())
  }
}


import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostDetails } from "../domain/postDetails";
import { MemberId } from "../domain/memberId";

export interface IPostRepo {
  getPostDetailsBySlug (slug: string): Promise<PostDetails>;
  getPostBySlug (slug: string): Promise<Post>;
  getRecentPosts (memberId?: MemberId, offset?: number): Promise<PostDetails[]>;
  getPopularPosts (memberId?: MemberId, offset?: number): Promise<PostDetails[]>;
  getNumberOfCommentsByPostId (postId: PostId | string): Promise<number>;
  getPostByPostId (postId: PostId | string): Promise<Post>;
  exists (postId: PostId): Promise<boolean>;
  save (post: Post): Promise<void>;
  delete (postId: PostId): Promise<void>;
}
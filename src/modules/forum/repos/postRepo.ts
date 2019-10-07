import { Post } from "../domain/post";
import { PostId } from "../domain/postId";
import { PostDetails } from "../domain/postDetails";

export interface IPostRepo {
  getPostDetailsBySlug (slug: string): Promise<PostDetails>;
  getRecentPosts (offset?: number): Promise<PostDetails[]>;
  exists (postId: PostId): Promise<boolean>;
  save (post: Post): Promise<void>;
}
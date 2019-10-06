import { Post } from "../domain/post";
import { PostId } from "../domain/postId";

export interface IPostRepo {
  exists (postId: PostId): Promise<boolean>;
  save (post: Post): Promise<void>;
}
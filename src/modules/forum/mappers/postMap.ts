import { Mapper } from "../../../shared/infra/Mapper";
import { Post } from "../domain/post";

export class PostMap implements Mapper<Post> {

  public static toDomain (raw: any): Post {
    // TODO: 
    return null;
  }

  public static toPersistence (post: Post): any {
    return {
      post_id: post.postId.id.toString(),
      member_id: post.memberId.id.toString(),
      text: post.title.value,
      slug: post.slug.value,
      points: post.points
    }
  }
}
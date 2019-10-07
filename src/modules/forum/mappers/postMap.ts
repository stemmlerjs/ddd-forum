import { Mapper } from "../../../shared/infra/Mapper";
import { Post } from "../domain/post";

export class PostMap implements Mapper<Post> {

  public static toDomain (raw: any): Post {
    // TODO: 
    return null;
  }

  public static toPersistence (post: Post): any {
    return {
      updatedAt: new Date(),
      title: post.title.value,
      post_id: post.postId.id.toString(),
      member_id: post.memberId.id.toString(),
      text: post.isTextPost() ? post.text.value : null,
      slug: post.slug.value,
      points: post.points,
      type: post.type,
      link: post.isLinkPost() ? post.link.url : null,
    }
  }
}
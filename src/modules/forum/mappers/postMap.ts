
import { Mapper } from "../../../shared/infra/Mapper";
import { Post } from "../domain/post";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { MemberId } from "../domain/memberId";
import { PostSlug } from "../domain/postSlug";
import { PostTitle } from "../domain/postTitle";
import { PostType } from "../domain/postType";
import { PostText } from "../domain/postText";
import { PostLink } from "../domain/postLink";

export class PostMap implements Mapper<Post> {

  public static toDomain (raw: any): Post {
    const postType: PostType = raw.type;
    
    const postOrError = Post.create({
      memberId: MemberId.create(new UniqueEntityID(raw.member_id)).getValue(),
      slug: PostSlug.createFromExisting(raw.slug).getValue(),
      title: PostTitle.create({ value: raw.title }).getValue(),
      type: postType,
      text: postType === 'text' ? PostText.create({ value: raw.text }).getValue() : null,
      link: postType === 'link' ? PostLink.create({ url: raw.link }).getValue() : null,
      points: raw.points,
      totalNumComments: raw.total_num_comments
    }, new UniqueEntityID(raw.post_id))

    postOrError.isFailure ? console.log(postOrError.getErrorValue()) : '';

    return postOrError.isSuccess ? postOrError.getValue() : null;
  }

  public static toPersistence (post: Post): any {
    return {
      total_num_comments: post.totalNumComments,
      updatedAt: new Date().toString(),
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
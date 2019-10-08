
import { Mapper } from "../../../shared/infra/Mapper";
import { PostDetails } from "../domain/postDetails";
import { PostDTO } from "../dtos/postDTO";
import { PostSlug } from "../domain/postSlug";
import { PostTitle } from "../domain/postTitle";
import { MemberDetailsMap } from "./memberDetailsMap";
import { PostType } from "../domain/postType";
import { PostText } from "../domain/postText";
import { PostLink } from "../domain/postLink";

/**
 * member: MemberDetails;
  slug: PostSlug;
  title: PostTitle;
  type: PostType;
  text?: PostText;
  link?: PostLink;
  numComments: number;
  points: number;
  dateTimePosted: string | Date;
 */

export class PostDetailsMap implements Mapper<PostDetails> {

  public static toDomain (raw: any): PostDetails {
    const slug = PostSlug.createFromExisting(raw.slug).getValue();
    const title = PostTitle.create({ value: raw.title }).getValue();
    const postType: PostType = raw.type;

    const memberDetails = MemberDetailsMap.toDomain(raw.Member);

    const postDetailsOrError = PostDetails.create({
      slug,
      title,
      type: raw.type,
      points: raw.points,
      numComments: raw.total_num_comments,
      dateTimePosted: raw.createdAt,
      member: memberDetails,
      text: postType === 'text' ? PostText.create({ value: raw.text }).getValue() : null,
      link: postType === 'link' ? PostLink.create({ url: raw.link }).getValue() : null
    })

    postDetailsOrError.isFailure ? console.log(postDetailsOrError.error) : '';

    return postDetailsOrError.isSuccess ? postDetailsOrError.getValue() : null;
  }

  public static toDTO (postDetails: PostDetails): PostDTO {
    return {
      slug: postDetails.slug.value,
      title: postDetails.title.value,
      createdAt: postDetails.dateTimePosted,
      memberPostedBy: MemberDetailsMap.toDTO(postDetails.member),
      numComments: postDetails.numComments,
      points: postDetails.points,
      text: postDetails.text.value,
      type: postDetails.postType
    }
  } 
}

import { MemberDTO } from "./memberDTO";
import { PostType } from "../domain/postType";

export interface PostDTO {
  slug: string;
  title: string;
  createdAt: string | Date;
  memberPostedBy: MemberDTO;
  numComments: number;
  points: number;
  text: string;
  link: string;
  type: PostType;
  wasUpvotedByMe: boolean;
  wasDownvotedByMe: boolean;
}


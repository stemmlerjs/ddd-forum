
import { MemberDTO } from "./memberDTO";

export interface PostDTO {
  slug: string;
  title: string;
  createdAt: string | Date;
  memberPostedBy: MemberDTO;
  numComments: number;
  points: number;
  text: string;
}


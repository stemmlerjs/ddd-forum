
import { MemberDTO } from "./memberDTO";

export interface CommentDTO {
  postSlug: string;
  commentId: string;
  parentCommentId?: string;
  text: string;
  member: MemberDTO;
  createdAt: string | Date;
  childComments: CommentDTO[];
  postTitle: string;
  points: number;
}


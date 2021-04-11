
import { MemberDTO } from "./memberDTO";

export interface CommentDTO {
  postSlug: string;
  postTitle: string;
  commentId: string;
  parentCommentId?: string;
  text: string;
  member: MemberDTO;
  createdAt: string | Date;
  childComments: CommentDTO[];
  points: number;
  wasUpvotedByMe: boolean;
  wasDownvotedByMe: boolean;
}


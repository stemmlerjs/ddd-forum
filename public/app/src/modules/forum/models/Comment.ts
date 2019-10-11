import { Member } from "./Member";

export interface Comment {
  postSlug: string;
  commentId: string;
  parentCommentId?: string;
  text: string;
  member: Member;
  createdAt: string | Date;
  childComments: Comment[];
  postTitle: string;
  points: number;
}




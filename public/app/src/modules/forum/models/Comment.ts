
export interface Comment {
  postSlug: string;
  commentId: string;
  parentCommentId?: string;
  text: string;
  postAuthor: string;
  createdAt: string | Date;
  childComments: Comment[];
}




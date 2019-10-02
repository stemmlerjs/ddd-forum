
export interface Comment {
  commentId: string;
  parentCommentId?: string;
  text: string;
  postAuthor: string;
  createdAt: string | Date;
  childComments: Comment[];
}




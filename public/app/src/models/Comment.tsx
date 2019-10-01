
export interface Comment {
  id: string;
  name: string;
  createdAt?: string | Date;
  comment: string;
  url: string;
  approved?: boolean;
  parentCommentId?: string;
}
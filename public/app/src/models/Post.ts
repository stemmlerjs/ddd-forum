
export interface Post {
  slug: string;
  title: string;
  createdAt: string | Date;
  postAuthor: string;
  numComments: number;
  points: number;
}
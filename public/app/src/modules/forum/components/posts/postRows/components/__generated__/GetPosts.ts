/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { PostType } from "./../../../../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetPosts
// ====================================================

export interface GetPosts_posts_memberPostedBy_user {
  __typename: "User";
  username: string | null;
}

export interface GetPosts_posts_memberPostedBy {
  __typename: "Member";
  reputation: number | null;
  user: GetPosts_posts_memberPostedBy_user | null;
}

export interface GetPosts_posts {
  __typename: "Post";
  slug: string | null;
  title: string | null;
  text: string | null;
  createdAt: any | null;
  numComments: number | null;
  memberPostedBy: GetPosts_posts_memberPostedBy | null;
  points: number | null;
  type: PostType | null;
  link: string | null;
}

export interface GetPosts {
  posts: (GetPosts_posts | null)[];
}

export interface GetPostsVariables {
  filterType?: string | null;
}

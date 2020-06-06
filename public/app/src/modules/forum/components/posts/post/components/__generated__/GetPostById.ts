/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPostById
// ====================================================

export interface GetPostById_postBySlug_memberPostedBy_user {
  __typename: "User";
  username: string | null;
}

export interface GetPostById_postBySlug_memberPostedBy {
  __typename: "Member";
  user: GetPostById_postBySlug_memberPostedBy_user | null;
}

export interface GetPostById_postBySlug {
  __typename: "Post";
  title: string | null;
  points: number | null;
  memberPostedBy: GetPostById_postBySlug_memberPostedBy | null;
}

export interface GetPostById {
  postBySlug: GetPostById_postBySlug | null;
}

export interface GetPostByIdVariables {
  slug?: string | null;
}

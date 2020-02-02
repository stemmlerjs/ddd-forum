
import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum PostType {
    text
    link
  }

  type Post {
    slug: String
    title: String
    createdAt: DateTime
    memberPostedBy: Member
    numComments: Int
    points: Int
    text: String
    link: String
    type: PostType
  }

  type Member {
    memberId: String
    reputation: Int
    user: User
  }

  type PostCollectionResult {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  extend type Query {
    postById (id: ID!): Post
    postBySlug (slug: String!): Post
    popularPosts (pageSize: Int, after: String): PostCollectionResult
    recentPosts (pageSize: Int, after: String): PostCollectionResult
    memberById (id: String!): Member
  }

  extend type Mutation {
    createPost (input: CreatePostInput!): CreatePostPayload
    createMember (input: CreateMemberInput!): CreateMemberPayload
  }
`




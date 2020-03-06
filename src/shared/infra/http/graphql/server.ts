
import { getRecentPosts } from '../../../../modules/forum/useCases/post/getRecentPosts'
import { PostDetailsMap } from '../../../../modules/forum/mappers/postDetailsMap'
import { GraphQLDateTime } from 'graphql-iso-date';
import { memberRepo } from '../../../../modules/forum/repos'
import { MemberDetailsMap } from '../../../../modules/forum/mappers/memberDetailsMap'
import { ApolloServer, gql } from 'apollo-server-express';

import { typeDefs as ForumTypeDefs }  from './forum'
import { typeDefs as UserTypeDefs } from './users'

const typeDefs = gql`
  scalar DateTime

  type Query {
    _blank: String
  }
`

const server = new ApolloServer({
  typeDefs: [
    typeDefs, 
    ForumTypeDefs, 
    UserTypeDefs
  ],
  resolvers: {
    DateTime: GraphQLDateTime,
    Post: {
      memberPostedBy: async (post, args, context) => {
        const memberDetails = await memberRepo.getMemberDetailsByPostLinkOrSlug(post.slug);
        return MemberDetailsMap.toDTO(memberDetails);
      }
    },
    Query: {
      posts: async (parent, args, context) => {
        const response = await getRecentPosts.execute({ });
        if (response.isRight()) {
          const postDetails = response.value.getValue();
          return postDetails.map(PostDetailsMap.toDTO);
        } else {
          throw response.value;
        }
      }
    }
  }
});

export function startGraphQLServer (app) {
  server.applyMiddleware({ app });
}


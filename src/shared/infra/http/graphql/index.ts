
import { ApolloServer, gql } from 'apollo-server-express';
import { getRecentPosts } from '../../../../modules/forum/useCases/post/getRecentPosts'
import { PostDetailsMap } from '../../../../modules/forum/mappers/postDetailsMap'
import { GraphQLDateTime } from 'graphql-iso-date';
import { memberRepo } from '../../../../modules/forum/repos'
import { MemberDetailsMap } from '../../../../modules/forum/mappers/memberDetailsMap'
import { getPopularPosts } from '../../../../modules/forum/useCases/post/getPopularPosts';

const typeDefs = gql`
  scalar DateTime
  
  enum PostFilterType {
    POPULAR,
    NEW
  }

  type Query {
    posts(filterType: String): [Post]!
    postBySlug (slug: String): Post
  }

  type User {
    username: String
  }

  type Member {
    memberId: String
    reputation: Int
    user: User
  }

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
`;

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers: {
    DateTime: GraphQLDateTime,
    Post: {
      memberPostedBy: async (post, args, context) => {
        const memberDetails = await memberRepo.getMemberByPostSlug(post.slug);
        return MemberDetailsMap.toDTO(memberDetails);
      }
    },
    Query: {
      posts: async (parent, args, context) => {
        let response;
        const suppliedFilterType = args.hasOwnProperty('filterType');

        if (!suppliedFilterType) {
          throw new Error("Need to supply filter type");
        }

        switch (args.filterType) {
          case "POPULAR": 
            response = await getPopularPosts.execute({ })
            break;
          case "NEW": 
            response = await getRecentPosts.execute({ });
            break;
          default: 
            throw new Error("Valid filtertypes are NEW and POPULAR.")
        }

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

export {
  graphQLServer
}
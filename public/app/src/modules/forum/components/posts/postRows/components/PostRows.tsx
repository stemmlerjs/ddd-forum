
import React, { Fragment, useEffect } from 'react';
import { PostRow } from '../../postRow';
import { Post } from '../../../../models/Post';
import { gql, useQuery, QueryHookOptions } from '@apollo/client'
import { PostFilterType } from '../../filters/components/PostFilters';

interface PostRowsProps {
  activeFilter: PostFilterType;
  upvotePost: (postSlug: string) => void;
  downvotePost: (postSlug: string) => void;
  isLoggedIn: boolean;
}

const LIST_POSTS = gql`
  query GetPosts ($filterType: String) {
    posts(filterType: $filterType) {
      slug
      title
      text
      createdAt
      numComments
      memberPostedBy {
        reputation
        user {
          username
        }
      }
      points
      type
      link
    }
  }
` 

const PostRows: React.FC<PostRowsProps> = (props) => {
  const queryOptions: QueryHookOptions = {
    variables: {
      filterType: props.activeFilter
    }
  };
  const { data, loading, error, refetch } = useQuery(
    LIST_POSTS, queryOptions
  );

  /**
   * This refetch thing is pretty cool. Every time the 
   * value of the active filter changes, React will re-call
   * refetch. This is a lot cleaner than the way I used to 
   * have to poke and prod with componentDidUpdate.
   */

  useEffect(() => {
    refetch(queryOptions)
  }, [props.activeFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error.message}</p>

  return (
    <Fragment>
      {data.posts.map((p: Post, i: number) => (
        <PostRow
          key={i}
          onUpvoteClicked={() => props.upvotePost(p.slug)}
          onDownvoteClicked={() => props.downvotePost(p.slug)}
          isLoggedIn={props.isLoggedIn}
          {...p}
        />
      ))}
    </Fragment>
  )
}

export default PostRows;
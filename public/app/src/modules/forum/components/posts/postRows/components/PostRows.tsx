
import React, { Fragment } from 'react';
import { PostRow } from '../../postRow';
import { Post } from '../../../../models/Post';
import { Points } from '../../points';
import PostMeta from '../../post/components/PostMeta';
import { gql, useQuery } from '@apollo/client'

interface PostRowsProps {
  upvotePost: (postSlug: string) => void;
  downvotePost: (postSlug: string) => void;
  isLoggedIn: boolean;
}

const LIST_POSTS = gql`
  {
    posts {
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
  const { data, loading, error } = useQuery(LIST_POSTS);

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

import React from 'react'
import "../styles/PostSummary.sass"
import PostMeta from './PostMeta'
import { Post } from '../../../../models/Post'
import { TextUtil } from '../../../../../../shared/utils/TextUtil'
import { gql, useQuery } from '@apollo/client'

const GET_POST_BY_ID = gql`
  query GetPostById ($slug: String) {
    postBySlug(slug: $slug) {
      title
      points
      memberPostedBy {
        user {
          username
        }
      }
    }
  }
`


interface PostProps extends Post {
  
}

const PostSummary: React.FC<PostProps> = (props) => {
  const { data, error } = useQuery(GET_POST_BY_ID);

  if (error) return <div>{error.message}</div>;
  
  return (
    <div className="post">
      <PostMeta {...props} includeLink={false} />
      {!!props.text ? (
        <div dangerouslySetInnerHTML={{ __html: props.text }}/>
      ) : (
        <a className="link" target="_blank" href={props.link}>Click to visit the link at {TextUtil.getDomainNameFromUrl(props.link)}</a>
      )}
      
    </div>
  )
}

export default PostSummary;


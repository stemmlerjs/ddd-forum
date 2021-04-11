
import React, { useState } from 'react'
import { Post } from '../../../../modules/forum/models/Post';
import { IPostService } from '../../../../modules/forum/services/postService';

export function usePosts (postService: IPostService) {

  const [_recentPosts, _setRecentPosts] = useState<Post[]>([]);
  const [_popularPosts, _setPopularPosts] = useState<Post[]>([])
  
  const getRecentPosts = () => {};
  const getPopularPosts = () => {};
  const upvotePost = (str: string) => {};
  const downvotePost = (str: string) => {}

  return {
    operations: { getRecentPosts, getPopularPosts, upvotePost, downvotePost },
    state: { 
      recentPosts: _recentPosts,
      popularPosts: _popularPosts
    }
  }
}
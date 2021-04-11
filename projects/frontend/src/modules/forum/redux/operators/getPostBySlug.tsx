

import * as actionCreators from '../actionCreators'
import { postService } from '../../services';
import { Post } from '../../models/Post';

function getPostBySlug (slug: string) {
  return async (dispatch: any) => {

    dispatch(actionCreators.gettingPostBySlug());

    const result = await postService.getPostBySlug(slug);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.gettingPostBySlugFailure(error))
    } else {
      const post: Post = result.value.getValue();
      dispatch(actionCreators.gettingPostBySlugSuccess(post));
    }
  };
}

export { getPostBySlug };

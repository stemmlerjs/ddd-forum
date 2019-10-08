
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';

function createReplyToComment (comment: string, parentCommentId: string, slug: string) {
  return async (dispatch: any) => {

    dispatch(actionCreators.creatingReplyToComment());

    const result = await commentService.createReplyToComment(comment, parentCommentId, slug);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingReplyToCommentFailure(error))
    } else {
      dispatch(actionCreators.creatingReplyToCommentSuccess());
    }
  };
}

export { createReplyToComment };

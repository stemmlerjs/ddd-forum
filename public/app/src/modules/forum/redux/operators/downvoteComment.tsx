
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';

function downvoteComment (commentId: string) {
  return async (dispatch: any) => {

    dispatch(actionCreators.downvotingComment());

    const result = await commentService.downvoteComment(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.downvotingCommentFailure(error))
    } else {
      dispatch(actionCreators.downvotingCommentSuccess(commentId));
    }
  };
}

export { downvoteComment };

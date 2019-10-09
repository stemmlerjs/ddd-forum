
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';

function upvoteComment (commentId: string) {
  return async (dispatch: any) => {

    dispatch(actionCreators.upvotingComment());

    const result = await commentService.upvoteComment(commentId);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.upvotingCommentFailure(error))
    } else {
      dispatch(actionCreators.upvotingCommentSuccess(commentId));
    }
  };
}

export { upvoteComment };

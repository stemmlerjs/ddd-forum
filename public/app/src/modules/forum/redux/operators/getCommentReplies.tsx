
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';
import { CommentUtil } from '../../utils/CommentUtil';

function getCommentReplies (slug: string, commentId: string, offset?: number) {
  return async (dispatch: any, getState: Function) => {

    dispatch(actionCreators.gettingComments());

    const result = await commentService.getCommentsBySlug(slug, offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.gettingCommentsFailure(error))
    } else {
      const comments = result.value.getValue();

      const commentThread = CommentUtil.getThread(commentId, comments);

      dispatch(actionCreators.gettingCommentsSuccess(commentThread));
    }
  };
}

export { getCommentReplies };

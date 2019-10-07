
import * as actionCreators from '../actionCreators'
import { commentService } from '../../services';
import { CommentUtil } from '../../../../shared/utils/CommentUtil';

function getComments (slug: string, offset?: number) {
  return async (dispatch: any, getState: Function) => {

    dispatch(actionCreators.gettingComments());

    const result = await commentService.getCommentsBySlug(slug, offset);

    if (result.isLeft()) {
      const error: string = result.value;
      dispatch(actionCreators.creatingReplyToPostFailure(error))
    } else {
      const comments = result.value.errorValue();

      const sortedComments = CommentUtil.getSortedComments(comments);

      dispatch(actionCreators.gettingCommentsSuccess(sortedComments));
    }
  };
}

export { getComments };

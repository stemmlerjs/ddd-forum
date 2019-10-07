

import express from 'express'
import { getCommentsByPostSlugContainer } from '../../../useCases/comments/getCommentByPostSlug';
import { middleware } from '../../../../../shared/infra/http';
import { replyToPostController } from '../../../useCases/comments/replyToPost';

const commentRouter = express.Router();

commentRouter.get('/',
  (req, res) => getCommentsByPostSlugContainer.execute(req, res)
)

commentRouter.post('/',
  middleware.authenticateRequests(),
  (req, res) => replyToPostController.execute(req, res)
)

commentRouter.post('/:commentId/reply') // post reply
commentRouter.get('/:commentId')        // get comment by id



export {
  commentRouter
}
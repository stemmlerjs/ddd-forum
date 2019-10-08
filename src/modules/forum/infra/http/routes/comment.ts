

import express from 'express'
import { getCommentsByPostSlugContainer } from '../../../useCases/comments/getCommentsByPostSlug';
import { middleware } from '../../../../../shared/infra/http';
import { replyToPostController } from '../../../useCases/comments/replyToPost';
import { getCommentByCommentIdController } from '../../../useCases/comments/getCommentByCommentId';

const commentRouter = express.Router();

commentRouter.get('/',
  (req, res) => getCommentsByPostSlugContainer.execute(req, res)
)

commentRouter.post('/',
  middleware.authenticateRequests(),
  (req, res) => replyToPostController.execute(req, res)
)

commentRouter.post('/:commentId/reply') // post reply

commentRouter.get('/:commentId',
  (req, res) => getCommentByCommentIdController.execute(req, res)
)



export {
  commentRouter
}
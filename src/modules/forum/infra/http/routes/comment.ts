

import express from 'express'
import { getCommentsByPostSlugContainer } from '../../../useCases/comments/getCommentsByPostSlug';
import { middleware } from '../../../../../shared/infra/http';
import { replyToPostController } from '../../../useCases/comments/replyToPost';
import { getCommentByCommentIdController } from '../../../useCases/comments/getCommentByCommentId';
import { replyToCommentController } from '../../../useCases/comments/replyToComment';

const commentRouter = express.Router();

commentRouter.get('/',
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getCommentsByPostSlugContainer.execute(req, res)
)

commentRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => replyToPostController.execute(req, res)
)

commentRouter.post('/:commentId/reply',
  middleware.ensureAuthenticated(),
  (req, res) => replyToCommentController.execute(req, res)
)

commentRouter.get('/:commentId',
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getCommentByCommentIdController.execute(req, res)
)

export {
  commentRouter
}


import express from 'express'
import { getCommentsByPostSlugContainer } from '../../../useCases/comments/getCommentByPostSlug';

const commentRouter = express.Router();

commentRouter.get('/',
  (req, res) => getCommentsByPostSlugContainer.execute(req, res)
)

commentRouter.post('/')                 // post comment
commentRouter.post('/:commentId/reply') // post reply
commentRouter.get('/:commentId')        // get comment by id



export {
  commentRouter
}
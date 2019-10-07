
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createPostController } from '../../../useCases/post/createPost';
import { getRecentPostsController } from '../../../useCases/post/getRecentPosts';

const postRouter = express.Router();

postRouter.post('/',
  middleware.authenticateRequests(),
  (req, res) => createPostController.execute(req, res)
)

postRouter.get('/recent',
  (req, res) => getRecentPostsController.execute(req, res)
)

export {
  postRouter
}


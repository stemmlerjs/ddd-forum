
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createPostController } from '../../../useCases/post/createPost';
import { getRecentPostsController } from '../../../useCases/post/getRecentPosts';
import { getPostBySlugController } from '../../../useCases/post/getPostBySlug';
import { getPopularPostsController } from '../../../useCases/post/getPopularPosts';
import { upvotePostController } from '../../../useCases/post/upvotePost';

const postRouter = express.Router();

postRouter.post('/',
  middleware.authenticateRequests(),
  (req, res) => createPostController.execute(req, res)
)

postRouter.get('/recent',
  (req, res) => getRecentPostsController.execute(req, res)
)

postRouter.get('/popular',
  (req, res) => getPopularPostsController.execute(req, res)
)

postRouter.get('/',
  (req, res) => getPostBySlugController.execute(req, res)
)

postRouter.post('/upvote',
  middleware.authenticateRequests(),
  (req, res) => upvotePostController.execute(req, res)
)

export {
  postRouter
}


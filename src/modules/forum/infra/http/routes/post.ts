
import express from 'express';
import { middleware } from '../../../../../shared/infra/http';
import { createPostController } from '../../../useCases/post/createPost';

const postRouter = express.Router();

postRouter.post('/',
  middleware.authenticateRequests(),
  (req, res) => createPostController.execute(req, res)
)

export {
  postRouter
}


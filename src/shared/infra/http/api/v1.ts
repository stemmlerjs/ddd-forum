
import express from 'express'
import { userRouter } from '../../../../modules/users/infra/http/routes';
import { memberRouter, commentRouter } from '../../../../modules/forum/infra/http/routes';
import { postRouter } from '../../../../modules/forum/infra/http/routes/post';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
})

v1Router.use('/users', userRouter);
v1Router.use('/members', memberRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/comments', commentRouter);

export { v1Router }
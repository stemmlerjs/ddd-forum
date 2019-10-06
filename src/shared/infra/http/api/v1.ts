
import express from 'express'
import { userRouter } from '../../../../modules/users/infra/http/routes';
import { memberRouter } from '../../../../modules/forum/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
})

v1Router.use('/users', userRouter);
v1Router.use('/members', memberRouter);

export { v1Router }
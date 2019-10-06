
import express from 'express'
import { getMemberByUserNameController } from '../../../useCases/members/getMemberByUserName';

const memberRouter = express.Router();

memberRouter.get('/:username',
  (req, res) => getMemberByUserNameController.execute(req, res)
)

export {
  memberRouter
}
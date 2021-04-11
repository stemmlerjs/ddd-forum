
import express from 'express'
import { getMemberByUserNameController } from '../../../useCases/members/getMemberByUserName';
import { getCurrentMemberController } from '../../../useCases/members/getCurrentMember';

const memberRouter = express.Router();

memberRouter.get('/me',
  (req, res) => getCurrentMemberController.execute(req, res)
)

memberRouter.get('/:username',
  (req, res) => getMemberByUserNameController.execute(req, res)
)

export {
  memberRouter
}
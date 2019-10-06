
import { GetMemberByUserName } from "./GetMemberByUserName";
import { memberRepo } from "../../../repos";
import { GetMemberByUserNameController } from "./GetMemberByUserNameController";

const getMemberByUserName = new GetMemberByUserName(
  memberRepo
)

const getMemberByUserNameController = new GetMemberByUserNameController(
  getMemberByUserName
)

export { 
  getMemberByUserName,
  getMemberByUserNameController
}

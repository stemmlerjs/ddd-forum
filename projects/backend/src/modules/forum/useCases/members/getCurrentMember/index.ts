
import { GetCurrentMemberController } from "./GetCurrentMemberController";
import { getMemberByUserName } from "../getMemberByUserName";

const getCurrentMemberController = new GetCurrentMemberController(
  getMemberByUserName
)

export { getCurrentMemberController }

import { GetUserByUserName } from "./GetUserByUserName";
import { GetUserByUserNameController } from "./GetUserByUserNameController";
import { userRepo } from "../../repos";

const getUserByUserName = new GetUserByUserName(
  userRepo
)

const getUserByUserNameController = new GetUserByUserNameController(
  getUserByUserName
)

export { 
  getUserByUserName,
  getUserByUserNameController
}
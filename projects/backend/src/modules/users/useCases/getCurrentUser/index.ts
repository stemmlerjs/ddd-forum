import { GetCurrentUserController } from "./GetCurrentUserController";
import { getUserByUserName } from "../getUserByUserName";

const getCurrentUserController = new GetCurrentUserController(
  getUserByUserName
)

export { getCurrentUserController };

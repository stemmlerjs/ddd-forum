
import { CreateMember } from "./CreateMember";
import { userRepo } from "../../../../users/repos";
import { memberRepo } from "../../../repos";

const createMember = new CreateMember(
  userRepo, memberRepo
)

export { createMember };
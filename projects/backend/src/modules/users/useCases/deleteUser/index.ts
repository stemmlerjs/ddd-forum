
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { DeleteUserController } from "./DeleteUserController";
import { userRepo } from "../../repos";

const deleteUserUseCase = new DeleteUserUseCase(userRepo);
const deleteUserController = new DeleteUserController(
  deleteUserUseCase
);

export { deleteUserUseCase, deleteUserController };
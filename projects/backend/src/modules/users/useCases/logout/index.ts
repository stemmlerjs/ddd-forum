
import { LogoutUseCase } from "./LogoutUseCase";
import { userRepo } from "../../repos";
import { authService } from "../../services";
import { LogoutController } from "./LogoutController";

const logoutUseCase = new LogoutUseCase(userRepo, authService);
const logoutController = new LogoutController(
  logoutUseCase
)

export { logoutUseCase, logoutController };
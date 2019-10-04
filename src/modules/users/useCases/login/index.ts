
import { LoginUserUseCase } from "./LoginUseCase";
import { LoginController } from "./LoginController";
import { authService } from "../../services";
import { userRepo } from "../../repos";

const loginUseCase = new LoginUserUseCase(userRepo, authService);
const loginController = new LoginController(loginUseCase);

export { loginController, loginUseCase }
import { Middleware } from "./utils/Middleware";
import { authService } from "../../../modules/users/services";

const middleware = new Middleware(authService);

export { middleware }

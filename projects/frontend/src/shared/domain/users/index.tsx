
import { UsersService } from "./services/userService";
import { AuthService } from "./services/authService";

const authService = new AuthService();
const usersService = new UsersService(
  authService
);

export {
  authService,
  usersService
}
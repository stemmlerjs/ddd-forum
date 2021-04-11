
import { UsersService } from "./userService";
import { AuthService } from "./authService";

const authService = new AuthService();
const usersService = new UsersService(
  authService
);

export {
  authService,
  usersService
}
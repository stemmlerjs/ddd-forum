
import { getUserProfile } from "./getUserProfile";
import { login } from "./login";
import { logout } from "./logout";

export interface IUserOperators {
  getUserProfile (): void;
  login (username: string, password: string): void;
  logout (): void;
}

export {
  getUserProfile,
  login,
  logout
}
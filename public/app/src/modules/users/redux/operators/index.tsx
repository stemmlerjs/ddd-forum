
import { getUserProfile } from "./getUserProfile";
import { login } from "./login";
import { logout } from "./logout";
import { createUser } from "./createUser";

export interface IUserOperators {
  getUserProfile (): void;
  login (username: string, password: string): void;
  logout (): void;
  createUser (email: string, username: string, password: string): void;
}

export {
  getUserProfile,
  login,
  logout,
  createUser
}
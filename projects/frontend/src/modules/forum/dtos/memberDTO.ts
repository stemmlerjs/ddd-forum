import { UserDTO } from "../../../shared/domain/users/dtos/userDTO";

export interface MemberDTO {
  reputation: number;
  user: UserDTO;
}
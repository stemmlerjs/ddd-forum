
import { UseCase } from "shared/core/UseCase";
import { IUserRepo } from "modules/users/infra/userRepo";
import { CreateUserDTO } from "./CreateUserDTO";

export class CreateUserUseCase implements UseCase<CreateUserDTO, any> {
  private userRepo: IUserRepo;
  
  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  execute (): Promise<any> {
    return null;
  }
}
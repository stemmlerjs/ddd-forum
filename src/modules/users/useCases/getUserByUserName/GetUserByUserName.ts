
import { UseCase } from "shared/core/UseCase";
import { GetUserByUserNameDTO } from "./GetUserByUserNameDTO";
import { Either, Result, left } from "shared/core/Result";
import { User } from "modules/users/domain/user";
import { AppError } from "shared/core/AppError";
import { IUserRepo } from "modules/users/infra/userRepo";
import { UserName } from "modules/users/domain/userName";

type Response = Either<
  AppError.UnexpectedError |
  Result<any>,
  Result<User>
>

export class GetUserByUserName implements UseCase<GetUserByUserNameDTO, Promise<Response>> {
  private userRepo: IUserRepo;
  
  constructor (userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute (request: GetUserByUserNameDTO): Promise<Response> {
    const userNameOrError = UserName.create({ name: request.username });

    if (userNameOrError.isFailure) {
      return left(
        Result.fail<any>(userNameOrError.error.toString())
      ) as Response;
    }

    const userName: UserName = userNameOrError.getValue();

    const user = await this.userRepo.getUserByUserName(userName);

    
  }
}

import { UseCase } from "../../../../../shared/core/UseCase";
import { IMemberRepo } from "../../../repos/memberRepo";
import { CreateMemberDTO } from "./CreateMemberDTO";
import { IUserRepo } from "../../../../users/repos/userRepo";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { CreateMemberErrors } from "./CreateMemberErrors";
import { User } from "../../../../users/domain/user";
import { Member } from "../../../domain/member";

type Response = Either<
  CreateMemberErrors.MemberAlreadyExistsError |
  CreateMemberErrors.UserDoesntExistError |
  AppError.UnexpectedError |
  Result<any>,
  Result<void>
>

export class CreateMember implements UseCase<CreateMemberDTO, Promise<Response>> {
  private memberRepo: IMemberRepo;
  private userRepo: IUserRepo;

  constructor (userRepo: IUserRepo, memberRepo: IMemberRepo) {
    this.userRepo = userRepo;
    this.memberRepo = memberRepo
  }

  public async execute (request: CreateMemberDTO): Promise<Response> {
    let user: User;
    let member: Member;
    const { userId } = request;

    try {

      try {
        user = await this.userRepo.getUserByUserId(userId);
      } catch (err) {
        return left(new CreateMemberErrors.UserDoesntExistError(userId));
      }

      try {
        member = await this.memberRepo.getMemberByUserId(userId);
        const memberExists = !!member === true;

        if (memberExists) {
          return left(new CreateMemberErrors.MemberAlreadyExistsError(userId))
        }
      } catch (err) {}

      // Member doesn't exist already (good), so we want to create it
      const memberOrError: Result<Member> = Member.create({ 
        userId: user.userId,
        username: user.username,
      });

      if (memberOrError.isFailure) {
        return left(memberOrError);
      }

      member = memberOrError.getValue();

      await this.memberRepo.save(member);

      return right(Result.ok<void>());
      
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }

    return null;
  }
}
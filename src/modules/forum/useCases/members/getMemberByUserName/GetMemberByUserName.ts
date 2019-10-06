
import { UseCase } from "../../../../../shared/core/UseCase";
import { IMemberRepo } from "../../../repos/memberRepo";
import { GetMemberByUserNameDTO } from "./GetMemberByUserNameDTO";
import { Either, Result, left, right } from "../../../../../shared/core/Result";
import { AppError } from "../../../../../shared/core/AppError";
import { GetMemberByUserNameErrors } from "./GetMemberByUserNameErrors";
import { MemberDetails } from "../../../domain/memberDetails";

type Response = Either<
  GetMemberByUserNameErrors.MemberNotFoundError |
  AppError.UnexpectedError,
  Result<MemberDetails>
>

export class GetMemberByUserName implements UseCase<GetMemberByUserNameDTO, Promise<Response>> {
  private memberRepo: IMemberRepo;

  constructor (memberRepo: IMemberRepo) {
    this.memberRepo = memberRepo;
  }

  public async execute (request: GetMemberByUserNameDTO): Promise<Response> {
    let memberDetails: MemberDetails;
    const { username } = request;

    try {

      try {
        memberDetails = await this.memberRepo.getMemberDetailsByUserName(username);
      } catch (err) {
        return left(new GetMemberByUserNameErrors.MemberNotFoundError(username));
      }

      return right(Result.ok<MemberDetails>(memberDetails))

    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
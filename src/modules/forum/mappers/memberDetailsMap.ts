
import { Mapper } from "../../../shared/infra/Mapper";
import { MemberDetails } from "../domain/memberDetails";
import { UserName } from "../../users/domain/userName";
import { MemberDTO } from "../dtos/memberDTO";

export class MemberDetailsMap implements Mapper<MemberDetails> {

  public static toDomain (raw: any): MemberDetails {
    const userNameOrError = UserName.create({ name: raw.BaseUser.username });

    const memberDetailsOrError = MemberDetails.create({
      reputation: raw.reputation,
      username: userNameOrError.getValue(),
    });

    memberDetailsOrError.isFailure ? console.log(memberDetailsOrError.getErrorValue()) : '';

    return memberDetailsOrError.isSuccess ? memberDetailsOrError.getValue() : null;
  }

  public static toDTO (memberDetails: MemberDetails): MemberDTO {
    return {
      reputation: memberDetails.reputation,
      user: {
        username: memberDetails.username.value
      }
    }
  } 
}
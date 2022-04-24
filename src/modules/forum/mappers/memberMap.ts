import { Mapper } from "../../../shared/infra/Mapper";
import { Member } from "../domain/member";
import { MemberDTO } from "../dtos/memberDTO";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { UserName } from "../../users/domain/userName";
import { UserId } from "../../users/domain/userId";

export class MemberMap implements Mapper<Member> {
  
  public static toDomain (raw: any): Member {
    const userNameOrError = UserName.create({ name: raw.BaseUser.username });
    const userIdOrError = UserId.create(new UniqueEntityID(raw.BaseUser.base_user_id));

    const memberOrError = Member.create({
      username: userNameOrError.getValue(),
      reputation: raw.reputation,
      userId: userIdOrError.getValue()
    }, new UniqueEntityID(raw.member_id));

    memberOrError.isFailure ? console.log(memberOrError.getErrorValue()) : '';

    return memberOrError.isSuccess ? memberOrError.getValue() : null;
  }

  public static toPersistence (member: Member): any {
    return {
      member_id: member.memberId.id.toString(),
      member_base_id: member.userId.id.toString(),
      reputation: member.reputation
    }
  } 
}
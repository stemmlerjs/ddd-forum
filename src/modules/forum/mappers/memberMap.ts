import { Mapper } from "../../../shared/infra/Mapper";
import { Member } from "../domain/member";
import { MemberDTO } from "../dtos/memberDTO";

export class MemberMap implements Mapper<Member> {
  public static toDomain (raw: any): Member {
    // TODO:
    return null;
  }

  public static toDTO (member: Member): MemberDTO {
    // TODO:
    return null;
  }

  public static toPersistence (member: Member): any {
    // TODO:
    return {

    }
  } 
}
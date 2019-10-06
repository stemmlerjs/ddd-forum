
import { IMemberRepo } from "../memberRepo";
import { Member } from "../../domain/member";
import { MemberMap } from "../../mappers/memberMap";

export class MemberRepo implements IMemberRepo {
  private models: any;

  constructor (models: any) {
    this.models = models;
  }

  private createBaseQuery (): any {
    const models = this.models;
    return {
      where: {},
      include: [
        { model: models.BaseUser, as: 'BaseUser' }
      ]
    }
  }

  public async getMemberByUserId (userId: string): Promise<Member> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.include[0].where = { user_id: userId };
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (found) throw new Error("Member not found");
    return MemberMap.toDomain(member);
  }

  public save (member: Member): Promise<void> {
    // TODO:
    return null;
  }
}
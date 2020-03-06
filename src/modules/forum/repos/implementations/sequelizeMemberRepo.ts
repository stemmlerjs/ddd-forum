
import { IMemberRepo } from "../memberRepo";
import { Member } from "../../domain/member";
import { MemberMap } from "../../mappers/memberMap";
import { MemberDetails } from "../../domain/memberDetails";
import { MemberDetailsMap } from "../../mappers/memberDetailsMap";
import { MemberId } from "../../domain/memberId";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { MemberIdMap } from "../../mappers/memberIdMap";
import { Op } from "sequelize"

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

  public async exists (userId: string): Promise<boolean> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_base_id'] = userId;
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    return found;
  }

  public async getMemberDetailsByPostLinkOrSlug (linkOrSlug: string): Promise<MemberDetails> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.include.push(
      { 
        model: this.models.Post, 
        as: 'Post', 
        required: true, 
        where: {
          [Op.or]: {
            slug: { [Op.eq]: linkOrSlug },
            link: { [Op.eq]: linkOrSlug }
          }
        }
      }
    )
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (!found) throw new Error('Member not found');
    return MemberDetailsMap.toDomain(member);
  }

  public async getMemberIdByUserId (userId: string): Promise<MemberId> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_base_id'] = userId;
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (!found) throw new Error('Member id not found');
    return MemberIdMap.toDomain(member);
  }

  public async getMemberByUserId (userId: string): Promise<Member> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['member_base_id'] = userId;
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (!found) throw new Error("Member not found");
    return MemberMap.toDomain(member);
  }

  public async getMemberByUserName (username: string): Promise<Member> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.include[0].where = {
      username: username
    }
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (!found) throw new Error("Member not found");
    return MemberMap.toDomain(member);
  }

  public async getMemberDetailsByUserName (username: string): Promise<MemberDetails> {
    const MemberModel = this.models.Member;
    const baseQuery = this.createBaseQuery();
    baseQuery.include[0].where = {
      username: username
    }
    const member = await MemberModel.findOne(baseQuery);
    const found = !!member === true;
    if (!found) throw new Error("Member not found");
    return MemberDetailsMap.toDomain(member);
  }

  public async save (member: Member): Promise<void> {
    const MemberModel = this.models.Member;
    const exists = await this.exists(member.userId.id.toString());
    
    if (!exists) {
      const rawSequelizeMember = await MemberMap.toPersistence(member);
      await MemberModel.create(rawSequelizeMember);
    }

    return;
  }
}
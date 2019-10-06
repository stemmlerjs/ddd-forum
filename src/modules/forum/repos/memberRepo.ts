
import { Member } from "../domain/member";
import { MemberDetails } from "../domain/memberDetails";

export interface IMemberRepo {
  exists (userId: string): Promise<boolean>;
  getMemberByUserId (userId: string): Promise<Member>;
  getMemberByUserName (username: string): Promise<Member>;
  getMemberDetailsByUserName (username: string): Promise<MemberDetails>;
  save (member: Member): Promise<void>;
}
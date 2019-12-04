
import { Member } from "../domain/member";
import { MemberDetails } from "../domain/memberDetails";
import { MemberId } from "../domain/memberId";
import { PostId } from '../domain/postId'

export interface IMemberRepo {
  exists (userId: string): Promise<boolean>;
  getMemberByUserId (userId: string): Promise<Member>;
  getMemberIdByUserId (userId: string): Promise<MemberId>;
  getMemberByPostSlug (slug: string): Promise<MemberDetails>;
  getMemberByUserName (username: string): Promise<Member>;
  getMemberDetailsByUserName (username: string): Promise<MemberDetails>;
  save (member: Member): Promise<void>;
}

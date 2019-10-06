
import { Member } from "../domain/member";

export interface IMemberRepo {
  getMemberByUserId (userId: string): Promise<Member>;
  save (member: Member): Promise<void>;
}
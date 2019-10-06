
import { Member } from "../domain/member";

export interface IMemberRepo {
  exists (userId: string): Promise<boolean>;
  getMemberByUserId (userId: string): Promise<Member>;
  save (member: Member): Promise<void>;
}
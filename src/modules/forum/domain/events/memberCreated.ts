

import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Member } from "../member";

export class MemberCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public member: Member;

  constructor (member: Member) {
    this.dateTimeOccurred = new Date();
    this.member = member;
  }
  
  getAggregateId (): UniqueEntityID {
    return this.member.id;
  }
}
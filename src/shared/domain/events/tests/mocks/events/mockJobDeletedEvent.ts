
import { IDomainEvent } from "../../../IDomainEvent";
import { UniqueEntityID } from "../../../../UniqueEntityID";

export class MockJobDeletedEvent implements IDomainEvent {
  dateTimeOccurred: Date;
  id: UniqueEntityID;

  constructor (id: UniqueEntityID) {
    this.dateTimeOccurred = new Date();
    this.id = id;
  }

  getAggregateId (): UniqueEntityID {
    return this.id;
  }
}
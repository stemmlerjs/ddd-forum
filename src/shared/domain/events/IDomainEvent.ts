
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId (): UniqueEntityID;
}


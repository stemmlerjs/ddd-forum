
import { IDomainEvent } from "./IDomainEvent";

export interface IHandle<IDomainEvent> {
  setupSubscriptions(): void;
}

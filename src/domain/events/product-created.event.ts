import { DomainEvent } from "./base-domain.event";
import { Money } from "../value-objects/money.vo";

export class ProductCreatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: Money
  ) {
    super();
  }
}
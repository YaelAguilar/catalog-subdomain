import { DomainEvent } from "./base-domain.event.js";
import { Money } from "../value-objects/money.vo.js";

export class ProductCreatedEvent extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: Money
  ) {
    super();
  }
}
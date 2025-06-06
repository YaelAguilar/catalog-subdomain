import { randomUUID } from "crypto";
import { IIdGenerator } from "../../application/contracts/id-generator.interface.js";

export class UuidGenerator implements IIdGenerator {
  generate(): string {
    return randomUUID();
  }
}
export class Money {
    readonly amount: number;
    readonly currency: string;

    constructor(amount: number, currency: string) {
        if (amount < 0) {
            throw new Error("Amount cannot be negative");
        }
        if (!currency || currency.length !== 3) {
            throw new Error("Invalid currency code.");
        }

        this.amount = amount;
        this.currency = currency.toUpperCase();
        Object.freeze(this);
    }
}
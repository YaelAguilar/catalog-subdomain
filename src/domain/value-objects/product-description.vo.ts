export class ProductDescription {
    readonly value: string;

    constructor(value: string) {
        if (value && value.length > 500) {
            throw new Error("Product description cannot be longer than 500 characters.");
        }
        this.value = value;
        Object.freeze(this);
    }
}
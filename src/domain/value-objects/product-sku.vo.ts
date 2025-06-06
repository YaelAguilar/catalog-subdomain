export class SKU {
    readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length < 1) {
                throw new Error("SKU cannot be empty");
        }   
        this.value = value;
        Object.freeze(this);
    }
}
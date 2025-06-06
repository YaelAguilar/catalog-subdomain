export class CategoryName {
    readonly value: string;

    constructor(value: string) {
        if (!value || value.length < 2) {
            throw new Error("Category name must be at least 2 characters long.");
        }
        this.value = value;
        Object.freeze(this);
    }
}
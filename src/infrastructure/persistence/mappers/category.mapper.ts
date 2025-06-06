import { Category } from "../../../domain/aggregates/category.aggregate.js";
import { CategoryName } from "../../../domain/value-objects/category-name.vo.js";

type CategoryRow = {
    id: string;
    name: string;
    parentId: string | null;
};

export class CategoryMapper {
    public static toDomain(raw: CategoryRow): Category {
        const name = new CategoryName(raw.name);
        
        const category = Category.create(raw.id, name, raw.parentId);

        return category;
    }

    public static toPersistence(category: Category) {
        return {
            id: category.id,
            name: category.name.value,
            parentId: category.parentId, 
        };
    }
}
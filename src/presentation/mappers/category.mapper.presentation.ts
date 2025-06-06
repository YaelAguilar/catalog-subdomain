import { Category } from "../../domain/aggregates/category.aggregate.js";
import { CategoryDto } from "../../application/dtos/category.dto.js";

export class CategoryPresentationMapper {
    public static toDto(category: Category): CategoryDto {
        return {
            id: category.id,
            name: category.name.value,
            parentId: category.parentId,
        }
    }
}
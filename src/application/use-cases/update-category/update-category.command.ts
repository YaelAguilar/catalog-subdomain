export interface UpdateCategoryCommand {
  id: string;
  name?: string;
  parentId?: string | null;
}
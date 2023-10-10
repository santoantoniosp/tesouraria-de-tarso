import { Category } from "../../models/category";

export interface LoadCategories {
  loadAll(communityId: string): Promise<Category[]>
}

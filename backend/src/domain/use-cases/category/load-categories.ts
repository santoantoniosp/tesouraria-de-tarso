import { Category } from '../../models/category';

export interface ILoadCategories {
  loadAll(communityId: string): Promise<Category[]>;
}

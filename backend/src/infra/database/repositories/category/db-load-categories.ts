import { Category } from '../../../../domain/models/category';
import { ILoadCategories } from '../../../../domain/use-cases/category/load-categories';
import { prismaClient } from '../../postgres-db';

export class DbLoadCategories implements ILoadCategories {
  loadAll(communityId: string): Promise<Category[]> {
    return prismaClient.category.findMany({
      where: {
        communityId,
      },
    });
  }
}

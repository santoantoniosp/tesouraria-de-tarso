import { Category } from "../../../../domain/models/category";
import { LoadCategories } from "../../../../domain/use-cases/category/load-categories";
import { prismaClient } from "../../postgres-db";

export class DbLoadCategories implements LoadCategories {
  loadAll(communityId: string): Promise<Category[]> {
    return prismaClient.category.findMany({
      where: {
        communityId
      }
    })
  }
}

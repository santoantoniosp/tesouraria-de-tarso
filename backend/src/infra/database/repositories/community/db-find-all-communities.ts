import { Community } from "../../../../domain/use-cases/community/create-community";
import { FindAllCommunities } from "../../../../domain/use-cases/community/find-all-communities";
import { prismaClient } from "../../postgres-db";

export class DbFindAllCommunities implements FindAllCommunities {
  findAll(): Promise<Community[]> {
    return prismaClient.community.findMany({
      include: {
        address: true
      }
    });
  }
}

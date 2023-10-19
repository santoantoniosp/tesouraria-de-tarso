import { Community } from '../../../../domain/use-cases/community/create-community';
import { IFindAllCommunities } from '../../../../domain/use-cases/community/find-all-communities';
import { prismaClient } from '../../postgres-db';

export class DbFindAllCommunities implements IFindAllCommunities {
  findAll(): Promise<Community[]> {
    return prismaClient.community.findMany({
      include: {
        address: true,
      },
    });
  }
}

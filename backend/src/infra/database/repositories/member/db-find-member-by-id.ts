import { Member } from '../../../../domain/models/member';
import { IFindMemberById } from '../../../../domain/use-cases/member/find-member-by-id';
import { prismaClient } from '../../postgres-db';

export class DbFindMemberById implements IFindMemberById {
  async findById(id: string): Promise<Member | null> {
    const data = await prismaClient.member.findUnique({
      where: { id },
      include: {
        community: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!data) return null;

    const { communityId, ...restData } = data;

    return restData;
  }
}

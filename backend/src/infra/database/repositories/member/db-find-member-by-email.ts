import { Member } from '../../../../domain/models/member';
import { IFindMemberByEmail } from '../../../../domain/use-cases/member/find-member-by-email';
import { prismaClient } from '../../postgres-db';

export class DbFindMemberByEmail implements IFindMemberByEmail {
  findByEmail(email: string): Promise<Member | null> {
    return prismaClient.member.findUnique({
      where: {
        email,
      },
      include: {
        community: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}

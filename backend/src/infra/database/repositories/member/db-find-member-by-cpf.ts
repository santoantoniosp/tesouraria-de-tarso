import { Member } from '../../../../domain/models/member';
import { IFindMemberByCPF } from '../../../../domain/use-cases/member/find-member-by-cpf';
import { prismaClient } from '../../postgres-db';

export class DbFindMemberByCPF implements IFindMemberByCPF {
  findByCPF(cpf: string): Promise<Member | null> {
    return prismaClient.member.findUnique({
      where: {
        cpf,
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

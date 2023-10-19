import { Member } from '../../../../domain/models/member';
import { CreateMemberDTO, ICreateMember } from '../../../../domain/use-cases/member/create-member';
import { prismaClient } from '../../postgres-db';

export class DbCreateMember implements ICreateMember {
  create(userDTO: CreateMemberDTO): Promise<Member> {
    const defaultPassword = 'admin@123';

    return prismaClient.member.create({
      data: {
        ...userDTO,
        password: defaultPassword,
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

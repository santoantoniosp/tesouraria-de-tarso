import { Member } from "../../../../domain/models/member";
import { CreateMember, CreateMemberDTO } from "../../../../domain/use-cases/member/create-member";
import { prismaClient } from "../../postgres-db";

export class DbCreateMember implements CreateMember {
  create(userDTO: CreateMemberDTO): Promise<Member> {
    const defaultPassword = 'admin@123';

    return prismaClient.member.create({
      data: {
        ...userDTO,
        password: defaultPassword,
      }
    })
  }
}

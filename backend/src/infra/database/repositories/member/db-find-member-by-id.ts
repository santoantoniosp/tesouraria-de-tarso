import { Member } from "../../../../domain/models/member";
import { FindMemberById } from "../../../../domain/use-cases/member/find-member-by-id";
import { prismaClient } from "../../postgres-db";

export class DbFindMemberById implements FindMemberById {
  findById(id: string): Promise<Member | null> {
    return prismaClient.member.findUnique({
      where: { id }
    })
  }
}

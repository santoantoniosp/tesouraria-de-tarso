import { Member } from "../../models/member";

export interface FindMemberByCPF {
  findByCPF(cpf: string): Promise<Member | null>
}

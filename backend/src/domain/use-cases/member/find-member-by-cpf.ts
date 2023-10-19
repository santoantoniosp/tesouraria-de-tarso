import { Member } from '../../models/member';

export interface IFindMemberByCPF {
  findByCPF(cpf: string): Promise<Member | null>;
}

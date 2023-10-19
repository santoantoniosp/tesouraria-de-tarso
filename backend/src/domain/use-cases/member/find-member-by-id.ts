import { Member } from '../../models/member';

export interface IFindMemberById {
  findById(id: string): Promise<Member | null>;
}

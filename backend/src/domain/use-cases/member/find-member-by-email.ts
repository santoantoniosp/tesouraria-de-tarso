import { Member } from '../../models/member';

export interface IFindMemberByEmail {
  findByEmail(email: string): Promise<Member | null>;
}

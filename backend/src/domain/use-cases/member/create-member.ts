import { Member } from "../../models/member";

export type MemberDTO = Omit<Member, 'id'>

export type CreateMemberDTO = Omit<Member, 'id' | 'password' | 'community'> & {
  communityId: string;
}

export interface CreateMember {
  create(createMemberDTO: CreateMemberDTO): Promise<Member>
}

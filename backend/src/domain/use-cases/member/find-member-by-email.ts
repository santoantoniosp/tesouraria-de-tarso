import { Member } from "../../models/member";

export interface FindMemberByEmail {
  findByEmail(email: string): Promise<Member | null>
}

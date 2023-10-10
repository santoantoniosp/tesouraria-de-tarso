import { Member } from "../../models/member";

export interface FindMemberById {
  findById(id: string): Promise<Member | null>
}

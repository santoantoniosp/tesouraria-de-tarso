import { Community } from "./create-community";

export interface FindAllCommunities {
  findAll(): Promise<Community[]>
}

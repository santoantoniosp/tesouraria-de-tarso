import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { DbCreateCommunity } from "../../../infra/database/repositories/community/db-create-community";
import { DbFindMemberById } from "../../../infra/database/repositories/member/db-find-member-by-id";
import { CreateCommunityController } from "../../../presentation/controllers/community/create-community-controller";

export function makeCreateCommunityController() {
  const dbCreateCommunity = new DbCreateCommunity()
  const jwtAdapter = new JwtAdapter()
  const dbFindMemberById = new DbFindMemberById()

  return new CreateCommunityController(dbCreateCommunity, jwtAdapter, dbFindMemberById)
}

import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { DbFindMemberById } from "../../../infra/database/repositories/member/db-find-member-by-id";
import { DbLoadTransactionsByCommunityId } from "../../../infra/database/repositories/transaction/db-load-transactions-by-community-id";
import { LoadTransactionsController } from "../../../presentation/controllers/transaction/load-transactions-controller";
import { LoadMemberFromRequest } from "../../../presentation/helpers/load-member-from-request";

export function makeLoadTransactionsController(): LoadTransactionsController {
  const jwtAdapter = new JwtAdapter()
  const dbFindMemberById = new DbFindMemberById()
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById)

  const dbLoadTransactionsByCommunityId = new DbLoadTransactionsByCommunityId()

  return new LoadTransactionsController(loadMemberFromRequest, dbLoadTransactionsByCommunityId)
}

import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { DbUpdateTransaction } from '../../../infra/database/repositories/transaction/db-update-transaction';
import { UpdateTransactionController } from '../../../presentation/controllers/transaction/update-transaction-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeUpdateTransactionController(): UpdateTransactionController {
  const dbFindMemberById = new DbFindMemberById();
  const jwtAdapter = new JwtAdapter();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  const dbUpdateTransaction = new DbUpdateTransaction();
  return new UpdateTransactionController(loadMemberFromRequest, dbUpdateTransaction);
}

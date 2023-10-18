import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { DbDeleteTransaction } from '../../../infra/database/repositories/transaction/db-delete-transaction';
import { DeleteTransactionController } from '../../../presentation/controllers/transaction/delete-transaction-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeDeleteTransactionController(): DeleteTransactionController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  const dbDeleteTransaction = new DbDeleteTransaction();

  return new DeleteTransactionController(loadMemberFromRequest, dbDeleteTransaction);
}

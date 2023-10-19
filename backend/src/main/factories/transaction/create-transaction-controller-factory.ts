import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { DbCreateTransaction } from '../../../infra/database/repositories/transaction/db-create-transaction';
import { CreateTransactionController } from '../../../presentation/controllers/transaction/create-transaction-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeCreateTransactionController(): CreateTransactionController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  const dbCreateTransaction = new DbCreateTransaction();

  return new CreateTransactionController(loadMemberFromRequest, dbCreateTransaction);
}

import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbLoadBankAccounts } from '../../../infra/database/repositories/bank-account/db-load-bank-accounts';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { FindBankAccountsController } from '../../../presentation/controllers/bank-account/find-bank-accounts-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeFindBankAccountsController(): FindBankAccountsController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  const dbLoadBankAccounts = new DbLoadBankAccounts();

  return new FindBankAccountsController(loadMemberFromRequest, dbLoadBankAccounts);
}

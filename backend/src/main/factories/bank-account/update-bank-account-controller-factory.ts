import { DbUpdateBankAccount } from '../../../infra/database/repositories/bank-account/db-update-bank-account';
import { UpdateBankAccountController } from '../../../presentation/controllers/bank-account/update-bank-account-controller';
import { makeLoadRequestMember } from '../helpers/load-request-member-factory';

export function makeUpdateBankAccount(): UpdateBankAccountController {
  const loadRequestMember = makeLoadRequestMember();
  const dbUpdateBankAccount = new DbUpdateBankAccount();

  return new UpdateBankAccountController(loadRequestMember, dbUpdateBankAccount);
}

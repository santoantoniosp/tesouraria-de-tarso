import { DbDeleteBankAccount } from '../../../infra/database/repositories/bank-account/db-delete-bank-account';
import { DeleteBankAccountController } from '../../../presentation/controllers/bank-account/delete-bank-account-controller';
import { makeLoadRequestMember } from '../helpers/load-request-member-factory';

export function makeDeleteBankAccountController(): DeleteBankAccountController {
  const loadRequestMember = makeLoadRequestMember();
  const dbDeleteBankAccount = new DbDeleteBankAccount();

  return new DeleteBankAccountController(loadRequestMember, dbDeleteBankAccount);
}

import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbCreateBankAccount } from '../../../infra/database/repositories/bank-account/db-create-bank-account';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { CreateBankAccountController } from '../../../presentation/controllers/bank-account/create-bank-account-controller';

export function makeCreateBankAccountController(): CreateBankAccountController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const dbCreateBankAccount = new DbCreateBankAccount();

  return new CreateBankAccountController(jwtAdapter, dbFindMemberById, dbCreateBankAccount);
}

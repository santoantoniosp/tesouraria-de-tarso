import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeCreateBankAccountController } from '../factories/bank-account/create-bank-account-controller-factory';
import { makeDeleteBankAccountController } from '../factories/bank-account/delete-bank-account-controller-factory';
import { makeFindBankAccountsController } from '../factories/bank-account/find-bank-accounts-controller-factory';
import { makeUpdateBankAccount } from '../factories/bank-account/update-bank-account-controller-factory';

export const bankAccountsRoutes = Router();

bankAccountsRoutes.post('/bank-accounts', adaptRoute(makeCreateBankAccountController()));
bankAccountsRoutes.get('/bank-accounts', adaptRoute(makeFindBankAccountsController()));
bankAccountsRoutes.put('/bank-accounts/:bankAccountId', adaptRoute(makeUpdateBankAccount()));
bankAccountsRoutes.delete(
  '/bank-accounts/:bankAccountId',
  adaptRoute(makeDeleteBankAccountController()),
);

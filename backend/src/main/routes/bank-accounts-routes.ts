import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeCreateBankAccountController } from "../factories/bank-account/create-bank-account-controller-factory";
import { makeFindBankAccountsController } from "../factories/bank-account/find-bank-accounts-controller-factory";

export const bankAccountsRoutes = Router()

bankAccountsRoutes.post('/bank-accounts', adaptRoute(makeCreateBankAccountController()))
bankAccountsRoutes.get('/bank-accounts', adaptRoute(makeFindBankAccountsController()))

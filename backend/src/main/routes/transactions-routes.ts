import { Router } from "express";
import { adaptRoute } from "../adapters/express-router-adapter";
import { makeCreateTransactionController } from "../factories/transaction/create-transaction-controller-factory";
import { makeLoadTransactionsController } from "../factories/transaction/load-transactions-controller-factory";

export const transactionsRoutes = Router()

transactionsRoutes.post('/transactions', adaptRoute(makeCreateTransactionController()))
transactionsRoutes.get('/transactions', adaptRoute(makeLoadTransactionsController()))

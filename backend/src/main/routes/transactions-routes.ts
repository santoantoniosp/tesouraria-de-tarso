import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeCreateTransactionController } from '../factories/transaction/create-transaction-controller-factory';
import { makeDeleteTransactionController } from '../factories/transaction/delete-transaction-controller-factory';
import { makeLoadTransactionsController } from '../factories/transaction/load-transactions-controller-factory';
import { makeUpdateTransactionController } from '../factories/transaction/update-transaction-controller-factory';

export const transactionsRoutes = Router();

transactionsRoutes.post('/transactions', adaptRoute(makeCreateTransactionController()));
transactionsRoutes.get('/transactions', adaptRoute(makeLoadTransactionsController()));
transactionsRoutes.put('/transactions/:transactionId', adaptRoute(makeUpdateTransactionController()));
transactionsRoutes.delete('/transactions/:transactionId', adaptRoute(makeDeleteTransactionController()));

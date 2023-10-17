import 'dotenv/config';
import express from 'express';

import { cors } from './cors';
import { authenticationRoutes } from './routes/authentication-routes';
import { bankAccountsRoutes } from './routes/bank-accounts-routes';
import { categoriesRoutes } from './routes/categories-routes';
import { communitiesRoutes } from './routes/communities-routes';
import { membersRoutes } from './routes/members-routes';
import { transactionsRoutes } from './routes/transactions-routes';

const server = express();

server.use(cors);
server.use(express.json());
server.use(
  authenticationRoutes,
  membersRoutes,
  communitiesRoutes,
  bankAccountsRoutes,
  categoriesRoutes,
  transactionsRoutes,
);

const port = process.env.PORT;
server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

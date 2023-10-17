import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeSignInController } from '../factories/authentication/sign-in-controller-factory';

export const authenticationRoutes = Router();

authenticationRoutes.post('/sign-in', adaptRoute(makeSignInController()));

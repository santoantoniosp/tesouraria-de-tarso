import { Router } from 'express';

import { adaptRoute } from '../adapters/express-router-adapter';
import { makeCreateMemberController } from '../factories/member/create-member-controller-factory';
import { makeMeController } from '../factories/member/me-controller-factory';

export const membersRoutes = Router();

membersRoutes.post('/members', adaptRoute(makeCreateMemberController()));
membersRoutes.get('/members/me', adaptRoute(makeMeController()));

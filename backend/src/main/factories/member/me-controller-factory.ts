import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { MeController } from '../../../presentation/controllers/member/me-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeMeController(): MeController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  return new MeController(loadMemberFromRequest);
}

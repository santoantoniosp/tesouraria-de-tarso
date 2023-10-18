import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeLoadRequestMember(): LoadMemberFromRequest {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  return new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);
}

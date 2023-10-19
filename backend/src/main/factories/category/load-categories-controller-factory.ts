import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter';
import { DbLoadCategories } from '../../../infra/database/repositories/category/db-load-categories';
import { DbFindMemberById } from '../../../infra/database/repositories/member/db-find-member-by-id';
import { LoadCategoriesController } from '../../../presentation/controllers/category/load-categories-controller';
import { LoadMemberFromRequest } from '../../../presentation/helpers/load-member-from-request';

export function makeLoadCategoriesController(): LoadCategoriesController {
  const jwtAdapter = new JwtAdapter();
  const dbFindMemberById = new DbFindMemberById();
  const loadMemberFromRequest = new LoadMemberFromRequest(jwtAdapter, dbFindMemberById);

  const dbLoadCategories = new DbLoadCategories();

  return new LoadCategoriesController(loadMemberFromRequest, dbLoadCategories);
}

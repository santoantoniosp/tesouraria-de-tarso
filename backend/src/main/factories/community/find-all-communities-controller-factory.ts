import { DbFindAllCommunities } from '../../../infra/database/repositories/community/db-find-all-communities';
import { FindAllCommunitiesController } from '../../../presentation/controllers/community/find-all-communities-controller';

export function makeFindAllCommunities() {
  const dbFindAllCommunities = new DbFindAllCommunities();

  return new FindAllCommunitiesController(dbFindAllCommunities);
}

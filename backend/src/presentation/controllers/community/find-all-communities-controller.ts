import { IFindAllCommunities } from '../../../domain/use-cases/community/find-all-communities';
import { ok } from '../../helpers/http-helpers';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class FindAllCommunitiesController implements IController {
  constructor(private readonly findAllCommunities: IFindAllCommunities) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const communities = await this.findAllCommunities.findAll();

    return ok(communities);
  }
}

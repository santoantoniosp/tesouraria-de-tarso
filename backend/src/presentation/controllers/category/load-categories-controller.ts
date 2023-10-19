import { ILoadCategories } from '../../../domain/use-cases/category/load-categories';
import { notFound, ok } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class LoadCategoriesController implements IController {
  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly loadCategories: ILoadCategories,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest);

    if (!member) return notFound();

    const categories = await this.loadCategories.loadAll(member.community.id);

    return ok(categories);
  }
}

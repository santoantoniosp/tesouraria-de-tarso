import { LoadCategories } from "../../../domain/use-cases/category/load-categories";
import { notFound, ok } from "../../helpers/http-helpers";
import { LoadMemberFromRequest } from "../../helpers/load-member-from-request";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class LoadCategoriesController implements Controller {

  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly loadCategories: LoadCategories,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest)

    if (!member)
      return notFound()

    const categories = await this.loadCategories.loadAll(member.communityId)

    return ok(categories)
  }
}

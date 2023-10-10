import { FindAllCommunities } from "../../../domain/use-cases/community/find-all-communities";
import { ok } from "../../helpers/http-helpers";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class FindAllCommunitiesController implements Controller {

  constructor(
    private readonly findAllCommunities: FindAllCommunities
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const communities = await this.findAllCommunities.findAll()

    return ok(communities)
  }
}

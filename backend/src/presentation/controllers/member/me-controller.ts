import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class MeController implements IController {
  constructor(private readonly loadMemberFromRequest: LoadMemberFromRequest) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest);
    if (!member) return unauthorized();

    return ok({ ...member, password: undefined });
  }
}

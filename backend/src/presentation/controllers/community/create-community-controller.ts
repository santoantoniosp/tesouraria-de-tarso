import { CreateCommunity } from "../../../domain/use-cases/community/create-community";
import { Decrypter } from "../../../domain/use-cases/cryptography/decrypter";
import { FindMemberById } from "../../../domain/use-cases/member/find-member-by-id";
import { badRequest, ok } from "../../helpers/http-helpers";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class CreateCommunityController implements Controller {

  constructor(
    private readonly createCommunity: CreateCommunity,
    private readonly decrypter: Decrypter,
    private readonly findMemberById: FindMemberById
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'address']
    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest({ error: `${field} is required.` })
    }

    /* const token = this.extractTokenFromHeader(httpRequest)
    if (!token)
      return unauthorized()

    const payload = this.decrypter.decrypt(token)
    if (!payload)
      return unauthorized()

    const member = await this.findMemberById.findById(payload.sub)
    if (!member)
      return unauthorized()

    if (member.communityRole !== 'owner')
      return unauthorized({ error: 'Sem permissão para essa ação.' }) */

    const { name, address } = httpRequest.body

    const community = await this.createCommunity.create({
      name,
      address
    })

    return ok(community)
  }

  private extractTokenFromHeader(httpRequest: HttpRequest): string | undefined {
    const [type, token] = httpRequest.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

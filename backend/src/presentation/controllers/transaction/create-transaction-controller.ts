import { CreateTransaction } from "../../../domain/use-cases/transaction/create-transaction";
import { ok, unauthorized } from "../../helpers/http-helpers";
import { LoadMemberFromRequest } from "../../helpers/load-member-from-request";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class CreateTransactionController implements Controller {

  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly createTransaction: CreateTransaction
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest)
    if (!member)
      return unauthorized()

    const { bankAccountId, categoryId, name, value, date, type } = httpRequest.body

    const transaction = await this.createTransaction.create({
      bankAccountId,
      categoryId,
      name,
      value,
      date,
      type,
      communityId: member.community.id,
      memberId: member.id
    })

    return ok(transaction)
  }
}

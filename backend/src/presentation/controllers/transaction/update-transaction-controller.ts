import { UpdateTransaction } from "../../../domain/use-cases/transaction/update-transaction";
import { ok, unauthorized } from "../../helpers/http-helpers";
import { LoadMemberFromRequest } from "../../helpers/load-member-from-request";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class UpdateTransactionController implements Controller {

  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly updateTransaction: UpdateTransaction
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest)
    if (!member)
      return unauthorized()

    if (member.communityRole === 'reader')
      return unauthorized()

    const { bankAccountId, categoryId, name, value, date, type } = httpRequest.body

    const { transactionId } = httpRequest.params

    const transactionUpdated = await this.updateTransaction.update(transactionId, {
      bankAccountId,
      categoryId,
      name,
      value,
      date,
      type,
      communityId: member.community.id,
      memberId: member.id
    })

    return ok(transactionUpdated)
  }
}

import { LoadBankAccounts } from "../../../domain/use-cases/bank-account/load-bank-accounts";
import { notFound, ok } from "../../helpers/http-helpers";
import { LoadMemberFromRequest } from "../../helpers/load-member-from-request";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class FindBankAccountsController implements Controller {

  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly loadBankAccounts: LoadBankAccounts
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest)

    if (!member)
      return notFound()

    const bankAccounts = await this.loadBankAccounts.load(member.community.id)

    const bankAccountsWithCurrentBalance = bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) => acc + (
          transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value
        ), 0)

      const currentBalance = bankAccount.initialBalance + totalTransactions

      return {
        ...bankAccount,
        currentBalance
      }
    })

    return ok(bankAccountsWithCurrentBalance)
  }
}

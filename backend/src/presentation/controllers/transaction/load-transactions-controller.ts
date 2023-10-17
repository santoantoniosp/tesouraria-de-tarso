import { LoadTransactionsByCommunityId } from '../../../domain/use-cases/transaction/load-transactions-by-community-id';
import { notFound, ok } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class LoadTransactionsController implements Controller {
  constructor(
    private readonly loadMemberFromRequest: LoadMemberFromRequest,
    private readonly loadTransactionsByCommunityId: LoadTransactionsByCommunityId,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadMemberFromRequest.loadMember(httpRequest);
    if (!member) return notFound();

    const { month, year, bankAccountId, type } = httpRequest.query;

    const transactions = await this.loadTransactionsByCommunityId.loadAll(member.community.id, {
      year,
      month,
      bankAccountId,
      type,
    });

    return ok(transactions);
  }
}

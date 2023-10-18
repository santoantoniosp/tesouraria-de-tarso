import { IDeleteTransaction } from '../../../domain/use-cases/transaction/delete-transaction';
import { noContent, unauthorized } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class DeleteTransactionController implements Controller {
  constructor(
    private readonly loadRequestMember: LoadMemberFromRequest,
    private readonly deleteTransaction: IDeleteTransaction,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { transactionId } = httpRequest.params;

    const member = await this.loadRequestMember.loadMember(httpRequest);
    if (!member) return unauthorized();

    if (member.communityRole === 'reader') return unauthorized();

    await this.deleteTransaction.delete(transactionId);

    return noContent();
  }
}

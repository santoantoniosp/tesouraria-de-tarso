import { IDeleteBankAccount } from '../../../domain/use-cases/bank-account/delete-bank-account';
import { noContent, unauthorized } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class DeleteBankAccountController implements IController {
  constructor(
    private readonly loadRequestMember: LoadMemberFromRequest,
    private readonly deleteBankAccount: IDeleteBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadRequestMember.loadMember(httpRequest);
    if (!member) return unauthorized();

    if (member.communityRole === 'reader') return unauthorized();

    const { bankAccountId } = httpRequest.params;

    await this.deleteBankAccount.delete(bankAccountId);

    return noContent();
  }
}

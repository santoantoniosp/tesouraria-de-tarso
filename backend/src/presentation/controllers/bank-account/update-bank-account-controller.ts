import { IUpdateBankAccount } from '../../../domain/use-cases/bank-account/update-bank-account';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { LoadMemberFromRequest } from '../../helpers/load-member-from-request';
import { Controller } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class UpdateBankAccountController implements Controller {
  constructor(
    private readonly loadRequestMember: LoadMemberFromRequest,
    private readonly updateBankAccount: IUpdateBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const member = await this.loadRequestMember.loadMember(httpRequest);
    if (!member) return unauthorized();

    if (member.communityRole === 'reader') return unauthorized();

    const { bankAccountId } = httpRequest.params;

    const { name, initialBalance, color, type } = httpRequest.body;

    const updatedBankAccount = await this.updateBankAccount.update(bankAccountId, {
      name,
      initialBalance,
      color,
      type,
      communityId: member.community.id,
    });

    return ok(updatedBankAccount);
  }
}

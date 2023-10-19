import { ICreateBankAccount } from '../../../domain/use-cases/bank-account/create-bank-account';
import { IDecrypter } from '../../../domain/use-cases/cryptography/decrypter';
import { IFindMemberById } from '../../../domain/use-cases/member/find-member-by-id';
import { ok, unauthorized } from '../../helpers/http-helpers';
import { IController } from '../../protocols/controller';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateBankAccountController implements IController {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly findMemberById: IFindMemberById,
    private readonly createBankAccount: ICreateBankAccount,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const token = this.extractTokenFromHeader(httpRequest);
    if (!token) return unauthorized();

    const payload = this.decrypter.decrypt(token);
    if (!payload) return unauthorized();

    const member = await this.findMemberById.findById(payload.sub);
    if (!member) return unauthorized();

    if (member.communityRole === 'reader')
      return unauthorized({ error: 'Sem permissão para essa ação.' });

    const { name, initialBalance, color, type } = httpRequest.body;

    const bankAccount = await this.createBankAccount.create({
      name,
      initialBalance,
      color,
      type,
      communityId: member.community.id,
    });

    return ok(bankAccount);
  }

  private extractTokenFromHeader(httpRequest: HttpRequest): string | undefined {
    const [type, token] = httpRequest.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

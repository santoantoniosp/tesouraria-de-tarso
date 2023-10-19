import { IEncrypter } from '../../../domain/use-cases/cryptography/encrypter';
import { IFindMemberByEmail } from '../../../domain/use-cases/member/find-member-by-email';
import { badRequest, notFound, ok, unauthorized } from '../../helpers/http-helpers';
import { Controller } from '../../protocols/controller';
import { EmailValidator } from '../../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class SignInController implements Controller {
  constructor(
    private readonly emailValidador: EmailValidator,
    private readonly findMemberByEmail: IFindMemberByEmail,
    private readonly encrypter: IEncrypter,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password'];
    for await (const field of requiredFields)
      if (!httpRequest.body[field]) return badRequest({ error: `${field} is required.` });

    const { email, password } = httpRequest.body;

    const isValidEmail = this.emailValidador.isValid(email);
    if (!isValidEmail) return badRequest({ error: 'Invalid e-mail.' });

    const member = await this.findMemberByEmail.findByEmail(email);
    if (!member) return notFound({ error: 'E-mail not found.' });

    if (password !== member.password) return unauthorized({ error: 'Incorrect password.' });

    const accessToken = this.encrypter.encrypt(member.id);

    return ok({ accessToken });
  }
}

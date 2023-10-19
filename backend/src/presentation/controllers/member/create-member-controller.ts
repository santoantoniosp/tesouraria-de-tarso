import { ICreateMember } from '../../../domain/use-cases/member/create-member';
import { IFindMemberByCPF } from '../../../domain/use-cases/member/find-member-by-cpf';
import { IFindMemberByEmail } from '../../../domain/use-cases/member/find-member-by-email';
import { badRequest, conflict, ok } from '../../helpers/http-helpers';
import { IController } from '../../protocols/controller';
import { IDocumentValidator } from '../../protocols/document-validator';
import { IEmailValidator } from '../../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class CreateMemberController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly documentValidator: IDocumentValidator,
    private readonly findMemberByEmail: IFindMemberByEmail,
    private readonly findMemberByCPF: IFindMemberByCPF,
    private readonly createMember: ICreateMember,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'cpf', 'email', 'communityId'];
    for (const field of requiredFields)
      if (!httpRequest.body[field]) return badRequest({ error: `${field} is required.` });

    const { name, email, cpf, role, communityId } = httpRequest.body;

    const isValidEmail = this.emailValidator.isValid(email);
    if (!isValidEmail) return badRequest({ error: 'Invalid e-mail.' });

    const isValidDocument = this.documentValidator.isValid(cpf);
    if (!isValidDocument) return badRequest({ error: 'Invalid CPF.' });

    const emailAlreadyInUse = await this.findMemberByEmail.findByEmail(email);
    if (emailAlreadyInUse) {
      return conflict({ error: 'Email already in use.' });
    }

    const cpfAlreadyInUse = await this.findMemberByCPF.findByCPF(cpf);
    if (cpfAlreadyInUse) return conflict({ error: 'CPF already in use.' });

    const member = await this.createMember.create({
      name,
      email,
      cpf,
      communityRole: role,
      communityId,
    });

    return ok({
      ...member,
      password: undefined,
    });
  }
}

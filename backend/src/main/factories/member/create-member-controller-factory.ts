import { DbCreateMember } from "../../../infra/database/repositories/member/db-create-member";
import { DbFindMemberByCPF } from "../../../infra/database/repositories/member/db-find-member-by-cpf";
import { DbFindMemberByEmail } from "../../../infra/database/repositories/member/db-find-member-by-email";
import { CreateMemberController } from "../../../presentation/controllers/member/create-member-controller";
import { CPFValidatorAdapter } from "../../adapters/cpf-validator-adapter";
import { EmailValidatorAdapter } from "../../adapters/email-validator-adapter";

export function makeCreateMemberController(): CreateMemberController {
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const cpfValidatorAdapter = new CPFValidatorAdapter();
  const dbFindMemberByEmail = new DbFindMemberByEmail()
  const dbFindMemberByCPF = new DbFindMemberByCPF()
  const dbCreateMember = new DbCreateMember()

  return new CreateMemberController(
    emailValidatorAdapter,
    cpfValidatorAdapter,
    dbFindMemberByEmail,
    dbFindMemberByCPF,
    dbCreateMember
  )
}

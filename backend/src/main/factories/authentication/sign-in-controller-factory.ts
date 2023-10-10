import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter";
import { DbFindMemberByEmail } from "../../../infra/database/repositories/member/db-find-member-by-email";
import { SignInController } from "../../../presentation/controllers/authentication/sign-in-controller";
import { EmailValidatorAdapter } from "../../adapters/email-validator-adapter";

export function makeSignInController(): SignInController {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const dbFindMemberByEmail = new DbFindMemberByEmail()
  const jwtAdapter = new JwtAdapter()

  return new SignInController(emailValidatorAdapter, dbFindMemberByEmail, jwtAdapter)
}

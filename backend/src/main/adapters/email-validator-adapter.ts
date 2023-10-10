import { isValidEmail } from "@brazilian-utils/brazilian-utils";
import { EmailValidator } from "../../presentation/protocols/email-validator";

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return isValidEmail(email);
  }
}

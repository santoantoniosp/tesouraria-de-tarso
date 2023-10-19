import { isValidEmail } from '@brazilian-utils/brazilian-utils';

import { IEmailValidator } from '../../presentation/protocols/email-validator';

export class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return isValidEmail(email);
  }
}

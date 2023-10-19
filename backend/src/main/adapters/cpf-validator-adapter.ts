import { isValidCPF } from '@brazilian-utils/brazilian-utils';

import { IDocumentValidator } from '../../presentation/protocols/document-validator';

export class CPFValidatorAdapter implements IDocumentValidator {
  isValid(document: string): boolean {
    return isValidCPF(document);
  }
}

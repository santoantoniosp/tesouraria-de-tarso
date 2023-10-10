import { isValidCPF } from "@brazilian-utils/brazilian-utils";
import { DocumentValidator } from "../../presentation/protocols/document-validator";

export class CPFValidatorAdapter implements DocumentValidator {
  isValid(document: string): boolean {
    return isValidCPF(document);
  }
}

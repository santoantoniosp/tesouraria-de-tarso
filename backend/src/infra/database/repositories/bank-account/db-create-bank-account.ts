import { BankAccountModel } from '../../../../domain/models/bank-account';
import {
  BankAccountDTO,
  ICreateBankAccount,
} from '../../../../domain/use-cases/bank-account/create-bank-account';
import { prismaClient } from '../../postgres-db';

export class DbCreateBankAccount implements ICreateBankAccount {
  create(bankAccountDTO: BankAccountDTO): Promise<BankAccountModel> {
    return prismaClient.bankAccount.create({
      data: {
        ...bankAccountDTO,
      },
    });
  }
}

import { BankAccountModel } from "../../../../domain/models/bank-account";
import { BankAccountDTO, CreateBankAccount } from "../../../../domain/use-cases/bank-account/create-bank-account";
import { prismaClient } from "../../postgres-db";

export class DbCreateBankAccount implements CreateBankAccount {
  create(bankAccountDTO: BankAccountDTO): Promise<BankAccountModel> {
    return prismaClient.bankAccount.create({
      data: {
        ...bankAccountDTO
      }
    })
  }
}

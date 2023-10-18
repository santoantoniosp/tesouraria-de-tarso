import { BankAccount } from '../../../../domain/models/bank-account';
import { BankAccountDTO } from '../../../../domain/use-cases/bank-account/create-bank-account';
import { IUpdateBankAccount } from '../../../../domain/use-cases/bank-account/update-bank-account';
import { prismaClient } from '../../postgres-db';

export class DbUpdateBankAccount implements IUpdateBankAccount {
  update(bankAccountId: string, bankAccountDTO: BankAccountDTO): Promise<BankAccount> {
    return prismaClient.bankAccount.update({
      where: { id: bankAccountId },
      data: bankAccountDTO,
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    });
  }
}

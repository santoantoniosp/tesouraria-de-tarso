import { IDeleteBankAccount } from '../../../../domain/use-cases/bank-account/delete-bank-account';
import { prismaClient } from '../../postgres-db';

export class DbDeleteBankAccount implements IDeleteBankAccount {
  async delete(bankAccountId: string): Promise<void> {
    await prismaClient.bankAccount.delete({ where: { id: bankAccountId } });
  }
}

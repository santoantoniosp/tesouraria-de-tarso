import { BankAccount } from '../../../../domain/models/bank-account';
import { ILoadBankAccounts } from '../../../../domain/use-cases/bank-account/load-bank-accounts';
import { prismaClient } from '../../postgres-db';

export class DbLoadBankAccounts implements ILoadBankAccounts {
  load(communityId: string): Promise<BankAccount[]> {
    return prismaClient.bankAccount.findMany({
      where: { communityId },
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

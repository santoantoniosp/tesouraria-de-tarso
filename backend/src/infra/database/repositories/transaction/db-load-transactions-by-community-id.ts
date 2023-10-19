import { Transaction } from '../../../../domain/models/transaction';
import {
  ILoadTransactionsByCommunityId,
  TransactionsFilter,
} from '../../../../domain/use-cases/transaction/load-transactions-by-community-id';
import { prismaClient } from '../../postgres-db';

export class DbLoadTransactionsByCommunityId implements ILoadTransactionsByCommunityId {
  loadAll(communityId: string, filters: TransactionsFilter): Promise<Transaction[]> {
    return prismaClient.transaction.findMany({
      where: {
        communityId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(Number(filters.year), Number(filters.month))),
          lt: new Date(Date.UTC(Number(filters.year), Number(filters.month) + 1)),
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }
}

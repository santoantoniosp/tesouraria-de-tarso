import { Transaction } from '../../../../domain/models/transaction';
import {
  ICreateTransaction,
  TransactionDTO,
} from '../../../../domain/use-cases/transaction/create-transaction';
import { prismaClient } from '../../postgres-db';

export class DbCreateTransaction implements ICreateTransaction {
  create(transactionDTO: TransactionDTO): Promise<Transaction> {
    return prismaClient.transaction.create({
      data: {
        bankAccountId: transactionDTO.bankAccountId,
        communityId: transactionDTO.communityId,
        categoryId: transactionDTO.categoryId,
        memberId: transactionDTO.memberId,
        name: transactionDTO.name,
        value: transactionDTO.value,
        date: transactionDTO.date,
        type: transactionDTO.type,
      },
    });
  }
}

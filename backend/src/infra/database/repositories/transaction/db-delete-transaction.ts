import { IDeleteTransaction } from '../../../../domain/use-cases/transaction/delete-transaction';
import { prismaClient } from '../../postgres-db';

export class DbDeleteTransaction implements IDeleteTransaction {
  async delete(transactionId: string): Promise<void> {
    await prismaClient.transaction.delete({
      where: { id: transactionId },
    });
  }
}

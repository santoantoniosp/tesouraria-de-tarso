import { Transaction } from "../../../../domain/models/transaction";
import { TransactionDTO } from "../../../../domain/use-cases/transaction/create-transaction";
import { UpdateTransaction } from "../../../../domain/use-cases/transaction/update-transaction";
import { prismaClient } from "../../postgres-db";

export class DbUpdateTransaction implements UpdateTransaction {
  update(transactionId: string, transactionDTO: TransactionDTO): Promise<Transaction> {
    return prismaClient.transaction.update({
      where: { id: transactionId },
      data: transactionDTO
    })
  }
}

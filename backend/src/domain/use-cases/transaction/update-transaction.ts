import { Transaction } from "../../models/transaction";
import { TransactionDTO } from "./create-transaction";

export interface UpdateTransaction {
  update(transactionId: string, transactionDTO: TransactionDTO): Promise<Transaction>
}

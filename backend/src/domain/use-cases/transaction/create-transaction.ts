import { Transaction } from "../../models/transaction";

export type TransactionDTO = Omit<Transaction, 'id'>

export interface CreateTransaction {
  create(transactionDTO: TransactionDTO): Promise<Transaction>
}

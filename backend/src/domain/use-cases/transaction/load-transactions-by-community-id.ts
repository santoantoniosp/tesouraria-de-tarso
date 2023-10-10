import { Transaction, TransactionType } from "../../models/transaction";

export type TransactionsFilter = {
  month: number;
  year: number;
  type?: TransactionType;
  bankAccountId?: string;
}

export interface LoadTransactionsByCommunityId {
  loadAll(communityId: string, filters: TransactionsFilter): Promise<Transaction[]>
}

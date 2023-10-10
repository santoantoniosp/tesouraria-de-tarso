export type TransactionType = "INCOME" | "EXPENSE"

export type Transaction = {
  id: string;
  communityId: string;
  bankAccountId: string;
  categoryId: string | null;
  memberId: string;
  name: string;
  value: number;
  date: Date;
  type: TransactionType;
}

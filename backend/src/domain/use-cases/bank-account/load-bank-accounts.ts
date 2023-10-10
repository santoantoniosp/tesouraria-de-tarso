import { BankAccount } from "../../models/bank-account";

export interface LoadBankAccounts {
  load(communityId: string): Promise<BankAccount[]>
}

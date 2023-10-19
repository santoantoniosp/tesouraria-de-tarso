import { BankAccount } from '../../models/bank-account';

export interface ILoadBankAccounts {
  load(communityId: string): Promise<BankAccount[]>;
}

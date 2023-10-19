import { TransactionType } from './transaction';

export enum BankAccountType {
  CHECKING = 'CHECKING',
  INVESTMENT = 'INVESTMENT',
  CASH = 'CASH',
}

export type BankAccountModel = {
  id: string;
  communityId: string;
  name: string;
  initialBalance: number;
  type: keyof typeof BankAccountType;
  color: string;
};

export type BankAccount = BankAccountModel & {
  transactions: {
    value: number;
    type: TransactionType;
  }[];
};

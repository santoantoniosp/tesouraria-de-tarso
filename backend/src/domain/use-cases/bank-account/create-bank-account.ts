import { BankAccount, BankAccountModel } from "../../models/bank-account"

export type BankAccountDTO = Omit<BankAccount, 'id' | 'transactions'>

export interface CreateBankAccount {
  create(bankAccountDTO: BankAccountDTO): Promise<BankAccountModel>
}

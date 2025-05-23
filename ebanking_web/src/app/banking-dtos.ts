export interface CustomerDTO {
  id?: number;
  name: string;
  email: string;
  createdBy?: string;
  createdByRole?: string;
  updatedBy?: string;
  updatedByRole?: string;
}

export interface BankAccountDTO {
  id?: string;
  balance: number;
  createdAt?: string;
  customer?: CustomerDTO;
  type?: string;
  overDraft?: number;
  interestRate?: number;
}

export interface CurrentBankAccountDTO extends Omit<BankAccountDTO, 'type' | 'interestRate'> {
  type: "CURRENT";
  overDraft: number; // Required for current accounts
}

export interface SavingBankAccountDTO extends Omit<BankAccountDTO, 'type' | 'overDraft'> {
  type: "SAVING";
  interestRate: number; // Required for saving accounts
}

export interface AccountOperationDTO {
  id?: number;
  operationDate: string;
  amount: number;
  description: string;
  type: string;
  accountId?: string;
  performedBy?: string;
}

export interface AccountHistoryDTO {
  accountId: string;
  balance: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  accountOperationDTOS: AccountOperationDTO[];
}

export interface CreditDTO {
  accountId: string;
  amount: number;
  description: string;
  userId: string;
}

export interface DebitDTO {
  accountId: string;
  amount: number;
  description: string;
  userId: string;
}

export interface TransferRequestDTO {
  accountIdSource: string;
  accountIdDestination: string;
  amount: number;
  userId: string;
}

export interface TransactionHistoryDTO {
  id: string;
  accountId: string;
  type: string;
  amount: number;
  date: string;
  performedBy: string;
}

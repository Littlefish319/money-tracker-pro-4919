export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note: string;
  createdAt: number;
}

export interface BudgetSettings {
  dailyLimit: number;
}
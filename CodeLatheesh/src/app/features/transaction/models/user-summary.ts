export interface UserSummary {
  totalIncome: number;
  totalExpense: number;
  totalInvestment: number;
  currentBalance:number;
  topExpenses: TransactionColl[];

}

export interface TransactionColl {
  id: string;
  name: string;
  amount: number;
  date:string;
}

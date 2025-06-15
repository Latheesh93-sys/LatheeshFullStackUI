export interface UserSummary {
    totalIncome: number;
  totalExpense: number;
  totalInvestment: number;
  topExpenses: CategoryColl[];

}

export interface CategoryColl {
  id: string;
  name: string;
  amount: number;
  date:string;
}

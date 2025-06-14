export interface EditCategoryRequest{
  name: string;
  userId: number;
  amount: number;
  date: string; // ISO format (e.g., '2025-06-07')
  paymentMethod: string; // e.g., 'Cash', 'Credit Card'
  type: string; // 'Income' or 'Expense'
}
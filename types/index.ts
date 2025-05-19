// Financial data types
export interface RevenueData {
  month: string;
  amount: number;
  department: string;
}

export interface ExpenseData {
  category: string;
  amount: number;
  department: string;
}

export interface ProfitMarginData {
  department: string;
  margin: number;
}

export interface FinancialData {
  revenue: RevenueData[];
  expenses: ExpenseData[];
  profitMargins: ProfitMarginData[];
}

// Form input types
export interface FinancialFormData {
  month: string;
  department: string;
  revenue: number;
  expenseCategory: string;
  expenseAmount: number;
}

// Filter types
export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

export interface DepartmentFilter {
  department: string;
}

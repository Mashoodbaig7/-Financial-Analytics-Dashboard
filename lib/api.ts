import { mockFinancialData } from './mockData';
import { FinancialData, DateRangeFilter, DepartmentFilter, FinancialFormData } from '../types';

// Simulate API call to get financial data
export const getFinancialData = async (): Promise<FinancialData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockFinancialData;
};

// Filter data by date range
export const filterByDateRange = (
  data: FinancialData,
  filter: DateRangeFilter
): FinancialData => {
  const { startDate, endDate } = filter;

  return {
    revenue: data.revenue.filter(
      item => item.month >= startDate && item.month <= endDate
    ),
    expenses: data.expenses, // Expenses don't have dates in our mock data
    profitMargins: data.profitMargins,
  };
};

// Filter data by department
export const filterByDepartment = (
  data: FinancialData,
  filter: DepartmentFilter
): FinancialData => {
  const { department } = filter;

  // If 'All' is selected, return all data
  if (department === 'All') {
    return data;
  }

  return {
    revenue: data.revenue.filter(item => item.department === department),
    expenses: data.expenses.filter(item => item.department === department),
    profitMargins: data.profitMargins.filter(item => item.department === department),
  };
};

// Add new financial data
export const addFinancialData = (
  data: FinancialData,
  formData: FinancialFormData
): FinancialData => {
  const { month, department, revenue, expenseCategory, expenseAmount } = formData;

  // Validate input data
  if (!month || !department || revenue <= 0 || !expenseCategory || expenseAmount <= 0) {
    throw new Error('Invalid form data');
  }

  // Add new revenue data
  const newRevenueData = [...data.revenue];

  // Check if there's already an entry for this month and department
  const existingRevenueIndex = newRevenueData.findIndex(
    item => item.month === month && item.department === department
  );

  if (existingRevenueIndex >= 0) {
    // Update existing entry
    newRevenueData[existingRevenueIndex].amount += revenue;
  } else {
    // Add new entry
    newRevenueData.push({
      month,
      amount: revenue,
      department,
    });
  }

  // Add new expense data
  const newExpenseData = [...data.expenses];

  // Check if there's already an entry for this category and department
  const existingExpenseIndex = newExpenseData.findIndex(
    item => item.category === expenseCategory && item.department === department
  );

  if (existingExpenseIndex >= 0) {
    // Update existing entry
    newExpenseData[existingExpenseIndex].amount += expenseAmount;
  } else {
    // Add new entry
    newExpenseData.push({
      category: expenseCategory,
      amount: expenseAmount,
      department,
    });
  }

  // Calculate new profit margin for the department
  const departmentRevenue = newRevenueData
    .filter(item => item.department === department)
    .reduce((sum, item) => sum + item.amount, 0);

  const departmentExpenses = newExpenseData
    .filter(item => item.department === department)
    .reduce((sum, item) => sum + item.amount, 0);

  // Avoid division by zero
  const newMargin = departmentRevenue > 0
    ? (departmentRevenue - departmentExpenses) / departmentRevenue
    : 0;

  // Update profit margin data
  const newProfitMarginData = [...data.profitMargins];
  const existingMarginIndex = newProfitMarginData.findIndex(
    item => item.department === department
  );

  if (existingMarginIndex >= 0) {
    newProfitMarginData[existingMarginIndex].margin = newMargin;
  } else {
    newProfitMarginData.push({
      department,
      margin: newMargin,
    });
  }

  // Simulate API delay
  return {
    revenue: newRevenueData,
    expenses: newExpenseData,
    profitMargins: newProfitMarginData,
  };
};

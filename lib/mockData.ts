import { FinancialData } from '../types';

// Mock financial data
export const mockFinancialData: FinancialData = {
  revenue: [
    { month: '2023-01', amount: 45000, department: 'Sales' },
    { month: '2023-02', amount: 52000, department: 'Sales' },
    { month: '2023-03', amount: 49000, department: 'Sales' },
    { month: '2023-04', amount: 58000, department: 'Sales' },
    { month: '2023-05', amount: 56000, department: 'Sales' },
    { month: '2023-06', amount: 62000, department: 'Sales' },
    { month: '2023-01', amount: 28000, department: 'Marketing' },
    { month: '2023-02', amount: 32000, department: 'Marketing' },
    { month: '2023-03', amount: 35000, department: 'Marketing' },
    { month: '2023-04', amount: 38000, department: 'Marketing' },
    { month: '2023-05', amount: 42000, department: 'Marketing' },
    { month: '2023-06', amount: 45000, department: 'Marketing' },
    { month: '2023-01', amount: 18000, department: 'HR' },
    { month: '2023-02', amount: 19000, department: 'HR' },
    { month: '2023-03', amount: 20000, department: 'HR' },
    { month: '2023-04', amount: 22000, department: 'HR' },
    { month: '2023-05', amount: 24000, department: 'HR' },
    { month: '2023-06', amount: 25000, department: 'HR' },
  ],
  expenses: [
    { category: 'Salaries', amount: 25000, department: 'Sales' },
    { category: 'Rent', amount: 5000, department: 'Sales' },
    { category: 'Utilities', amount: 2000, department: 'Sales' },
    { category: 'Marketing', amount: 8000, department: 'Sales' },
    { category: 'Salaries', amount: 18000, department: 'Marketing' },
    { category: 'Rent', amount: 3000, department: 'Marketing' },
    { category: 'Utilities', amount: 1500, department: 'Marketing' },
    { category: 'Advertising', amount: 12000, department: 'Marketing' },
    { category: 'Salaries', amount: 12000, department: 'HR' },
    { category: 'Rent', amount: 2000, department: 'HR' },
    { category: 'Utilities', amount: 1000, department: 'HR' },
    { category: 'Training', amount: 5000, department: 'HR' },
  ],
  profitMargins: [
    { department: 'Sales', margin: 0.32 },
    { department: 'Marketing', margin: 0.25 },
    { department: 'HR', margin: 0.18 },
    { department: 'IT', margin: 0.28 },
    { department: 'Operations', margin: 0.22 },
  ],
};

// List of all departments
export const departments = [
  'All',
  'Sales',
  'Marketing',
  'HR',
  'IT',
  'Operations',
];

// List of expense categories
export const expenseCategories = [
  'Salaries',
  'Rent',
  'Utilities',
  'Marketing',
  'Advertising',
  'Training',
  'Equipment',
  'Travel',
  'Other',
];

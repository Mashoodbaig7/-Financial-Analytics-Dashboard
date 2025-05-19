'use client';

import { useState, useMemo } from 'react';
import { RevenueData, ExpenseData, ProfitMarginData } from '../types';

interface DataTableProps {
  revenueData: RevenueData[];
  expenseData: ExpenseData[];
  profitMarginData: ProfitMarginData[];
}

type SortField = 'department' | 'revenue' | 'expenses' | 'margin' | 'profit';
type SortDirection = 'asc' | 'desc';

interface TableRow {
  department: string;
  revenue: number;
  expenses: number;
  margin: number;
  profit: number;
}

const DataTable: React.FC<DataTableProps> = ({
  revenueData,
  expenseData,
  profitMarginData,
}) => {
  const [sortField, setSortField] = useState<SortField>('department');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Process data for the table using useMemo to optimize performance
  const tableData = useMemo(() => {
    const departments = Array.from(
      new Set([
        ...revenueData.map(item => item.department),
        ...expenseData.map(item => item.department),
        ...profitMarginData.map(item => item.department),
      ])
    );

    // Calculate total revenue and expenses by department
    return departments.map(department => {
      const departmentRevenue = revenueData
        .filter(item => item.department === department)
        .reduce((sum, item) => sum + item.amount, 0);

      const departmentExpenses = expenseData
        .filter(item => item.department === department)
        .reduce((sum, item) => sum + item.amount, 0);

      const profitMargin = profitMarginData.find(
        item => item.department === department
      )?.margin || 0;

      const profit = departmentRevenue - departmentExpenses;

      return {
        department,
        revenue: departmentRevenue,
        expenses: departmentExpenses,
        margin: profitMargin,
        profit,
      };
    });
  }, [revenueData, expenseData, profitMarginData]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // Filter data based on search term
    const filtered = searchTerm
      ? tableData.filter(row =>
          row.department.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tableData;

    // Sort data
    return [...filtered].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  }, [tableData, searchTerm, sortField, sortDirection]);

  // Calculate totals
  const totals = useMemo(() => {
    return tableData.reduce(
      (acc, row) => {
        acc.revenue += row.revenue;
        acc.expenses += row.expenses;
        acc.profit += row.profit;
        return acc;
      },
      { revenue: 0, expenses: 0, profit: 0 }
    );
  }, [tableData]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;

    return (
      <span className="ml-1 inline-block">
        {sortDirection === 'asc' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
          </svg>
          Financial Data Table
        </h2>

        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('department')}
              >
                <div className="flex items-center">
                  Department
                  {renderSortIndicator('department')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('revenue')}
              >
                <div className="flex items-center">
                  Revenue
                  {renderSortIndicator('revenue')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('expenses')}
              >
                <div className="flex items-center">
                  Expenses
                  {renderSortIndicator('expenses')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('profit')}
              >
                <div className="flex items-center">
                  Profit
                  {renderSortIndicator('profit')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('margin')}
              >
                <div className="flex items-center">
                  Profit Margin
                  {renderSortIndicator('margin')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{row.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${row.revenue.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${row.expenses.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${row.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${row.profit.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${row.margin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {(row.margin * 100).toFixed(2)}%
                  </div>
                </td>
              </tr>
            ))}

            {/* Totals row */}
            <tr className="bg-gray-100 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${totals.revenue.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${totals.expenses.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={totals.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${totals.profit.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={totals.profit / totals.revenue >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {((totals.profit / totals.revenue) * 100).toFixed(2)}%
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {filteredAndSortedData.length} {filteredAndSortedData.length === 1 ? 'department' : 'departments'} found
        {searchTerm && ` matching "${searchTerm}"`}
      </div>
    </div>
  );
};

export default DataTable;

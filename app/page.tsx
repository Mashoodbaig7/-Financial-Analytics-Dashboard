'use client';

import { useState, useEffect, useRef } from 'react';
import RevenueChart from '../components/RevenueChart';
import ExpenseChart from '../components/ExpenseChart';
import ProfitMarginChart from '../components/ProfitMarginChart';
import DataTable from '../components/DataTable';
import FilterControls from '../components/FilterControls';
import DataInputForm from '../components/DataInputForm';
import { getFinancialData, filterByDateRange, filterByDepartment, addFinancialData } from '../lib/api';
import { FinancialData, DateRangeFilter, DepartmentFilter, FinancialFormData } from '../types';

export default function Home() {
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [filteredData, setFilteredData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initial date range (last 6 months)
  const today = new Date();
  const sixMonthsAgo = new Date(today);
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  const initialStartDate = sixMonthsAgo.toISOString().slice(0, 7); // YYYY-MM format
  const initialEndDate = today.toISOString().slice(0, 7); // YYYY-MM format

  // Use refs to keep track of current filter values
  const currentDateRangeRef = useRef<DateRangeFilter>({
    startDate: initialStartDate,
    endDate: initialEndDate,
  });

  // Fetch financial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFinancialData();
        setFinancialData(data);

        // Apply initial filters
        const dateFiltered = filterByDateRange(data, {
          startDate: initialStartDate,
          endDate: initialEndDate,
        });

        const departmentFiltered = filterByDepartment(dateFiltered, {
          department: 'All',
        });

        setFilteredData(departmentFiltered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply all current filters to data
  const applyFilters = (data: FinancialData) => {
    const dateFiltered = filterByDateRange(data, currentDateRangeRef.current);

    return filterByDepartment(dateFiltered, {
      department: selectedDepartment,
    });
  };

  // Handle date range filter
  const handleDateRangeChange = (filter: DateRangeFilter) => {
    if (!financialData) return;

    // Update the current date range ref
    currentDateRangeRef.current = filter;

    // Apply filters
    const filteredResult = applyFilters(financialData);
    setFilteredData(filteredResult);
  };

  // Handle department filter
  const handleDepartmentChange = (filter: DepartmentFilter) => {
    if (!financialData) return;

    setSelectedDepartment(filter.department);

    // Apply filters with the new department
    const filteredResult = filterByDepartment(
      filterByDateRange(financialData, currentDateRangeRef.current),
      filter
    );

    setFilteredData(filteredResult);
  };

  // Handle form submission
  const handleFormSubmit = (formData: FinancialFormData) => {
    if (!financialData) return;

    // Add new data
    const updatedData = addFinancialData(financialData, formData);
    setFinancialData(updatedData);

    // Apply current filters to updated data
    const filteredResult = applyFilters(updatedData);
    setFilteredData(filteredResult);
  };

  // Calculate summary statistics
  const calculateSummaryStats = () => {
    if (!filteredData) return { totalRevenue: 0, totalExpenses: 0, totalProfit: 0, avgMargin: 0 };

    const totalRevenue = filteredData.revenue.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = filteredData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalProfit = totalRevenue - totalExpenses;

    // Calculate average profit margin
    const avgMargin = filteredData.profitMargins.length > 0
      ? filteredData.profitMargins.reduce((sum, item) => sum + item.margin, 0) / filteredData.profitMargins.length
      : 0;

    return { totalRevenue, totalExpenses, totalProfit, avgMargin };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <div className="text-xl font-medium text-gray-700">Loading dashboard data...</div>
          <div className="text-sm text-gray-500">Please wait while we fetch your financial data</div>
        </div>
      </div>
    );
  }

  if (!filteredData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl bg-red-50 text-red-600 p-6 rounded-lg shadow-lg border border-red-200 max-w-md">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="font-bold text-xl">No Data Available</h3>
          </div>
          <p>We couldn't load your financial data. Please try refreshing the page or contact support if the problem persists.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full btn-primary"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const { totalRevenue, totalExpenses, totalProfit, avgMargin } = calculateSummaryStats();

  return (
    <div className="space-y-6">
      {/* Page header with tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-4 md:mb-0">
          Financial Analytics Dashboard
        </h1>

        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('add-data')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'add-data'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Add Data
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'reports'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Reports
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Revenue Card */}
        <div className="stat-card animate-fade-in">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary-500">${totalRevenue.toLocaleString()}</div>
          <div className="stat-desc">
            <span className="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              12% increase
            </span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="stat-card animate-fade-in delay-100">
          <div className="stat-title">Total Expenses</div>
          <div className="stat-value text-secondary-700">${totalExpenses.toLocaleString()}</div>
          <div className="stat-desc">
            <span className="text-red-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
              </svg>
              8% increase
            </span>
          </div>
        </div>

        {/* Total Profit Card */}
        <div className="stat-card animate-fade-in delay-200">
          <div className="stat-title">Total Profit</div>
          <div className={`stat-value ${totalProfit >= 0 ? 'text-success' : 'text-danger'}`}>
            ${totalProfit.toLocaleString()}
          </div>
          <div className="stat-desc">
            <span className="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              15% increase
            </span>
          </div>
        </div>

        {/* Average Margin Card */}
        <div className="stat-card animate-fade-in delay-300">
          <div className="stat-title">Average Margin</div>
          <div className="stat-value text-accent-500">{(avgMargin * 100).toFixed(2)}%</div>
          <div className="stat-desc">
            <span className="text-green-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
              </svg>
              3% increase
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === 'add-data' && (
          <div className="animate-fade-in">
            <DataInputForm onSubmit={handleFormSubmit} />
          </div>
        )}

        <FilterControls
          onDateRangeChange={handleDateRangeChange}
          onDepartmentChange={handleDepartmentChange}
          initialStartDate={initialStartDate}
          initialEndDate={initialEndDate}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dashboard-card animate-fade-in">
            <div className="card-header">
              <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Revenue Trends
              </h2>
              <div className="badge badge-primary">Monthly</div>
            </div>
            <div className="chart-container">
              <RevenueChart data={filteredData.revenue} />
            </div>
          </div>

          <div className="dashboard-card animate-fade-in delay-100">
            <div className="card-header">
              <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                Expense Breakdown
              </h2>
              <div className="badge badge-secondary">By Category</div>
            </div>
            <div className="chart-container">
              <ExpenseChart data={filteredData.expenses} department={selectedDepartment} />
            </div>
          </div>
        </div>

        <div className="dashboard-card animate-fade-in delay-200">
          <div className="card-header">
            <h2 className="card-title">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a1 1 0 10-2 0v6a1 1 0 102 0V7zm-3 2a1 1 0 10-2 0v4a1 1 0 102 0V9zm-3 3a1 1 0 10-2 0v1a1 1 0 102 0v-1z" clipRule="evenodd" />
              </svg>
              Profit Margins by Department
            </h2>
            <div className="badge badge-accent">Comparative</div>
          </div>
          <div className="chart-container">
            <ProfitMarginChart data={filteredData.profitMargins} />
          </div>
        </div>

        <div className="animate-fade-in delay-300">
          <DataTable
            revenueData={filteredData.revenue}
            expenseData={filteredData.expenses}
            profitMarginData={filteredData.profitMargins}
          />
        </div>
      </div>
    </div>
  );
}

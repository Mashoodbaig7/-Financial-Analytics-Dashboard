'use client';

import { useState } from 'react';
import { departments, expenseCategories } from '../lib/mockData';
import { FinancialFormData } from '../types';

interface DataInputFormProps {
  onSubmit: (formData: FinancialFormData) => void;
}

const DataInputForm: React.FC<DataInputFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FinancialFormData>({
    month: new Date().toISOString().slice(0, 7), // Current month in YYYY-MM format
    department: 'Sales',
    revenue: 0,
    expenseCategory: 'Salaries',
    expenseAmount: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.month) {
      newErrors.month = 'Month is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (formData.revenue <= 0) {
      newErrors.revenue = 'Revenue must be greater than 0';
    }

    if (!formData.expenseCategory) {
      newErrors.expenseCategory = 'Expense category is required';
    }

    if (formData.expenseAmount <= 0) {
      newErrors.expenseAmount = 'Expense amount must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'revenue' || name === 'expenseAmount' ? Number(value) : value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      onSubmit(formData);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      // Reset form
      setFormData({
        ...formData,
        revenue: 0,
        expenseAmount: 0,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Add Financial Data</h2>
        {showSuccess && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Data added successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>
            <input
              type="month"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.month
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary focus:ring-primary'
              }`}
              required
            />
            {errors.month && (
              <p className="mt-1 text-sm text-red-600">{errors.month}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.department
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary focus:ring-primary'
              }`}
              required
            >
              {departments.filter(dept => dept !== 'All').map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="revenue" className="block text-sm font-medium text-gray-700 mb-1">
              Revenue ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                min="0"
                className={`pl-7 mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                  errors.revenue
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                required
              />
            </div>
            {errors.revenue && (
              <p className="mt-1 text-sm text-red-600">{errors.revenue}</p>
            )}
          </div>

          <div>
            <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Expense Category
            </label>
            <select
              id="expenseCategory"
              name="expenseCategory"
              value={formData.expenseCategory}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.expenseCategory
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-primary focus:ring-primary'
              }`}
              required
            >
              {expenseCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.expenseCategory && (
              <p className="mt-1 text-sm text-red-600">{errors.expenseCategory}</p>
            )}
          </div>

          <div>
            <label htmlFor="expenseAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Expense Amount ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="expenseAmount"
                name="expenseAmount"
                value={formData.expenseAmount}
                onChange={handleChange}
                min="0"
                className={`pl-7 mt-1 block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 ${
                  errors.expenseAmount
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                }`}
                required
              />
            </div>
            {errors.expenseAmount && (
              <p className="mt-1 text-sm text-red-600">{errors.expenseAmount}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Financial Data
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataInputForm;

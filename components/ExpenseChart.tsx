'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { ExpenseData } from '../types';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseChartProps {
  data: ExpenseData[];
  department: string;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data, department }) => {
  // Filter data by department if not 'All'
  const filteredData = department === 'All'
    ? data
    : data.filter(item => item.department === department);

  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};

  filteredData.forEach(item => {
    if (expensesByCategory[item.category]) {
      expensesByCategory[item.category] += item.amount;
    } else {
      expensesByCategory[item.category] = item.amount;
    }
  });

  const categories = Object.keys(expensesByCategory);
  const amounts = Object.values(expensesByCategory);

  // Generate colors with better palette
  const backgroundColors = [
    'rgba(0, 112, 243, 0.8)',    // Primary blue
    'rgba(79, 70, 229, 0.8)',    // Accent purple
    'rgba(16, 185, 129, 0.8)',   // Green
    'rgba(245, 158, 11, 0.8)',   // Orange
    'rgba(239, 68, 68, 0.8)',    // Red
    'rgba(139, 92, 246, 0.8)',   // Purple
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(6, 182, 212, 0.8)',    // Cyan
    'rgba(132, 204, 22, 0.8)',   // Lime
  ];

  const borderColors = [
    'rgb(0, 112, 243)',
    'rgb(79, 70, 229)',
    'rgb(16, 185, 129)',
    'rgb(245, 158, 11)',
    'rgb(239, 68, 68)',
    'rgb(139, 92, 246)',
    'rgb(236, 72, 153)',
    'rgb(6, 182, 212)',
    'rgb(132, 204, 22)',
  ];

  const chartData: ChartData<'doughnut'> = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: backgroundColors.slice(0, categories.length),
        borderColor: borderColors.slice(0, categories.length),
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderWidth: 3,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  // Calculate total expenses
  const totalExpenses = amounts.reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="chart-container relative">
      <Doughnut data={chartData} options={options} />
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-sm text-gray-500">Total Expenses</div>
        <div className="text-xl font-bold text-gray-800">${totalExpenses.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default ExpenseChart;

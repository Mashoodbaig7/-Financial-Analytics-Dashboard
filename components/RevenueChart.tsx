'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
} from 'chart.js';
import { RevenueData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Process data for the chart
  const months = Array.from(new Set(data.map(item => item.month))).sort();

  // Group revenue by department
  const departments = Array.from(new Set(data.map(item => item.department)));

  const datasets = departments.map((department, index) => {
    const departmentData = months.map(month => {
      const entry = data.find(item => item.month === month && item.department === department);
      return entry ? entry.amount : 0;
    });

    // Generate a color based on index with better color palette
    const colors = [
      { border: 'rgb(0, 112, 243)', background: 'rgba(0, 112, 243, 0.1)' },
      { border: 'rgb(79, 70, 229)', background: 'rgba(79, 70, 229, 0.1)' },
      { border: 'rgb(16, 185, 129)', background: 'rgba(16, 185, 129, 0.1)' },
      { border: 'rgb(245, 158, 11)', background: 'rgba(245, 158, 11, 0.1)' },
      { border: 'rgb(239, 68, 68)', background: 'rgba(239, 68, 68, 0.1)' },
      { border: 'rgb(6, 182, 212)', background: 'rgba(6, 182, 212, 0.1)' },
    ];

    const colorSet = colors[index % colors.length];

    return {
      label: department,
      data: departmentData,
      borderColor: colorSet.border,
      backgroundColor: colorSet.background,
      borderWidth: 2,
      pointBackgroundColor: colorSet.border,
      pointBorderColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: colorSet.border,
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
      tension: 0.3,
      fill: true,
    };
  });

  const chartData: ChartData<'line'> = {
    labels: months.map(month => {
      const date = new Date(month);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }),
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
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
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        border: {
          dash: [4, 4],
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: 'Revenue ($)',
          font: {
            size: 12,
            weight: 400, // Using numeric value instead of string
          },
          padding: {
            bottom: 10,
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
    },
    elements: {
      line: {
        borderJoinStyle: 'round' as const,
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;

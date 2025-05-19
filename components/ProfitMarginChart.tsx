'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { ProfitMarginData } from '../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ProfitMarginChartProps {
  data: ProfitMarginData[];
}

const ProfitMarginChart: React.FC<ProfitMarginChartProps> = ({ data }) => {
  // Sort data by margin in descending order
  const sortedData = [...data].sort((a, b) => b.margin - a.margin);

  const departments = sortedData.map(item => item.department);
  const margins = sortedData.map(item => item.margin * 100); // Convert to percentage

  // Generate gradient colors based on margin values
  const backgroundColors = margins.map(margin => {
    if (margin >= 30) return 'rgba(16, 185, 129, 0.7)'; // High margin - Green
    if (margin >= 20) return 'rgba(0, 112, 243, 0.7)';  // Medium margin - Blue
    if (margin >= 10) return 'rgba(245, 158, 11, 0.7)'; // Low margin - Orange
    return 'rgba(239, 68, 68, 0.7)';                    // Very low margin - Red
  });

  const borderColors = margins.map(margin => {
    if (margin >= 30) return 'rgb(16, 185, 129)'; // High margin - Green
    if (margin >= 20) return 'rgb(0, 112, 243)';  // Medium margin - Blue
    if (margin >= 10) return 'rgb(245, 158, 11)'; // Low margin - Orange
    return 'rgb(239, 68, 68)';                    // Very low margin - Red
  });

  const chartData: ChartData<'bar'> = {
    labels: departments,
    datasets: [
      {
        label: 'Profit Margin',
        data: margins,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
        borderRadius: 6,
        hoverBackgroundColor: margins.map(margin => {
          if (margin >= 30) return 'rgba(16, 185, 129, 0.9)';
          if (margin >= 20) return 'rgba(0, 112, 243, 0.9)';
          if (margin >= 10) return 'rgba(245, 158, 11, 0.9)';
          return 'rgba(239, 68, 68, 0.9)';
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const, // Horizontal bar chart
    plugins: {
      legend: {
        display: false, // Hide legend since we're using color coding
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#1f2937',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context: any) {
            return `Profit Margin: ${context.parsed.x.toFixed(2)}%`;
          },
          labelColor: function(context: any) {
            const value = context.parsed.x;
            let backgroundColor;
            if (value >= 30) backgroundColor = 'rgba(16, 185, 129, 1)';
            else if (value >= 20) backgroundColor = 'rgba(0, 112, 243, 1)';
            else if (value >= 10) backgroundColor = 'rgba(245, 158, 11, 1)';
            else backgroundColor = 'rgba(239, 68, 68, 1)';

            return {
              backgroundColor,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 4,
            };
          }
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return value + '%';
          }
        },
        title: {
          display: true,
          text: 'Profit Margin (%)',
          font: {
            size: 12,
            weight: 'normal',
          },
          padding: {
            top: 10,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            weight: 'bold',
          },
        },
      },
    },
    animation: {
      duration: 1000,
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ProfitMarginChart;

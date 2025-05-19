# Financial Analytics Dashboard

![Financial Dashboard](https://i.ibb.co/Jt8MhQS/financial-dashboard-preview.png)

## 📊 Overview

A comprehensive, professional-grade financial analytics dashboard built with Next.js and TypeScript. This interactive application provides real-time visualization of financial data, enabling users to analyze revenue trends, expense breakdowns, and profit margins across different departments and time periods.

Designed for financial analysts, business managers, and executives who need quick access to financial insights through an intuitive and visually appealing interface.

## ✨ Key Features

### 📈 Advanced Data Visualizations
- **Revenue Trends**: Interactive line chart showing revenue over time with multi-department comparison
- **Expense Breakdown**: Dynamic doughnut chart displaying expense distribution by category
- **Profit Margins**: Horizontal bar chart illustrating profit margins by department with color-coded performance indicators
- **Comprehensive Data Table**: Sortable and filterable table with detailed financial metrics

### 💼 Data Management System
- **Intuitive Data Entry**: User-friendly form for adding new financial data
- **Real-time Validation**: Input validation with immediate feedback
- **Instant Updates**: All charts and visualizations update automatically when new data is added
- **Data Processing**: Automatic calculation of profit margins and other derived metrics

### 🔍 Advanced Filtering Capabilities
- **Date Range Selection**: Filter data by specific time periods
- **Department Filtering**: Focus analysis on particular business units
- **Search Functionality**: Quickly find specific departments or data points
- **Dynamic Filtering**: All visualizations respond instantly to filter changes

### 🎨 Professional UI/UX Design
- **Modern Interface**: Clean, professional design with intuitive navigation
- **Responsive Layout**: Optimized for all devices from mobile to large desktop displays
- **Interactive Elements**: Animated transitions, hover effects, and tooltips
- **Performance Indicators**: Color-coded metrics to quickly identify positive/negative trends
- **Accessibility**: Designed with accessibility considerations for all users

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety and improved developer experience
- **Data Visualization**: Chart.js with react-chartjs-2 for interactive, responsive charts
- **Styling**: Tailwind CSS for utility-first styling and responsive design
- **State Management**: React Hooks for efficient state management
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Animations**: CSS transitions and keyframes for smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm installed on your system
- Basic knowledge of React and TypeScript (for customization)

### Installation

#### Option 1: Quick Start
Run the start script to automatically install dependencies and start the development server:

```bash
start.bat
```

#### Option 2: Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/Mashoodbaig7/-Financial-Analytics-Dashboard.git
cd Financial-Analytics-Dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📖 User Guide

### Dashboard Navigation

The dashboard is organized into several key sections:

1. **Top Navigation Bar**: Contains the dashboard title, search functionality, and user profile
2. **Sidebar**: Provides navigation to different sections of the dashboard
3. **Summary Cards**: Display key financial metrics at a glance
4. **Charts Section**: Contains the main data visualizations
5. **Data Table**: Provides detailed financial data in tabular format

### Step-by-Step Usage Instructions

#### Adding New Financial Data

1. Navigate to the "Add Data" tab in the dashboard
2. Fill in the following information:
   - **Month**: Select the month for the new data entry
   - **Department**: Choose the relevant department
   - **Revenue**: Enter the revenue amount in dollars
   - **Expense Category**: Select the type of expense
   - **Expense Amount**: Enter the expense amount in dollars
3. Click "Add Financial Data" to submit
4. The dashboard will automatically update all charts and tables with the new data

#### Filtering and Analyzing Data

1. Use the filter controls section to refine the displayed data:
   - **Date Range**: Select start and end dates to focus on a specific time period
   - **Department**: Choose a specific department or "All" to view all departments
2. The dashboard will dynamically update to show only the filtered data
3. Use the tabs at the top to switch between different dashboard views

#### Working with the Data Table

1. Click any column header to sort the table by that column
   - Click again to reverse the sort order
2. Use the search box above the table to filter by department name
3. View the totals row at the bottom for summary statistics
4. Each row shows:
   - Department name
   - Total revenue
   - Total expenses
   - Profit amount
   - Profit margin percentage

## 🏗️ Project Structure

```
financial-dashboard/
├── app/                  # Next.js app router pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main dashboard page
├── components/           # React components
│   ├── DataInputForm.tsx # Form for adding new data
│   ├── DataTable.tsx     # Interactive data table
│   ├── ExpenseChart.tsx  # Expense breakdown chart
│   ├── FilterControls.tsx# Date and department filters
│   ├── Header.tsx        # Dashboard header component
│   ├── ProfitMarginChart.tsx # Profit margin chart
│   ├── RevenueChart.tsx  # Revenue trend chart
│   └── Sidebar.tsx       # Navigation sidebar
├── lib/                  # Utility functions and data
│   ├── api.ts            # Mock API functions
│   └── mockData.ts       # Sample financial data
├── types/                # TypeScript type definitions
│   └── index.ts          # Type definitions for data
├── public/               # Static assets
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── start.bat             # Quick start script
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📊 Data Model

The dashboard uses the following data model:

### Revenue Data
```typescript
interface RevenueData {
  month: string;        // Format: YYYY-MM
  amount: number;       // Revenue amount in dollars
  department: string;   // Department name
}
```

### Expense Data
```typescript
interface ExpenseData {
  category: string;     // Expense category (e.g., Salaries, Rent)
  amount: number;       // Expense amount in dollars
  department: string;   // Department name
}
```

### Profit Margin Data
```typescript
interface ProfitMarginData {
  department: string;   // Department name
  margin: number;       // Profit margin as a decimal (e.g., 0.25 = 25%)
}
```

## 🔄 API Integration

The dashboard is designed to be easily connected to a real API:

1. The mock API functions in `lib/api.ts` simulate:
   - Fetching financial data
   - Filtering data by date range and department
   - Adding new financial data

2. To connect to a real API:
   - Replace the mock API functions with actual API calls
   - Ensure the API returns data in the same format as the mock data
   - Update the data processing functions as needed

## 📱 Responsive Design

The dashboard is fully responsive and optimized for different screen sizes:

- **Large Desktop (1200px+)**: Full layout with side-by-side charts and expanded sidebar
- **Desktop (992px-1199px)**: Optimized spacing with all charts visible
- **Tablet (768px-991px)**: Adjusted layout with stacked charts and collapsible sidebar
- **Mobile (< 768px)**: Fully stacked layout with hidden sidebar and simplified controls

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project:

1. Fork the repository
2. Create a new branch for your feature
3. Add your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or feedback, please contact:
- Email: [your-email@example.com]
- GitHub: [Mashoodbaig7](https://github.com/Mashoodbaig7)

---

Developed with ❤️ by [Your Name]

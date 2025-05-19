# Financial Analytics Dashboard

A professional, responsive financial analytics dashboard built with Next.js and TypeScript. This dashboard provides interactive visualizations of financial data, allowing users to analyze revenue, expenses, and profit margins across different departments.

![Financial Dashboard](https://via.placeholder.com/1200x600/0070f3/ffffff?text=Financial+Dashboard)

## Features

- **Interactive Data Visualizations**:
  - Line Chart showing revenue trends over time
  - Pie Chart displaying expense breakdown by category
  - Bar Chart illustrating profit margins by department
  - Comprehensive data table with sorting and filtering capabilities

- **Data Management**:
  - Add new financial data through an intuitive form
  - Data is automatically validated and processed
  - Real-time updates to all charts and tables

- **Advanced Filtering**:
  - Date range filter to analyze specific time periods
  - Department filter to focus on particular business units
  - Search functionality in the data table

- **Professional UI/UX**:
  - Clean, modern interface with intuitive controls
  - Responsive design that works on all devices
  - Animated transitions and loading states
  - Color-coded profit/loss indicators

## Technologies Used

- **Next.js 14** - React framework with app router
- **TypeScript** - For type safety and better developer experience
- **Chart.js with react-chartjs-2** - For interactive data visualizations
- **Tailwind CSS** - For responsive, utility-first styling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Quick Start

1. Run the start script:

```bash
start.bat
```

Or manually:

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## How to Use the Dashboard

### Adding Financial Data

1. Use the "Add Financial Data" form at the top of the dashboard
2. Select the month, department, and enter revenue amount
3. Choose an expense category and enter the expense amount
4. Click "Add Financial Data" to submit
5. The charts and table will automatically update with the new data

### Filtering Data

1. Use the date range pickers to select a specific time period
2. Select a department from the dropdown to focus on a specific business unit
3. The dashboard will dynamically update to show only the selected data

### Using the Data Table

1. Click on column headers to sort the data
2. Use the search box to filter departments
3. View totals at the bottom of the table

## Project Structure

- `/app` - Next.js app router pages and global styles
- `/components` - React components for charts, tables, and forms
- `/lib` - Utility functions and mock API implementation
- `/types` - TypeScript type definitions
- `/public` - Static assets

## Mock Data & API Integration

The dashboard currently uses mock data to simulate API responses. The data structure and API functions are designed to be easily replaced with real API calls in the future:

1. The mock data is stored in `lib/mockData.ts`
2. API functions in `lib/api.ts` simulate fetching and processing data
3. To connect to a real API, simply replace these functions with actual API calls

## Responsive Design

The dashboard is fully responsive and works on all screen sizes:

- **Desktop**: Full layout with side-by-side charts
- **Tablet**: Adjusted spacing and layout for medium screens
- **Mobile**: Stacked layout with optimized controls for touch interaction
"# -Financial-Analytics-Dashboard" 

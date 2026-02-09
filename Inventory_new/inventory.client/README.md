# Inventory Management System - Frontend

This is a professional frontend application for the inventory management system built with React and Vite.

## Project Structure

```
src/
├── components/                 # React components
│   ├── Dashboard/             # Dashboard component
│   ├── Items/                 # Items management
│   ├── Purchases/             # Purchase management
│   ├── Sales/                 # Sales management
│   ├── Inventory/             # Inventory management
│   ├── Accounting/            # Accounting module
│   ├── Reports/               # Reports module
│   ├── Settings/              # Settings module
│   └── Layout.jsx             # Main layout component
├── services/                  # API services
│   └── apiService.js          # API service functions
├── utils/                     # Utility functions
│   ├── helpers.js             # Helper functions
│   └── constants.js           # Application constants
├── contexts/                  # React contexts
│   └── AppContext.js          # Application state context
├── hooks/                     # Custom React hooks
├── styles/                    # CSS styles
├── assets/                    # Static assets
│   ├── images/                # Image files
│   ├── icons/                 # Icon files
│   └── css/                   # Additional CSS files
├── App.jsx                    # Main application component
├── App.css                    # Main stylesheet
└── main.jsx                   # Entry point
```

## Features

- **Dashboard**: Overview of key metrics and recent activities
- **Items Management**: CRUD operations for inventory items
- **Purchase Management**: Handle purchase orders and transactions
- **Sales Management**: Manage sales orders and invoices
- **Inventory Tracking**: Real-time inventory tracking and adjustments
- **Accounting Module**: Financial transactions and ledger management
- **Reporting**: Comprehensive reports and analytics
- **Settings**: Application configuration and preferences

## Installation

1. Make sure you have Node.js installed
2. Navigate to the client directory:
```bash
cd d:\G7\Project\Inventory\InventoryNew\Inventory\inventory.client
```
3. Install dependencies:
```bash
npm install
```
4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root of the client directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_TITLE=Inventory Management System
```

## API Integration

The application is designed to work with the backend API. Update the `API_BASE_URL` in `src/services/apiService.js` to match your backend server.

## Key Constants

The application uses various constants defined in `src/utils/constants.js` including:
- Entity types (items, purchases, sales, etc.)
- Form types (SA, PU, SR, PR, etc.)
- Bill types (Cash, Credit, Card, UPI)
- Transaction types
- User roles and permissions
- Validation messages
- Default settings

## State Management

The application uses React Context for state management through the `AppContext`. This provides global state for:
- Authentication state
- Theme settings
- Notifications
- Loading states
- Data caches for items, purchases, sales, etc.

## Styling

The application uses a comprehensive CSS framework with responsive design. Key styles are defined in `App.css` with additional component-specific styles as needed.

## Best Practices Implemented

- Component-based architecture
- Proper state management
- API service abstraction
- Input validation and error handling
- Responsive design
- Performance optimization
- Clean, maintainable code structure
- Consistent naming conventions

## Dummy Data Generation

The system includes comprehensive dummy data generation capabilities for testing and demonstration purposes. The data structure follows the database schema from the backend, ensuring consistency across the full-stack application.

## Development Guidelines

- Use descriptive component names
- Follow consistent naming conventions
- Write reusable and modular components
- Implement proper error handling
- Use TypeScript for better type safety (optional enhancement)
- Write unit tests for critical components
- Follow accessibility best practices

## Deployment

To build the application for production:

```bash
npm run build
```

The production-ready files will be in the `dist` folder.
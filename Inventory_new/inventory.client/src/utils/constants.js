// Constants for Inventory Management System

// Application Constants
export const APP_NAME = 'Inventory Management System';
export const APP_VERSION = '1.0.0';
export const COMPANY_NAME = 'Inventory Solutions Inc.';

// API Response Status Codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Entity Types
export const ENTITY_TYPES = {
  ITEM: 'item',
  PURCHASE: 'purchase',
  SALE: 'sale',
  INVENTORY: 'inventory',
  ACCOUNT: 'account',
  CUSTOMER: 'customer',
  SUPPLIER: 'supplier',
  USER: 'user',
};

// Form Types (based on database schema)
export const FORM_TYPES = {
  SALES: 'SA',
  PURCHASE: 'PU',
  SALES_RETURN: 'SR',
  PURCHASE_RETURN: 'PR',
  INVENTORY_ADJUSTMENT: 'IA',
  OPENING_STOCK: 'OS',
  PRODUCTION: 'PD',
};

// Bill Types
export const BILL_TYPES = {
  CASH: 'Cash',
  CREDIT: 'Credit',
  CARD: 'Card',
  UPI: 'UPI',
};

// Transaction Types
export const TRANSACTION_TYPES = {
  SALES: 'SA',
  PURCHASE: 'PU',
  SALES_RETURN: 'SR',
  PURCHASE_RETURN: 'PR',
  INVENTORY_TRANSFER: 'TR',
  INVENTORY_ADJUSTMENT: 'AD',
  OPENING_STOCK: 'OS',
  PRODUCTION: 'PD',
};

// Inventory Adjustment Types
export const ADJUSTMENT_TYPES = {
  DAMAGE: 'damage',
  THEFT: 'theft',
  EXPIRY: 'expiry',
  CORRECTION: 'correction',
  TRANSFER: 'transfer',
};

// Stock Calculation Methods
export const STOCK_CALCULATION_METHODS = {
  FIFO: 'FIFO',
  LIFO: 'LIFO',
  AVERAGE: 'Average Cost',
  SPECIFIC: 'Specific Identification',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  ACCOUNTANT: 'accountant',
  VIEW_ONLY: 'view_only',
};

// Permissions
export const PERMISSIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  EXPORT: 'export',
  IMPORT: 'import',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// Pagination
export const PAGINATION = {
  DEFAULT_SIZE: 10,
  SMALL_SIZE: 5,
  LARGE_SIZE: 50,
  MAX_SIZE: 100,
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  MIN_LENGTH: (min) => `Minimum length is ${min} characters`,
  MAX_LENGTH: (max) => `Maximum length is ${max} characters`,
  INVALID_NUMBER: 'Please enter a valid number',
  POSITIVE_NUMBER: 'Number must be positive',
  GREATER_THAN_ZERO: 'Value must be greater than zero',
};

// Default Values
export const DEFAULT_VALUES = {
  CURRENCY: 'USD',
  DATE_FORMAT: 'MM/DD/YYYY',
  TIME_FORMAT: 'HH:mm',
  DECIMAL_PLACES: 2,
  TAX_RATE: 0.0,
  DISCOUNT_RATE: 0.0,
};

// Colors
export const COLORS = {
  PRIMARY: '#667eea',
  SECONDARY: '#6c757d',
  SUCCESS: '#28a745',
  DANGER: '#dc3545',
  WARNING: '#ffc107',
  INFO: '#17a2b8',
  LIGHT: '#f8f9fa',
  DARK: '#343a40',
};

// Status
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  RETURNED: 'returned',
};

// Sort Directions
export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

// Common Fields
export const COMMON_FIELDS = {
  ID: 'id',
  NAME: 'name',
  CODE: 'code',
  DESCRIPTION: 'description',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  STATUS: 'status',
  CREATED_BY: 'createdBy',
  UPDATED_BY: 'updatedBy',
};

// Item Categories (based on database schema)
export const ITEM_CATEGORIES = {
  RAW_MATERIAL: 1,
  FINISHED_GOODS: 2,
  CONSUMABLES: 3,
  EQUIPMENT: 4,
  OTHERS: 5,
};

// Item Types
export const ITEM_TYPES = {
  PRODUCT: 1,
  SERVICE: 2,
  BOTH: 3,
};

// Report Types
export const REPORT_TYPES = {
  SALES: 'sales_report',
  PURCHASE: 'purchase_report',
  INVENTORY: 'inventory_report',
  PROFIT_LOSS: 'profit_loss',
  BALANCE_SHEET: 'balance_sheet',
  TRIAL_BALANCE: 'trial_balance',
  CUSTOMER_AGING: 'customer_aging',
  SUPPLIER_AGING: 'supplier_aging',
  STOCK_LEDGER: 'stock_ledger',
  STOCK_SUMMARY: 'stock_summary',
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_INFO: 'user_info',
  SETTINGS: 'app_settings',
  THEME: 'theme',
  LANGUAGE: 'language',
  LAST_LOGIN: 'last_login',
  REMEMBER_ME: 'remember_me',
};

// Event Types
export const EVENT_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
  EXPORT: 'export',
  IMPORT: 'import',
};

// Default Settings
export const DEFAULT_SETTINGS = {
  theme: 'light',
  language: 'en',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'hh:mm a',
  currency: 'USD',
  showNotifications: true,
  autoBackup: true,
  backupFrequency: 'daily',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  SERVER_ERROR: 'Server error occurred. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access. Please log in again.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Validation failed. Please check your inputs.',
  TIMEOUT: 'Request timed out. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Data saved successfully!',
  DELETE_SUCCESS: 'Data deleted successfully!',
  UPDATE_SUCCESS: 'Data updated successfully!',
  CREATE_SUCCESS: 'Data created successfully!',
  IMPORT_SUCCESS: 'Data imported successfully!',
  EXPORT_SUCCESS: 'Data exported successfully!',
};

export default {
  APP_NAME,
  APP_VERSION,
  COMPANY_NAME,
  API_STATUS,
  ENTITY_TYPES,
  FORM_TYPES,
  BILL_TYPES,
  TRANSACTION_TYPES,
  ADJUSTMENT_TYPES,
  STOCK_CALCULATION_METHODS,
  USER_ROLES,
  PERMISSIONS,
  NOTIFICATION_TYPES,
  PAGINATION,
  VALIDATION_MESSAGES,
  DEFAULT_VALUES,
  COLORS,
  STATUS,
  SORT_DIRECTION,
  COMMON_FIELDS,
  ITEM_CATEGORIES,
  ITEM_TYPES,
  REPORT_TYPES,
  STORAGE_KEYS,
  EVENT_TYPES,
  DEFAULT_SETTINGS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
};
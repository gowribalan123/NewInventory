// Utility functions for Inventory Management System

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format date with time
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate phone number
export const validatePhone = (phone) => {
  const re = /^[\+]?[1-9][\d]{0,15}$/;
  return re.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Capitalize first letter of string
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Convert to title case
export const toTitleCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

// Calculate percentage
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return ((part / total) * 100).toFixed(2);
};

// Check if value is numeric
export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Format number with commas
export const formatNumber = (num) => {
  if (!num && num !== 0) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Get query parameter from URL
export const getUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

// Set query parameter in URL
export const setUrlParameter = (name, value) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(name, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

// Remove query parameter from URL
export const removeUrlParameter = (name) => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(name);
  window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
};

// Check if object is empty
export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

// Check if array is empty
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

// Generate random color
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Wait for specified time (async)
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Export utilities object
export default {
  formatCurrency,
  formatDate,
  formatDateTime,
  generateId,
  validateEmail,
  validatePhone,
  debounce,
  capitalize,
  toTitleCase,
  calculatePercentage,
  isNumeric,
  formatNumber,
  deepClone,
  getUrlParameter,
  setUrlParameter,
  removeUrlParameter,
  isEmptyObject,
  isEmptyArray,
  getInitials,
  getRandomColor,
  sleep,
};
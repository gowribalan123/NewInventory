// API Service for Inventory Management System
const API_BASE_URL = 'https://localhost:5001/api'; // Update with your actual backend URL

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Item API Services
export const itemService = {
  getAll: () => apiRequest('/items'),
  getById: (id) => apiRequest(`/items/${id}`),
  create: (itemData) => apiRequest('/items', {
    method: 'POST',
    body: JSON.stringify(itemData),
  }),
  update: (id, itemData) => apiRequest(`/items/${id}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  }),
  delete: (id) => apiRequest(`/items/${id}`, {
    method: 'DELETE',
  }),
};

// Purchase API Services
export const purchaseService = {
  getAll: () => apiRequest('/purchases'),
  getById: (id) => apiRequest(`/purchases/${id}`),
  create: (purchaseData) => apiRequest('/purchases', {
    method: 'POST',
    body: JSON.stringify(purchaseData),
  }),
  update: (id, purchaseData) => apiRequest(`/purchases/${id}`, {
    method: 'PUT',
    body: JSON.stringify(purchaseData),
  }),
  delete: (id) => apiRequest(`/purchases/${id}`, {
    method: 'DELETE',
  }),
};

// Sales API Services
export const salesService = {
  getAll: () => apiRequest('/sales'),
  getById: (id) => apiRequest(`/sales/${id}`),
  create: (salesData) => apiRequest('/sales', {
    method: 'POST',
    body: JSON.stringify(salesData),
  }),
  update: (id, salesData) => apiRequest(`/sales/${id}`, {
    method: 'PUT',
    body: JSON.stringify(salesData),
  }),
  delete: (id) => apiRequest(`/sales/${id}`, {
    method: 'DELETE',
  }),
};

// Inventory API Services
export const inventoryService = {
  getAll: () => apiRequest('/inventory'),
  getById: (id) => apiRequest(`/inventory/${id}`),
  create: (inventoryData) => apiRequest('/inventory', {
    method: 'POST',
    body: JSON.stringify(inventoryData),
  }),
  update: (id, inventoryData) => apiRequest(`/inventory/${id}`, {
    method: 'PUT',
    body: JSON.stringify(inventoryData),
  }),
  delete: (id) => apiRequest(`/inventory/${id}`, {
    method: 'DELETE',
  }),
};

// Account API Services
export const accountService = {
  getAll: () => apiRequest('/accounts'),
  getById: (id) => apiRequest(`/accounts/${id}`),
  create: (accountData) => apiRequest('/accounts', {
    method: 'POST',
    body: JSON.stringify(accountData),
  }),
  update: (id, accountData) => apiRequest(`/accounts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(accountData),
  }),
  delete: (id) => apiRequest(`/accounts/${id}`, {
    method: 'DELETE',
  }),
};

export default {
  itemService,
  purchaseService,
  salesService,
  inventoryService,
  accountService,
};
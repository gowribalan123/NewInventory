import React, { createContext, useContext, useReducer } from 'react';

// Initial state for the application
const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  notifications: [],
  loading: false,
  error: null,
  sidebarCollapsed: false,
  // Data caches
  items: [],
  purchases: [],
  sales: [],
  inventory: [],
  accounts: [],
  categories: [],
  units: [],
  suppliers: [],
  customers: [],
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_THEME: 'SET_THEME',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  // Data actions
  SET_ITEMS: 'SET_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  SET_PURCHASES: 'SET_PURCHASES',
  ADD_PURCHASE: 'ADD_PURCHASE',
  UPDATE_PURCHASE: 'UPDATE_PURCHASE',
  DELETE_PURCHASE: 'DELETE_PURCHASE',
  SET_SALES: 'SET_SALES',
  ADD_SALE: 'ADD_SALE',
  UPDATE_SALE: 'UPDATE_SALE',
  DELETE_SALE: 'DELETE_SALE',
  SET_INVENTORY: 'SET_INVENTORY',
  ADD_INVENTORY: 'ADD_INVENTORY',
  UPDATE_INVENTORY: 'UPDATE_INVENTORY',
  DELETE_INVENTORY: 'DELETE_INVENTORY',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_UNITS: 'SET_UNITS',
  SET_SUPPLIERS: 'SET_SUPPLIERS',
  SET_CUSTOMERS: 'SET_CUSTOMERS',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };

    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        error: null,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case ActionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }],
      };

    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };

    // Items actions
    case ActionTypes.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case ActionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case ActionTypes.UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    // Purchases actions
    case ActionTypes.SET_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };

    case ActionTypes.ADD_PURCHASE:
      return {
        ...state,
        purchases: [...state.purchases, action.payload],
      };

    case ActionTypes.UPDATE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.map(purchase => 
          purchase.id === action.payload.id ? action.payload : purchase
        ),
      };

    case ActionTypes.DELETE_PURCHASE:
      return {
        ...state,
        purchases: state.purchases.filter(purchase => purchase.id !== action.payload),
      };

    // Sales actions
    case ActionTypes.SET_SALES:
      return {
        ...state,
        sales: action.payload,
      };

    case ActionTypes.ADD_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload],
      };

    case ActionTypes.UPDATE_SALE:
      return {
        ...state,
        sales: state.sales.map(sale => 
          sale.id === action.payload.id ? action.payload : sale
        ),
      };

    case ActionTypes.DELETE_SALE:
      return {
        ...state,
        sales: state.sales.filter(sale => sale.id !== action.payload),
      };

    // Inventory actions
    case ActionTypes.SET_INVENTORY:
      return {
        ...state,
        inventory: action.payload,
      };

    case ActionTypes.ADD_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };

    case ActionTypes.UPDATE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.map(inv => 
          inv.id === action.payload.id ? action.payload : inv
        ),
      };

    case ActionTypes.DELETE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.filter(inv => inv.id !== action.payload),
      };

    // Accounts actions
    case ActionTypes.SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };

    case ActionTypes.ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };

    case ActionTypes.UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map(acc => 
          acc.id === action.payload.id ? action.payload : acc
        ),
      };

    case ActionTypes.DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(acc => acc.id !== action.payload),
      };

    // Other data actions
    case ActionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case ActionTypes.SET_UNITS:
      return {
        ...state,
        units: action.payload,
      };

    case ActionTypes.SET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload,
      };

    case ActionTypes.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setUser = (user) => {
    dispatch({ type: ActionTypes.SET_USER, payload: user });
  };

  const login = (userData) => {
    dispatch({ type: ActionTypes.LOGIN, payload: { user: userData } });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const setTheme = (theme) => {
    dispatch({ type: ActionTypes.SET_THEME, payload: theme });
  };

  const addNotification = (notification) => {
    dispatch({ type: ActionTypes.ADD_NOTIFICATION, payload: notification });
  };

  const removeNotification = (id) => {
    dispatch({ type: ActionTypes.REMOVE_NOTIFICATION, payload: id });
  };

  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error });
  };

  const toggleSidebar = () => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  };

  // Data action creators
  const setItems = (items) => {
    dispatch({ type: ActionTypes.SET_ITEMS, payload: items });
  };

  const addItem = (item) => {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: item });
  };

  const updateItem = (item) => {
    dispatch({ type: ActionTypes.UPDATE_ITEM, payload: item });
  };

  const deleteItem = (id) => {
    dispatch({ type: ActionTypes.DELETE_ITEM, payload: id });
  };

  // Similar actions for other entities...

  const value = {
    state,
    actions: {
      setUser,
      login,
      logout,
      setTheme,
      addNotification,
      removeNotification,
      setLoading,
      setError,
      toggleSidebar,
      // Data actions
      setItems,
      addItem,
      updateItem,
      deleteItem,
      // Add other actions as needed
    },
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
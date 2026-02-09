// Dummy Data Generator for Inventory Management System

// Generate sample items
export const generateDummyItems = (count = 50) => {
  const categories = ['Electronics', 'Furniture', 'Stationery', 'Clothing', 'Books', 'Hardware', 'Software', 'Food'];
  const companies = ['TechCorp', 'GlobalSupply', 'QualityItems', 'FastTrade', 'ReliableGoods', 'PremiumProducts'];
  const units = ['Piece', 'Pack', 'Box', 'Kilogram', 'Liter', 'Meter', 'Pair'];

  const items = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    const unit = units[Math.floor(Math.random() * units.length)];
    
    const purchaseRate = parseFloat((Math.random() * 100 + 10).toFixed(2));
    const salesRate = parseFloat((purchaseRate * (1 + Math.random() * 0.5)).toFixed(2));
    const mrp = parseFloat((salesRate * (1 + Math.random() * 0.2)).toFixed(2));
    
    items.push({
      itemId: i,
      itemCode: `IT-${new Date().getFullYear()}-${String(i).padStart(4, '0')}`,
      itemName: `${category} ${Math.floor(Math.random() * 1000) + 1}`,
      categoryId: Math.floor(Math.random() * categories.length) + 1,
      categoryName: category,
      salesRate: salesRate,
      purchaseRate: purchaseRate,
      reorderLevel: Math.floor(Math.random() * 10) + 5,
      minimumLevel: Math.floor(Math.random() * 3) + 1,
      defaultSalesUnit: Math.floor(Math.random() * units.length) + 1,
      unitName: unit,
      stockType: true,
      itemType: Math.floor(Math.random() * 2) + 1, // 1: Product, 2: Service
      margin: parseFloat(((salesRate - purchaseRate) / purchaseRate * 100).toFixed(2)),
      mrp: mrp,
      company: company,
      stockQuantity: Math.floor(Math.random() * 200) + 10,
      createdDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedDate: new Date().toISOString(),
    });
  }
  return items;
};

// Generate sample purchases
export const generateDummyPurchases = (count = 30) => {
  const purchaseTypes = ['Raw Material', 'Finished Goods', 'Consumables', 'Equipment'];
  const billTypes = ['Cash', 'Credit'];
  
  const purchases = [];
  for (let i = 1; i <= count; i++) {
    const purchaseDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const netAmount = parseFloat((Math.random() * 5000 + 500).toFixed(2));
    const taxAmount = parseFloat((netAmount * 0.18).toFixed(2)); // 18% tax
    const totalAmount = netAmount + taxAmount;
    
    purchases.push({
      purchaseId: i,
      purchaseNo: `PU-${new Date().getFullYear()}-${String(i).padStart(4, '0')}`,
      purchaseDate: purchaseDate.toISOString(),
      invoiceNo: `INV-${String(i).padStart(6, '0')}`,
      invoiceDate: purchaseDate.toISOString(),
      partyId: Math.floor(Math.random() * 20) + 1,
      partyName: `Supplier ${Math.floor(Math.random() * 20) + 1}`,
      purchaseType: purchaseTypes[Math.floor(Math.random() * purchaseTypes.length)],
      billType: billTypes[Math.floor(Math.random() * billTypes.length)],
      totalAmount: totalAmount,
      netAmount: netAmount,
      taxAmount: taxAmount,
      discount: parseFloat((Math.random() * 100).toFixed(2)),
      freight: parseFloat((Math.random() * 50).toFixed(2)),
      grandTotal: totalAmount,
      userId: 1,
      userDate: new Date().toISOString(),
      financialYearId: 2026,
      isEstimate: false,
      cancelFlag: false,
      createdDate: new Date().toISOString(),
    });
  }
  return purchases;
};

// Generate sample sales
export const generateDummySales = (count = 40) => {
  const billTypes = ['Cash', 'Credit'];
  const salesTypes = ['Retail', 'Wholesale', 'Export', 'Direct'];
  
  const sales = [];
  for (let i = 1; i <= count; i++) {
    const salesDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const netAmount = parseFloat((Math.random() * 3000 + 200).toFixed(2));
    const taxAmount = parseFloat((netAmount * 0.18).toFixed(2)); // 18% tax
    const totalAmount = netAmount + taxAmount;
    
    sales.push({
      salesId: i,
      salesCode: `SA-${new Date().getFullYear()}-${String(i).padStart(4, '0')}`,
      salesDate: salesDate.toISOString(),
      partyId: Math.floor(Math.random() * 30) + 1,
      partyName: `Customer ${Math.floor(Math.random() * 30) + 1}`,
      billType: billTypes[Math.floor(Math.random() * billTypes.length)],
      salesType: salesTypes[Math.floor(Math.random() * salesTypes.length)],
      totalAmount: totalAmount,
      netAmount: netAmount,
      taxAmount: taxAmount,
      discount: parseFloat((Math.random() * 50).toFixed(2)),
      grandTotal: totalAmount,
      userId: 1,
      userDate: new Date().toISOString(),
      financialYearId: 2026,
      isEstimate: false,
      cancelFlag: false,
      createdDate: new Date().toISOString(),
    });
  }
  return sales;
};

// Generate sample inventory transactions
export const generateDummyInventoryTransactions = (count = 100) => {
  const inventoryTypes = ['PU', 'SA', 'PR', 'SR', 'TR', 'AD'];
  const modes = ['Cash', 'Credit', 'Card', 'UPI'];
  
  const transactions = [];
  for (let i = 1; i <= count; i++) {
    const inventoryDate = new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000);
    const quantity = parseFloat((Math.random() * 50 + 1).toFixed(3));
    const purchaseRate = parseFloat((Math.random() * 100 + 10).toFixed(2));
    const salesRate = parseFloat((purchaseRate * (1 + Math.random() * 0.5)).toFixed(2));
    const grossAmount = parseFloat((quantity * purchaseRate).toFixed(2));
    const taxPercent = [0, 5, 12, 18, 28][Math.floor(Math.random() * 5)];
    const taxAmount = parseFloat((grossAmount * taxPercent / 100).toFixed(2));
    const total = grossAmount + taxAmount;
    
    transactions.push({
      tempId: i,
      inventoryNo: Math.floor(Math.random() * 50) + 1,
      billCode: `BILL-${String(i).padStart(6, '0')}`,
      inventoryDate: inventoryDate.toISOString(),
      inventoryType: inventoryTypes[Math.floor(Math.random() * inventoryTypes.length)],
      slNo: i,
      itemId: Math.floor(Math.random() * 50) + 1,
      unitId: Math.floor(Math.random() * 5) + 1,
      multiplier: 1,
      quantity: quantity,
      freeQuantity: Math.random() > 0.8 ? parseFloat((quantity * 0.1).toFixed(3)) : 0,
      purchaseRate: purchaseRate,
      salesRate: salesRate,
      billRate: salesRate,
      billQty: quantity,
      billFreeQty: Math.random() > 0.8 ? parseFloat((quantity * 0.1).toFixed(3)) : 0,
      grossAmount: grossAmount,
      discount: parseFloat((Math.random() * 10).toFixed(2)),
      discountAmount: parseFloat((grossAmount * Math.random() * 0.1).toFixed(2)),
      exciseDuty: 0,
      exciseDutyAmount: 0,
      tax: taxPercent,
      taxAmount: taxAmount,
      roundOff: parseFloat((Math.random() * 2 - 1).toFixed(2)),
      otherPur: 0,
      expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      total: total,
      mode: modes[Math.floor(Math.random() * modes.length)],
      taxableHead: 0,
      salesmanGodownFlag: false,
      cancelFlag: false,
      cancelDate: null,
      defectiveFlag: false,
      financialYearId: 2026,
      isEstimate: false,
      transType: Math.random() > 0.5 ? 1 : 0,
      shortage: 0,
      mrp: parseFloat((salesRate * 1.1).toFixed(2)),
      cess: parseFloat((taxAmount * 0.01).toFixed(2)),
      adjGrossAmount: grossAmount,
      batchNo1: `BATCH-${String(i).padStart(6, '0')}`,
      quantity1: quantity,
      godownId: Math.floor(Math.random() * 5) + 1,
      costPrice: purchaseRate,
      modelId: null,
      returnType: null,
      narration: `Transaction ${i}`,
      services: 0,
      grandTotal: total,
    });
  }
  return transactions;
};

// Generate sample accounts
export const generateDummyAccounts = (count = 25) => {
  const accountTypes = ['Sundry Debtors', 'Sundry Creditors', 'Bank', 'Cash', 'Loans', 'Expenses', 'Income'];
  const goodsTypes = [1, 2, 3]; // Different types of goods
  
  const accounts = [];
  for (let i = 1; i <= count; i++) {
    accounts.push({
      accountCode: i,
      accountName: `Account ${i}`,
      groupUnder: Math.floor(Math.random() * 10) + 1,
      userId: 1,
      userDate: new Date().toISOString(),
      accountType: ['D', 'C'][Math.floor(Math.random() * 2)], // Debit or Credit
      companyId: 1,
      address1: `Address ${i}, City`,
      address2: `State, PIN ${100000 + i}`,
      phoneNo: `+91-${Math.floor(1000000000 + Math.random() * 900000000)}`,
      mobileNo: `+91-${Math.floor(1000000000 + Math.random() * 900000000)}`,
      email: `account${i}@example.com`,
      tin: `TIN${String(i).padStart(11, '0')}`,
      cstNo: `CST${String(i).padStart(10, '0')}`,
      creditLimit: parseFloat((Math.random() * 100000).toFixed(2)),
      empId: null,
      dueDays: 30,
      routeId: null,
      formId: null,
      type: Math.floor(Math.random() * 3),
      rateType: Math.floor(Math.random() * 3),
      purchaseSalesTypeId: Math.floor(Math.random() * 3),
      collAgentId: null,
      partyType: Math.floor(Math.random() * 3),
    });
  }
  return accounts;
};

// Generate sample categories
export const generateDummyCategories = () => {
  return [
    { slno: 1, cname: 'Electronics', cunder: 0 },
    { slno: 2, cname: 'Furniture', cunder: 0 },
    { slno: 3, cname: 'Stationery', cunder: 0 },
    { slno: 4, cname: 'Clothing', cunder: 0 },
    { slno: 5, cname: 'Books', cunder: 0 },
    { slno: 6, cname: 'Hardware', cunder: 0 },
    { slno: 7, cname: 'Software', cunder: 0 },
    { slno: 8, cname: 'Food', cunder: 0 },
  ];
};

// Generate sample units
export const generateDummyUnits = () => {
  return [
    { unitId: 1, unitName: 'Piece', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 2, unitName: 'Pack', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 3, unitName: 'Box', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 4, unitName: 'Kilogram', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 5, unitName: 'Liter', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 6, unitName: 'Meter', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
    { unitId: 7, unitName: 'Pair', multiplier: 1, userId: 1, userDate: new Date().toISOString(), companyId: 1 },
  ];
};

// Generate sample godowns (warehouses)
export const generateDummyGodowns = (count = 5) => {
  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'];
  
  const godowns = [];
  for (let i = 1; i <= count; i++) {
    godowns.push({
      godownId: i,
      godownName: `Warehouse ${i}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      isGodown: true,
      vanRegNo: `MH-${Math.floor(1000 + Math.random() * 9000)}-${['AB', 'CD', 'EF', 'GH', 'IJ'][Math.floor(Math.random() * 5)]}`,
      make: ['Tata', 'Ashok Leyland', 'Mahindra', 'Eicher'][Math.floor(Math.random() * 4)],
      model: `Model-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      insurance: `Policy-${i}`,
      insuranceFrom: new Date(2025, 0, 1).toISOString(),
      insuranceTo: new Date(2026, 0, 1).toISOString(),
      taxFrom: new Date(2025, 0, 1).toISOString(),
      taxTo: new Date(2026, 0, 1).toISOString(),
      isClosed: false,
      userId: 1,
      userDate: new Date().toISOString(),
      companyId: 1,
    });
  }
  return godowns;
};

// Generate all dummy data
export const generateAllDummyData = () => {
  return {
    items: generateDummyItems(),
    purchases: generateDummyPurchases(),
    sales: generateDummySales(),
    inventoryTransactions: generateDummyInventoryTransactions(),
    accounts: generateDummyAccounts(),
    categories: generateDummyCategories(),
    units: generateDummyUnits(),
    godowns: generateDummyGodowns(),
  };
};

export default {
  generateDummyItems,
  generateDummyPurchases,
  generateDummySales,
  generateDummyInventoryTransactions,
  generateDummyAccounts,
  generateDummyCategories,
  generateDummyUnits,
  generateDummyGodowns,
  generateAllDummyData,
};
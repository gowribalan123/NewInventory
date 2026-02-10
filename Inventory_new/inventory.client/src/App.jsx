import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import Components
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Items from './components/Items/Index';
import Purchases from './components/Purchases/Index.jsx';
import Sales from './components/Sales/Index.jsx';
// import Inventory from './components/Inventory';
// import Accounting from './components/Accounting';
// import Reports from './components/Reports';
// import Settings from './components/Settings';

// Import Context
import { AppProvider } from './contexts/AppContext.jsx';
import CategoryGrpIndex from './components/Masters/CategoriesGroup/CategoryGrpIndex.jsx';
import CategoryIndex from './components/Masters/Categories/CategoryIndex.jsx';
import BrandIndex from './components/Masters/BrandIndex.jsx';
import UnitsIndex from './components/Masters/UnitsIndex.jsx';
import ItemIndex from './components/Masters/ItemIndex.jsx';
import GodownIndex from './components/Masters/GodownIndex.jsx';
import EmployeesIndex from './components/Masters/EmployeesIndex.jsx';
import DesignationsIndex from './components/Masters/DesignationsIndex.jsx';
import LedgerIndex from './components/Masters/LedgerIndex.jsx';
import Areasindex from './components/Masters/Areasindex.jsx';
import VoucherIndex from './components/Operations/Voucherindex.jsx';
import SampleIssueIndex from './components/Operations/SampleIssueIndex.jsx';
import SampleReceiptIndex from './components/Operations/SampleReceiptindex.jsx';
import QuotationIndex from './components/Operations/QuotationIndex.jsx';
import StockReceiptIndex from './components/Operations/StockReceiptIndex.jsx';
import StockTransferIndex from './components/Operations/Stocktransferindex.jsx';
import ItemSplitupIndex from './components/Operations/ItemSplitupIndex.jsx';
import ChequeClearIndex from './components/Operations/ChequeClearIndex.jsx';
import ContinuousBillIndex from './components/Operations/ContinuousBillIndex.jsx';
import MissingBillIndex from './components/Operations/MissingBillIndex.jsx';
import LedgerBalanceIndex from './components/Operations/Opening/LedgerBalanceIndex.jsx';
import StockIndex from './components/Operations/Opening/StockIndex.jsx';
import SalesIndex from './components/Operations/Opening/Bills/SalesIndex.jsx';
import PurchaseIndex from './components/Operations/Opening/Bills/PurchaseIndex.jsx';
import SalesPointIndex from './components/Operations/Opening/SalespointIndex.jsx';
import PurchaseReturn from './components/Purchases/forms/PurchaseReturn.jsx';
import PurchaseOrderIndex from './components/Purchases/PurchaseOrderIndex.jsx';
import SalesReturnIndex from './components/Sales/SalesReturnIndex.jsx';




function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout />}>  
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="items" element={<Items />} />




       

               <Route path="purchases" element={<Purchases />} />
              <Route path="purchases/return" element={<PurchaseReturn />} />
              <Route path="purchases/order" element={<PurchaseOrderIndex />} />

              <Route path="sales" element={<Sales />} />
              <Route path="sales/return" element={<SalesReturnIndex />} />
              <Route path="masters/category-groups" element={<CategoryGrpIndex />} />
              <Route path="masters/categories" element={<CategoryIndex />} />
              <Route path="masters/brand-names" element={<BrandIndex />} />
              <Route path="masters/items" element={<ItemIndex />} />
              <Route path="masters/units" element={<UnitsIndex />} />
              <Route path="masters/godowns" element={<GodownIndex />} />
              <Route path="masters/employees" element={<EmployeesIndex />} />
              <Route path="masters/designations" element={<DesignationsIndex />} />
              <Route path="masters/ledger-groups" element={<LedgerIndex />} />
              <Route path="masters/areas" element={<Areasindex />} />
              
              <Route path="operations/vouchers" element={<VoucherIndex />} />
              <Route path="operations/sample-issue" element={<SampleIssueIndex />} />
              <Route path="operations/sample-receipt" element={<SampleReceiptIndex />} />
              <Route path="operations/quotation" element={<QuotationIndex />} />
              <Route path="operations/stock-receipt-issue" element={<StockReceiptIndex />} />
              <Route path="operations/stock-transfer" element={<StockTransferIndex />} />
              <Route path="operations/stock-transfer" element={<StockTransferIndex />} />
              <Route path="operations/item-splitup" element={<ItemSplitupIndex />} />
              <Route path="operations/cheque-clearing-bouncing" element={<ChequeClearIndex />} />
              <Route path="operations/continuous-bill" element={<ContinuousBillIndex />} />
              <Route path="operations/missing-bills" element={<MissingBillIndex />} />
              <Route path="operations/opening/ledger-balance" element={<LedgerBalanceIndex />} />
              <Route path="operations/opening/stock" element={<StockIndex />} />
              <Route path="operations/opening/sales-point" element={<SalesPointIndex />} />
              <Route path="operations/opening/bills/sales" element={<SalesIndex />} />
              <Route path="operations/opening/bills/purchase" element={<PurchaseIndex />} />
          

              

              
              {/*
              <Route path="inventory" element={<Inventory />} />
              <Route path="accounting" element={<Accounting />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              */}
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
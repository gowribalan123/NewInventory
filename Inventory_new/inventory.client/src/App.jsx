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
import BalanceSheet from './components/View/BalanceSheet.jsx';
import PLAccount from './components/View/PLAccount.jsx';
import TrialBalance from './components/View/TrialBalance.jsx';
import DailyStatement from './components/View/Accout Book/DailyStatement.jsx';
import CashFlow from './components/View/Accout Book/CashFlow.jsx';

import DayBook from './components/View/Accout Book/DayBook.jsx';
import GroupSummary from './components/View/Accout Book/GroupSummary.jsx';
import JournalBook from './components/View/Accout Book/JournalBook.jsx';
import YearlyLedgerBook from './components/View/Accout Book/YearlyLedgerBook.jsx';
import DebitorsCreditors from './components/View/Accout Book/DebitorsCreditors.jsx';
import PurchaseRegister from './components/View/Stock Report/PurchasRegister.jsx';
import SalesStatement from './components/View/Stock Report/SalesStatement.jsx';
import CustomerwiseSales from './components/View/Stock Report/CustomerwiseSales.jsx';
import SalesmanwiseSales from './components/View/Stock Report/SalesmanwiseSales.jsx';
import InventoryAnalysis from './components/View/Stock Report/InventoryAnalysis.jsx';
import TurnoverSummary from './components/View/Stock Report/TurnoverSummary.jsx';
import StockRegister from './components/View/Stock Report/StockRegister.jsx';
import StockSummary from './components/View/Stock Report/StockSummary.jsx';
import StockAnalysis from './components/View/Stock Report/StockAnalysis.jsx';
import StockAgeing from './components/View/Stock Report/StockAgeing.jsx';
import NegativeStockRegister from './components/View/Stock Report/NegativeStockRegister.jsx';
import ClosingStockInventory from './components/View/Stock Report/ClosingStockInventory.jsx';







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




              <Route path="view/balance-sheet" element={<BalanceSheet />} />
              <Route path="view/pl-account" element={<PLAccount />} />
              <Route path="view/trial-balance" element={<TrialBalance />} />
              <Route path="view/account-book/daily-statement" element={<DailyStatement />} />
              <Route path="view/account-book/cash-flow" element={<CashFlow />} />
              <Route path="view/account-book/debitors-creditors" element={<DebitorsCreditors />} />
              <Route path="view/account-book/day-book" element={<DayBook />} />
              <Route path="view/account-book/group-summary" element={<GroupSummary />} />
              <Route path="view/account-book/journal-book" element={<JournalBook />} />
              <Route path="view/account-book/yearly-ledger-book" element={<YearlyLedgerBook />} />
              <Route path="view/stock-report/purchase-register" element={<PurchaseRegister />} />
              <Route path="view/stock-report/sales-statement" element={<SalesStatement />} />
              <Route path="view/stock-report/yearly-ledger-book" element={<YearlyLedgerBook />} />
              <Route path="view/stock-report/customerwise-sales" element={<CustomerwiseSales />} />
              <Route path="view/stock-report/salesmanwise-sales" element={<SalesmanwiseSales />} />
              <Route path="view/stock-report/inventory-analysis" element={<InventoryAnalysis />} />
              <Route path="view/stock-report/turnover-summary" element={<TurnoverSummary />} />
              <Route path="view/stock-report/stock-register" element={<StockRegister />} />
              <Route path="view/stock-report/stock-register" element={<StockRegister />} />
              <Route path="view/stock-report/stock-summary" element={<StockSummary />} />
              <Route path="view/stock-report/stock-analysis" element={<StockAnalysis />} />
              <Route path="view/stock-report/stock-ageing" element={<StockAgeing />} />
              <Route path="view/stock-report/negative-stock-register" element={<NegativeStockRegister />} />
              <Route path="view/stock-report/closing-stock-inventory" element={<ClosingStockInventory />} />
              
              
            






              
              
 
              

              
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
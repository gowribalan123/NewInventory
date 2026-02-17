// import React, { useState } from "react";
// import { Outlet, NavLink, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   CircleDollarSign,
//   Warehouse,
//   Calculator,
//   FileText,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   Plus,
//   Search,
//   Bell,
//   HelpCircle,
//   Grid,
//   Eye,
//   BookOpen,
// } from "lucide-react";

// const Layout = () => {
//   const [isMastersMenuOpen, setIsMastersMenuOpen] = useState(false);
//   const [isOperationsMenuOpen, setIsOperationsMenuOpen] = useState(false);
//   const [isOpeningMenuOpen, setIsOpeningMenuOpen] = useState(false);
//   const [isBillsSubMenuOpen, setIsBillsSubMenuOpen] = useState(false);
//   const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false);
  
//   // NEW: View section states
//   const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
//   const [isAccountBookSubMenuOpen, setIsAccountBookSubMenuOpen] = useState(false);
//   const [isStockReportSubMenuOpen, setIsStockReportSubMenuOpen] = useState(false);
  
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   const getNavItemClass = ({ isActive }) => `
//     flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
//     ${
//       isActive
//         ? "bg-blue-600 text-white font-medium shadow-sm"
//         : "text-slate-300 hover:bg-slate-700 hover:text-white"
//     }
//   `;

//   const tooltipClass =
//     "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-sm";

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* ===== HEADER ===== */}
//       <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
//         <div className="flex items-center gap-3">
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
//             <Grid size={20} />
//           </button>
//           <span className="font-bold text-xl text-gray-800 tracking-tight">
//             Inventory
//           </span>
//         </div>

//         <div className="flex-1 max-w-xl mx-4 hidden md:block">
//           <div className="relative group">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
//             <Bell size={20} />
//             <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
//             <Settings size={20} />
//           </button>
//           <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
//             <HelpCircle size={20} />
//           </button>

//           <div className="h-6 w-px bg-gray-200 mx-2"></div>

//           <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
//             <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-sm">
//               JD
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ===== MAIN ===== */}
//       <div className="flex flex-1">
//         {/* ===== SIDEBAR ===== */}
//         <aside
//           className={`bg-[#1e293b] text-white flex flex-col transition-all duration-300 border-r border-slate-700 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shrink-0
//           ${collapsed ? "w-16" : "w-52"}`}
//         >
//           {/* Sidebar Header / Toggle */}
//           <div
//             className={`flex items-center h-14 border-b border-slate-700 shrink-0 ${collapsed ? "justify-center" : "px-4"}`}
//           >
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
//             >
//               {collapsed ? (
//                 <ChevronRight size={18} />
//               ) : (
//                 <ChevronLeft size={18} />
//               )}
//             </button>
//             {!collapsed && (
//               <span className="font-semibold text-lg tracking-wide ml-3">
//                 Menu
//               </span>
//             )}
//           </div>

//           <nav className="flex-1 py-2">
//             <ul>
//               <li>
//                 <NavLink to="/dashboard" className={getNavItemClass}>
//                   <LayoutDashboard size={18} />
//                   {!collapsed && <span>Dashboard</span>}
//                   {collapsed && <div className={tooltipClass}>Dashboard</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/items" className={getNavItemClass}>
//                   <Package size={18} />
//                   {!collapsed && <span>Items</span>}
//                   {collapsed && <div className={tooltipClass}>Items</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
//                         ${
//                           location.pathname.startsWith("/masters")
//                             ? "bg-blue-600 text-white font-medium"
//                             : "text-slate-300 hover:bg-slate-700 hover:text-white"
//                         }`}
//                   onClick={() =>
//                     !collapsed && setIsMastersMenuOpen(!isMastersMenuOpen)
//                   }
//                 >
//                   <Grid size={18} />

//                   {!collapsed && <span className="flex-1">Masters</span>}
//                   {!collapsed &&
//                     (isMastersMenuOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     ))}

//                   {collapsed && <div className={tooltipClass}>Masters</div>}
//                 </div>

//                 {!collapsed && isMastersMenuOpen && (
//                   <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
//                     <li>
//                       <NavLink
//                         to="/masters/category-groups"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//                                ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Category Groups
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/categories"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//                                ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Categories
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/brand-names"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Brand Names
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/items"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Items
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/units"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Units
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/godowns"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Godowns
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/employees"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Employees
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/designations"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Designations
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/ledger-groups"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Ledger Groups
//                       </NavLink>
//                     </li>

//                     <li>
//                       <NavLink
//                         to="/masters/areas"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
//            ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         Areas
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               {/* ===== OPERATIONS SECTION ===== */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
//                       ${
//                         location.pathname.startsWith("/operations")
//                           ? "bg-blue-600 text-white font-medium"
//                           : "text-slate-300 hover:bg-slate-700 hover:text-white"
//                       }`}
//                   onClick={() =>
//                     !collapsed && setIsOperationsMenuOpen(!isOperationsMenuOpen)
//                   }
//                 >
//                   <FileText size={18} />
//                   {!collapsed && <span className="flex-1">Operations</span>}
//                   {!collapsed &&
//                     (isOperationsMenuOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     ))}
//                   {collapsed && (
//                     <div className={tooltipClass}>Operations</div>
//                   )}
//                 </div>

//                 {!collapsed && isOperationsMenuOpen && (
//                   <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
//                     {/* Standard Links */}
//                     {[
//                       { to: "/operations/vouchers", label: "Vouchers" },
//                       {
//                         to: "/operations/sample-issue",
//                         label: "Sample Issue",
//                       },
//                       {
//                         to: "/operations/sample-receipt",
//                         label: "Sample Receipt",
//                       },
//                       { to: "/operations/quotation", label: "Quotation" },
//                       {
//                         to: "/operations/stock-receipt-issue",
//                         label: "Stock Receipt/Issue",
//                       },
//                       {
//                         to: "/operations/stock-transfer",
//                         label: "Stock Transfer",
//                       },
//                       {
//                         to: "/operations/item-splitup",
//                         label: "Item Splitup",
//                       },
//                       {
//                         to: "/operations/cheque-clearing-bouncing",
//                         label: "Cheque Clearing/Bouncing",
//                       },
//                       {
//                         to: "/operations/continuous-bill",
//                         label: "Continuous Bill",
//                       },
//                       {
//                         to: "/operations/missing-bills",
//                         label: "Missing Bills",
//                       },
//                     ].map((item) => (
//                       <li key={item.to}>
//                         <NavLink
//                           to={item.to}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-10 pr-4 py-2 text-sm transition-colors ${
//                               isActive
//                                 ? "text-blue-400 font-medium"
//                                 : "text-slate-400 hover:text-white"
//                             }`
//                           }
//                         >
//                           {item.label}
//                         </NavLink>
//                       </li>
//                     ))}

//                     {/* --- OPENING SECTION --- */}
//                     <li>
//                       <div
//                         className="flex items-center justify-between pl-10 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
//                         onClick={() =>
//                           setIsOpeningMenuOpen(!isOpeningMenuOpen)
//                         }
//                       >
//                         <span>Opening</span>
//                         {/* ICON ADDED HERE */}
//                         <span className="ml-auto">
//                           {isOpeningMenuOpen ? (
//                             <ChevronDown size={14} />
//                           ) : (
//                             <ChevronRight size={14} />
//                           )}
//                         </span>
//                       </div>

//                       {isOpeningMenuOpen && (
//                         <ul className="bg-white/5 py-1 border-l border-slate-700 ml-6">
//                           <li>
//                             <NavLink
//                               to="/operations/opening/ledger-balance"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Ledger Balance
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/operations/opening/stock"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Stock
//                             </NavLink>
//                           </li>

//                           {/* Level 3: Bills */}
//                           <li>
//                             <div
//                               className="flex items-center justify-between pl-4 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer"
//                               onClick={() =>
//                                 setIsBillsSubMenuOpen(!isBillsSubMenuOpen)
//                               }
//                             >
//                               <span>Bills</span>
//                               {/* ICON ADDED HERE */}
//                               <span className="ml-auto">
//                                 {isBillsSubMenuOpen ? (
//                                   <ChevronDown size={14} />
//                                 ) : (
//                                   <ChevronRight size={14} />
//                                 )}
//                               </span>
//                             </div>

//                             {isBillsSubMenuOpen && (
//                               <ul className="bg-black/40 py-1 border-l border-blue-500/30 ml-2">
//                                 <li>
//                                   <NavLink
//                                     to="/operations/opening/bills/sales"
//                                     className="block pl-6 py-2 text-sm text-slate-400 hover:text-blue-400"
//                                   >
//                                     Sales
//                                   </NavLink>
//                                 </li>
//                                 <li>
//                                   <NavLink
//                                     to="/operations/opening/bills/purchase"
//                                     className="block pl-6 py-2 text-sm text-slate-400 hover:text-blue-400"
//                                   >
//                                     Purchase
//                                   </NavLink>
//                                 </li>
//                               </ul>
//                             )}
//                           </li>

//                           <li>
//                             <NavLink
//                               to="/operations/opening/sales-point"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Sales Point
//                             </NavLink>
//                           </li>
//                         </ul>
//                       )}
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
//                   ${
//                     location.pathname.startsWith("/purchases")
//                       ? "bg-blue-600 text-white font-medium"
//                       : "text-slate-300 hover:bg-slate-700 hover:text-white"
//                   }`}
//                   onClick={() =>
//                     !collapsed && setIsPurchaseMenuOpen(!isPurchaseMenuOpen)
//                   }
//                 >
//                   <ShoppingCart size={18} />
//                   {!collapsed && (
//                     <>
//                       <span className="flex-1">Purchases</span>
//                       {isPurchaseMenuOpen ? (
//                         <ChevronDown size={16} />
//                       ) : (
//                         <ChevronRight size={16} />
//                       )}
//                     </>
//                   )}
//                   {collapsed && <div className={tooltipClass}>Purchases</div>}
//                 </div>
//                 {!collapsed && isPurchaseMenuOpen && (
//                   <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
//                     <li>
//                       <NavLink
//                         to="/purchases"
//                         end
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         <span>Purchase</span>
//                         <Plus
//                           size={16}
//                           className="ml-auto hover:text-blue-400"
//                         />
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/purchases/return"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         <span>Purchase Return</span>
//                         <Plus
//                           size={16}
//                           className="ml-auto hover:text-blue-400"
//                         />
//                       </NavLink>
//                     </li>
//                     <li>
//                       <NavLink
//                         to="/purchases/order"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
//                         }
//                       >
//                         <span>Purchase Order</span>
//                         <Plus
//                           size={16}
//                           className="ml-auto hover:text-blue-400"
//                         />
//                       </NavLink>
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <NavLink to="/sales" className={getNavItemClass}>
//                   <CircleDollarSign size={18} />
//                   {!collapsed && <span>Sales</span>}
//                   {collapsed && <div className={tooltipClass}>Sales</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/inventory" className={getNavItemClass}>
//                   <Warehouse size={18} />
//                   {!collapsed && <span>Inventory</span>}
//                   {collapsed && <div className={tooltipClass}>Inventory</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/accounting" className={getNavItemClass}>
//                   <Calculator size={18} />
//                   {!collapsed && <span>Accounting</span>}
//                   {collapsed && <div className={tooltipClass}>Accounting</div>}
//                 </NavLink>
//               </li>

//               {/* ===== NEW VIEW SECTION ===== */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
//                       ${
//                         location.pathname.startsWith("/view")
//                           ? "bg-blue-600 text-white font-medium"
//                           : "text-slate-300 hover:bg-slate-700 hover:text-white"
//                       }`}
//                   onClick={() =>
//                     !collapsed && setIsViewMenuOpen(!isViewMenuOpen)
//                   }
//                 >
//                   <Eye size={18} />
//                   {!collapsed && <span className="flex-1">View</span>}
//                   {!collapsed &&
//                     (isViewMenuOpen ? (
//                       <ChevronDown size={16} />
//                     ) : (
//                       <ChevronRight size={16} />
//                     ))}
//                   {collapsed && <div className={tooltipClass}>View</div>}
//                 </div>

//                 {!collapsed && isViewMenuOpen && (
//                   <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
//                     {/* Balance Sheet */}
//                     <li>
//                       <NavLink
//                         to="/view/balance-sheet"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-10 pr-4 py-2 text-sm transition-colors ${
//                             isActive
//                               ? "text-blue-400 font-medium"
//                               : "text-slate-400 hover:text-white"
//                           }`
//                         }
//                       >
//                         Balance Sheet
//                       </NavLink>
//                     </li>

//                     {/* P & L Account */}
//                     <li>
//                       <NavLink
//                         to="/view/pl-account"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-10 pr-4 py-2 text-sm transition-colors ${
//                             isActive
//                               ? "text-blue-400 font-medium"
//                               : "text-slate-400 hover:text-white"
//                           }`
//                         }
//                       >
//                         P & L Account
//                       </NavLink>
//                     </li>

//                     {/* Trial Balance */}
//                     <li>
//                       <NavLink
//                         to="/view/trial-balance"
//                         className={({ isActive }) =>
//                           `flex items-center gap-3 pl-10 pr-4 py-2 text-sm transition-colors ${
//                             isActive
//                               ? "text-blue-400 font-medium"
//                               : "text-slate-400 hover:text-white"
//                           }`
//                         }
//                       >
//                         Trial Balance
//                       </NavLink>
//                     </li>

//                     {/* Account Book - with submenu */}
//                     <li>
//                       <div
//                         className="flex items-center justify-between pl-10 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
//                         onClick={() =>
//                           setIsAccountBookSubMenuOpen(!isAccountBookSubMenuOpen)
//                         }
//                       >
//                         <span>Account Book</span>
//                         <span className="ml-auto">
//                           {isAccountBookSubMenuOpen ? (
//                             <ChevronDown size={14} />
//                           ) : (
//                             <ChevronRight size={14} />
//                           )}
//                         </span>
//                       </div>

//                       {isAccountBookSubMenuOpen && (
//                         <ul className="bg-white/5 py-1 border-l border-slate-700 ml-6">
//                           <li>
//                             <NavLink
//                               to="/view/account-book/cash-book"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Daily Statement
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/cash-book"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Cash Book
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/cash-book"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Day Book
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/bank-book"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Ledger
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/ledger"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Cash Flow
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/ledger"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Debitors/Creditors
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/ledger"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Group Summary
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/ledger"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Journal Book
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/account-book/ledger"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Yearly Ledger Book
//                             </NavLink>
//                           </li>
//                         </ul>
//                       )}
//                     </li>

//                     {/* Stock Report - with submenu */}
//                     <li>
//                       <div
//                         className="flex items-center justify-between pl-10 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
//                         onClick={() =>
//                           setIsStockReportSubMenuOpen(!isStockReportSubMenuOpen)
//                         }
//                       >
//                         <span>Stock Report</span>
//                         <span className="ml-auto">
//                           {isStockReportSubMenuOpen ? (
//                             <ChevronDown size={14} />
//                           ) : (
//                             <ChevronRight size={14} />
//                           )}
//                         </span>
//                       </div>

//                       {isStockReportSubMenuOpen && (
//                         <ul className="bg-white/5 py-1 border-l border-slate-700 ml-6">
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/purchase-register"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Purchase Register
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/sales-register"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Sales Register
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/sales-statement"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Sales Statement
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/customerwise-sales"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Customerwise Sales
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/salesmanwise-sales"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Salesmanwise Sales
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/inventory-analysis"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Inventory Analysis
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/turnover-summary"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Turnover Summary
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/stock-register"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Stock Register
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/stock-summary"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Stock Summary
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/stock-analysis"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Stock Analysis
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/stock-ageing"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Stock Ageing
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/negative-stock-register"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Negative Stock Register
//                             </NavLink>
//                           </li>
//                           <li>
//                             <NavLink
//                               to="/view/stock-report/closing-stock-inventory"
//                               className="block pl-4 py-2 text-sm text-slate-400 hover:text-white"
//                             >
//                               Closing Stock Inventory
//                             </NavLink>
//                           </li>
//                         </ul>
//                       )}
//                     </li>
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <NavLink to="/reports" className={getNavItemClass}>
//                   <FileText size={18} />
//                   {!collapsed && <span>Reports</span>}
//                   {collapsed && <div className={tooltipClass}>Reports</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/settings" className={getNavItemClass}>
//                   <Settings size={18} />
//                   {!collapsed && <span>Settings</span>}
//                   {collapsed && <div className={tooltipClass}>Settings</div>}
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>
//         </aside>

//         {/* ===== PAGE CONTENT ===== */}
//         <main className="flex-1 p-6 overflow-x-hidden">
//           <Outlet />
//         </main>
//       </div>

//       {/* ===== FOOTER ===== */}
//       <footer className="bg-white border-t border-gray-200 py-3 px-6 z-20">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
//           <p>&copy; 2026 Inventory System. All rights reserved.</p>
//           <div className="flex gap-4">
//             <a href="#about" className="hover:text-blue-600 transition-colors">
//               About
//             </a>
//             <a href="#help" className="hover:text-blue-600 transition-colors">
//               Help
//             </a>
            
//              <a href="#privacy" className="hover:text-blue-600 transition-colors">
//               Privacy
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Layout;







import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CircleDollarSign,
  Warehouse,
  Calculator,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Bell,
  HelpCircle,
  Grid,
  Eye,
  User,
} from "lucide-react";

const Layout = () => {
  const [isMastersMenuOpen, setIsMastersMenuOpen] = useState(false);
  const [isOperationsMenuOpen, setIsOperationsMenuOpen] = useState(false);
  const [isOpeningMenuOpen, setIsOpeningMenuOpen] = useState(false);
  const [isBillsSubMenuOpen, setIsBillsSubMenuOpen] = useState(false);
  const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false);
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const [isAccountBookSubMenuOpen, setIsAccountBookSubMenuOpen] = useState(false);
  const [isStockReportSubMenuOpen, setIsStockReportSubMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Enhanced Zoho styling with modern polish
  const getNavItemClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 cursor-pointer transition-all duration-300 group relative text-sm
    ${
      isActive
        ? "bg-gradient-to-r from-blue-50 to-blue-50/50 text-[#0052CC] font-semibold border-l-4 border-[#0052CC] shadow-sm"
        : "text-gray-700 hover:bg-gray-50 hover:text-[#0052CC] hover:translate-x-1"
    }
  `;

  const tooltipClass =
    "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .submenu-enter {
          animation: slideDown 0.2s ease-out;
        }

        /* Custom scrollbar for sidebar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }

        /* Active border animation */
        @keyframes borderGlow {
          0%, 100% { box-shadow: -3px 0 0 0 #0052CC; }
          50% { box-shadow: -3px 0 0 0 #2684FF; }
        }
      `}</style>

      {/* ===== HEADER - PREMIUM ZOHO STYLE ===== */}
      <header className="h-14 bg-gradient-to-r from-[#2C3E50] to-[#34495E] border-b border-gray-700/50 flex items-center justify-between px-6 sticky top-0 z-40 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-200">
              <Package className="text-[#2C3E50]" size={20} />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Inventory</span>
              <p className="text-xs text-gray-300 -mt-0.5">Management System</p>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-6 hidden md:block">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-blue-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search in Invoices ( / )"
              className="w-full pl-10 pr-4 py-2 bg-[#34495E]/50 border border-gray-600/50 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-[#2C3E50] focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 hover:text-white">
            <Grid size={18} />
          </button>
          <button className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 relative hover:text-white">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-[#2c3e50] animate-pulse"></span>
          </button>
          <button className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200 hover:text-white">
            <Settings size={18} />
          </button>

          <div className="h-6 w-px bg-gray-600/50 mx-2"></div>

          <div className="flex items-center gap-2 cursor-pointer hover:bg-white/10 px-2 py-1.5 rounded-lg transition-all duration-200 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-lg group-hover:scale-105 transition-transform duration-200">
              SS
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1">
        {/* ===== SIDEBAR - PREMIUM CLEAN WHITE ===== */}
        <aside
          className={`bg-white border-r border-gray-200/80 flex flex-col transition-all duration-300 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto custom-scrollbar shrink-0 shadow-sm
          ${collapsed ? "w-16" : "w-64"}`}
        >
          {/* Sidebar Header */}
          <div
            className={`flex items-center h-12 border-b border-gray-100 shrink-0 bg-gray-50/50 ${collapsed ? "justify-center" : "px-4 justify-between"}`}
          >
            {!collapsed && (
              <span className="font-semibold text-sm text-gray-700 tracking-tight">MENU</span>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110"
            >
              {collapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
          </div>

          <nav className="flex-1 py-3">
            <ul className="space-y-1">
              <li>
                <NavLink to="/dashboard" className={getNavItemClass}>
                  <LayoutDashboard size={18} />
                  {!collapsed && <span>Dashboard</span>}
                  {collapsed && <div className={tooltipClass}>Dashboard</div>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/items" className={getNavItemClass}>
                  <Package size={18} />
                  {!collapsed && <span>Items</span>}
                  {collapsed && <div className={tooltipClass}>Items</div>}
                </NavLink>
              </li>

              {/* MASTERS */}
              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 cursor-pointer transition-all duration-300 group relative text-sm
                        ${
                          location.pathname.startsWith("/masters")
                            ? "bg-blue-50 text-[#0052CC] font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#0052CC]"
                        }`}
                  onClick={() =>
                    !collapsed && setIsMastersMenuOpen(!isMastersMenuOpen)
                  }
                >
                  <Grid size={18} />
                  {!collapsed && <span className="flex-1">Masters</span>}
                  {!collapsed &&
                    (isMastersMenuOpen ? (
                      <ChevronDown size={16} className="transition-transform duration-200" />
                    ) : (
                      <ChevronRight size={16} className="transition-transform duration-200" />
                    ))}
                  {collapsed && <div className={tooltipClass}>Masters</div>}
                </div>

                {!collapsed && isMastersMenuOpen && (
                  <ul className="mt-1 space-y-0.5 submenu-enter">
                    {[
                      { to: "/masters/category-groups", label: "Category Groups" },
                      { to: "/masters/categories", label: "Categories" },
                      { to: "/masters/brand-names", label: "Brand Names" },
                      { to: "/masters/items", label: "Items" },
                      { to: "/masters/units", label: "Units" },
                      { to: "/masters/godowns", label: "Godowns" },
                      { to: "/masters/employees", label: "Employees" },
                      { to: "/masters/designations", label: "Designations" },
                      { to: "/masters/ledger-groups", label: "Ledger Groups" },
                      { to: "/masters/areas", label: "Areas" },
                    ].map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200
                               ${isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"}`
                          }
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* OPERATIONS */}
              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 cursor-pointer transition-all duration-300 group relative text-sm
                      ${
                        location.pathname.startsWith("/operations")
                          ? "bg-blue-50 text-[#0052CC] font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#0052CC]"
                      }`}
                  onClick={() =>
                    !collapsed && setIsOperationsMenuOpen(!isOperationsMenuOpen)
                  }
                >
                  <FileText size={18} />
                  {!collapsed && <span className="flex-1">Operations</span>}
                  {!collapsed &&
                    (isOperationsMenuOpen ? (
                      <ChevronDown size={16} className="transition-transform duration-200" />
                    ) : (
                      <ChevronRight size={16} className="transition-transform duration-200" />
                    ))}
                  {collapsed && <div className={tooltipClass}>Operations</div>}
                </div>

                {!collapsed && isOperationsMenuOpen && (
                  <ul className="mt-1 space-y-0.5 submenu-enter">
                    {[
                      { to: "/operations/vouchers", label: "Vouchers" },
                      { to: "/operations/sample-issue", label: "Sample Issue" },
                      { to: "/operations/sample-receipt", label: "Sample Receipt" },
                      { to: "/operations/quotation", label: "Quotation" },
                      { to: "/operations/stock-receipt-issue", label: "Stock Receipt/Issue" },
                      { to: "/operations/stock-transfer", label: "Stock Transfer" },
                      { to: "/operations/item-splitup", label: "Item Splitup" },
                      { to: "/operations/cheque-clearing-bouncing", label: "Cheque Clearing/Bouncing" },
                      { to: "/operations/continuous-bill", label: "Continuous Bill" },
                      { to: "/operations/missing-bills", label: "Missing Bills" },
                    ].map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"
                            }`
                          }
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                    

                    {/* Opening Submenu */}
                    <li>
                      <div
                        className="flex items-center justify-between pl-12 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        onClick={() => setIsOpeningMenuOpen(!isOpeningMenuOpen)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          <span>Opening</span>
                        </div>
                        <span>
                          {isOpeningMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      </div>

                      {isOpeningMenuOpen && (
                        <ul className="mt-1 space-y-0.5 submenu-enter">
                          <li>
                            <NavLink to="/operations/opening/ledger-balance" className="block pl-16 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 transition-all duration-200">
                              Ledger Balance
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/operations/opening/stock" className="block pl-16 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 transition-all duration-200">
                              Stock
                            </NavLink>
                          </li>

                          {/* Bills */}
                          <li>
                            <div
                              className="flex items-center justify-between pl-16 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 cursor-pointer transition-all duration-200"
                              onClick={() => setIsBillsSubMenuOpen(!isBillsSubMenuOpen)}
                            >
                              <span>Bills</span>
                              <span>
                                {isBillsSubMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </span>
                            </div>

                            {isBillsSubMenuOpen && (
                              <ul className="mt-1 space-y-0.5 submenu-enter">
                                <li>
                                  <NavLink to="/operations/opening/bills/sales" className="block pl-20 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-blue-50 transition-all duration-200">
                                    Sales
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink to="/operations/opening/bills/purchase" className="block pl-20 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-blue-50 transition-all duration-200">
                                    Purchase
                                  </NavLink>
                                </li>
                              </ul>
                            )}
                          </li>

                          <li>
                            <NavLink to="/operations/opening/sales-point" className="block pl-16 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 transition-all duration-200">
                              Sales Point
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* PURCHASES */}
              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 cursor-pointer transition-all duration-300 group relative text-sm
                  ${
                    location.pathname.startsWith("/purchases")
                      ? "bg-blue-50 text-[#0052CC] font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#0052CC]"
                  }`}
                  onClick={() =>
                    !collapsed && setIsPurchaseMenuOpen(!isPurchaseMenuOpen)
                  }
                >
                  <ShoppingCart size={18} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">Purchases</span>
                      {isPurchaseMenuOpen ? <ChevronDown size={16} className="transition-transform duration-200" /> : <ChevronRight size={16} className="transition-transform duration-200" />}
                    </>
                  )}
                  {collapsed && <div className={tooltipClass}>Purchases</div>}
                </div>

                {!collapsed && isPurchaseMenuOpen && (
                  <ul className="mt-1 space-y-0.5 submenu-enter">
                    {[
                      { to: "/purchases", label: "Purchase" },
                      { to: "/purchases/return", label: "Purchase Return" },
                      { to: "/purchases/order", label: "Purchase Order" },
                    ].map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.to === "/purchases"}
                          className={({ isActive }) =>
                            `flex items-center justify-between pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"}`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            <span>{item.label}</span>
                          </div>
                          <Plus size={16} className="text-gray-400 hover:text-blue-600 transition-colors duration-200" />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <NavLink to="/sales" className={getNavItemClass}>
                  <CircleDollarSign size={18} />
                  {!collapsed && <span>Sales</span>}
                  {collapsed && <div className={tooltipClass}>Sales</div>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/inventory" className={getNavItemClass}>
                  <Warehouse size={18} />
                  {!collapsed && <span>Inventory</span>}
                  {collapsed && <div className={tooltipClass}>Inventory</div>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/accounting" className={getNavItemClass}>
                  <Calculator size={18} />
                  {!collapsed && <span>Accounting</span>}
                  {collapsed && <div className={tooltipClass}>Accounting</div>}
                </NavLink>
              </li>

              {/* VIEW SECTION */}
              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 cursor-pointer transition-all duration-300 group relative text-sm
                      ${
                        location.pathname.startsWith("/view")
                          ? "bg-blue-50 text-[#0052CC] font-semibold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#0052CC]"
                      }`}
                  onClick={() => !collapsed && setIsViewMenuOpen(!isViewMenuOpen)}
                >
                  <Eye size={18} />
                  {!collapsed && <span className="flex-1">View</span>}
                  {!collapsed &&
                    (isViewMenuOpen ? <ChevronDown size={16} className="transition-transform duration-200" /> : <ChevronRight size={16} className="transition-transform duration-200" />)}
                  {collapsed && <div className={tooltipClass}>View</div>}
                </div>

                {!collapsed && isViewMenuOpen && (
                  <ul className="mt-1 space-y-0.5 submenu-enter">
                    <li>
                      <NavLink
                        to="/view/balance-sheet"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        Balance Sheet
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/view/pl-account"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        P & L Account
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/view/trial-balance"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive ? "bg-blue-50 text-[#0052CC] font-medium border-l-4 border-[#0052CC]" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 hover:translate-x-1"
                          }`
                        }
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        Trial Balance
                      </NavLink>
                    </li>

                    {/* Account Book */}
                    <li>
                      <div
                        className="flex items-center justify-between pl-12 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        onClick={() => setIsAccountBookSubMenuOpen(!isAccountBookSubMenuOpen)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          <span>Account Book</span>
                        </div>
                        <span>
                          {isAccountBookSubMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      </div>

                      {isAccountBookSubMenuOpen && (
                        <ul className="mt-1 space-y-0.5 submenu-enter">
                          {[
                            { to: "/view/account-book/daily-statement", label: "Daily Statement" },
                            { to: "/view/account-book/cash-book", label: "Cash Book" },
                            { to: "/view/account-book/day-book", label: "Day Book", key: "F3" },
                            { to: "/view/account-book/ledger", label: "Ledger", key: "F12" },
                            { to: "/view/account-book/cash-flow", label: "Cash Flow", key: "F2" },
                            { to: "/view/account-book/debitors-creditors", label: "Debitors/Creditors" },
                            { to: "/view/account-book/group-summary", label: "Group Summary" },
                            { to: "/view/account-book/journal-book", label: "Journal Book" },
                            { to: "/view/account-book/yearly-ledger-book", label: "Yearly Ledger Book" },
                          ].map((item) => (
                            <li key={item.to}>
                              <NavLink
                                to={item.to}
                                className="block pl-16 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 transition-all duration-200"
                              >
                                {item.label} {item.key && <span className="text-xs text-gray-400 ml-1">({item.key})</span>}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>

                    {/* Stock Report */}
                    <li>
                      <div
                        className="flex items-center justify-between pl-12 pr-4 py-2 mx-2 rounded-lg text-sm text-gray-600 hover:text-[#0052CC] hover:bg-gray-50 cursor-pointer transition-all duration-200"
                        onClick={() => setIsStockReportSubMenuOpen(!isStockReportSubMenuOpen)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                          <span>Stock Report</span>
                        </div>
                        <span>
                          {isStockReportSubMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </span>
                      </div>

                      {isStockReportSubMenuOpen && (
                        <ul className="mt-1 space-y-0.5 submenu-enter">
                          {[
                            "Purchase Register",
                            "Sales Register",
                            "Sales Statement",
                            "Customerwise Sales",
                            "Salesmanwise Sales",
                            "Inventory Analysis",
                            "Turnover Summary",
                            "Stock Register",
                            "Stock Summary",
                            "Stock Analysis",
                            "Stock Ageing",
                            "Negative Stock Register",
                            "Closing Stock Inventory",
                          ].map((label) => (
                            <li key={label}>
                              <NavLink
                                to={`/view/stock-report/${label.toLowerCase().replace(/ /g, "-")}`}
                                className={({ isActive }) =>
                                  `block pl-16 pr-4 py-2 mx-2 rounded-lg text-sm transition-all duration-200 ${
                                    isActive ? "bg-blue-50 text-[#0052CC] font-medium" : "text-gray-600 hover:text-[#0052CC] hover:bg-gray-50"
                                  }`
                                }
                              >
                                {label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink to="/reports" className={getNavItemClass}>
                  <FileText size={18} />
                  {!collapsed && <span>Reports</span>}
                  {collapsed && <div className={tooltipClass}>Reports</div>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/settings" className={getNavItemClass}>
                  <Settings size={18} />
                  {!collapsed && <span>Settings</span>}
                  {collapsed && <div className={tooltipClass}>Settings</div>}
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Bottom User Section */}
          {!collapsed && (
            <div className="border-t border-gray-100 p-4 bg-gray-50/50 mt-auto">
              <div className="flex items-center gap-3 group cursor-pointer hover:bg-white p-2 rounded-lg transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                  <User className="text-white" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@solid.com</p>
                </div>
                <Settings className="text-gray-400 group-hover:text-blue-600 transition-colors duration-200" size={16} />
              </div>
            </div>
          )}
        </aside>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 overflow-x-hidden bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;



// import React, { useState } from "react";
// import { Outlet, NavLink, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   CircleDollarSign,
//   Warehouse,
//   Calculator,
//   FileText,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   Plus,
//   Search,
//   Bell,
//   Grid,
//   Eye,
//   Clock,
// } from "lucide-react";

// const Layout = () => {
//   const [isMastersMenuOpen, setIsMastersMenuOpen] = useState(false);
//   const [isOperationsMenuOpen, setIsOperationsMenuOpen] = useState(false);
//   const [isOpeningMenuOpen, setIsOpeningMenuOpen] = useState(false);
//   const [isBillsSubMenuOpen, setIsBillsSubMenuOpen] = useState(false);
//   const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false);
//   const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
//   const [isAccountBookSubMenuOpen, setIsAccountBookSubMenuOpen] = useState(false);
//   const [isStockReportSubMenuOpen, setIsStockReportSubMenuOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   // ZOHO EXACT COLORS & STYLES
//   const getNavItemClass = ({ isActive }) => `
//     flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-200 group relative text-[13px]
//     ${
//       isActive
//         ? "bg-[#eef2ff] text-[#2563eb] font-semibold border-l-[3px] border-l-[#2563eb]"
//         : "text-gray-600 hover:bg-gray-100"
//     }
//   `;

//   const tooltipClass =
//     "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-sm";

//   return (
//     <div className="min-h-screen flex flex-col bg-white font-sans">
//       {/* ===== HEADER - ZOHO NAVY TOP BAR (Height reduced to 48px) ===== */}
//       {/* ===== HEADER - RESTORED BRANDING & SIZE ===== */}
//       <header className="h-14 bg-[#1f2937] flex items-center justify-between px-4 sticky top-0 z-30 shadow-md">
//         <div className="flex items-center gap-6">
//           {/* Brand Logo & Name */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
//               <Package className="text-white" size={20} />
//             </div>
//             <span className="font-bold text-lg text-white tracking-tight">Inventory</span>
//           </div>

//           {/* Search Bar */}
//           <div className="relative group ml-4 hidden md:block">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//             <input
//               type="text"
//               placeholder="Search in Invoices ( / )"
//               className="w-[350px] pl-10 pr-4 py-1.5 bg-[#374151] border-none rounded text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//             />
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="hidden sm:flex items-center text-gray-300 gap-1 cursor-pointer hover:text-white px-2 py-1 rounded hover:bg-gray-700 transition-colors">
//             <span className="text-sm font-medium">Solid Solutions</span>
//             <ChevronDown size={14} />
//           </div>
//           <button className="bg-[#2563eb] hover:bg-blue-700 text-white p-1.5 rounded-md transition-all shadow-sm">
//             <Plus size={18} />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-white transition-colors">
//             <Bell size={20} />
//           </button>
//           <button className="p-2 text-gray-400 hover:text-white transition-colors">
//             <Settings size={20} />
//           </button>
//           <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer border-2 border-gray-500">
//             SS
//           </div>
//         </div>
//       </header>

//       {/* ===== MAIN ===== */}
//       <div className="flex flex-1">
//         {/* ===== SIDEBAR - LIGHT GRAY ZOHO STYLE ===== */}
//         <aside
//           className={`bg-[#f9fafb] border-r border-gray-200 flex flex-col transition-all duration-300 sticky top-14 h-[calc(100vh-56px)] overflow-y-auto shrink-0
//           ${collapsed ? "w-13" : "w-60"}`}
//         >
//           <nav className="flex-1 py-3">
//             <ul>
//               <li>
//                 <NavLink to="/dashboard" className={getNavItemClass}>
//                   <LayoutDashboard size={18} />
//                   {!collapsed && <span>Dashboard</span>}
//                   {collapsed && <div className={tooltipClass}>Dashboard</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/items" className={getNavItemClass}>
//                   <Package size={18} />
//                   {!collapsed && <span>Items</span>}
//                   {collapsed && <div className={tooltipClass}>Items</div>}
//                 </NavLink>
//               </li>

//               {/* MASTERS */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 group relative text-[13px]
//                         ${
//                           location.pathname.startsWith("/masters")
//                             ? "bg-[#eef2ff] text-[#2563eb] font-semibold border-l-[3px] border-l-[#2563eb]"
//                             : "text-gray-600 hover:bg-gray-100"
//                         }`}
//                   onClick={() =>
//                     !collapsed && setIsMastersMenuOpen(!isMastersMenuOpen)
//                   }
//                 >
//                   <Grid size={18} />
//                   {!collapsed && <span className="flex-1">Masters</span>}
//                   {!collapsed &&
//                     (isMastersMenuOpen ? (
//                       <ChevronDown size={14} />
//                     ) : (
//                       <ChevronRight size={14} />
//                     ))}
//                   {collapsed && <div className={tooltipClass}>Masters</div>}
//                 </div>

//                 {!collapsed && isMastersMenuOpen && (
//                   <ul className="bg-white py-1">
//                     {[
//                       { to: "/masters/category-groups", label: "Category Groups" },
//                       { to: "/masters/categories", label: "Categories" },
//                       { to: "/masters/brand-names", label: "Brand Names" },
//                       { to: "/masters/items", label: "Items" },
//                       { to: "/masters/units", label: "Units" },
//                       { to: "/masters/godowns", label: "Godowns" },
//                       { to: "/masters/employees", label: "Employees" },
//                       { to: "/masters/designations", label: "Designations" },
//                       { to: "/masters/ledger-groups", label: "Ledger Groups" },
//                       { to: "/masters/areas", label: "Areas" },
//                     ].map((item) => (
//                       <li key={item.to}>
//                         <NavLink
//                           to={item.to}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-12 pr-4 py-2 text-[13px] transition-colors
//                                ${isActive ? "text-[#2563eb] font-medium bg-[#f0f7ff]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
//                           }
//                         >
//                           {item.label}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               {/* OPERATIONS */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 group relative text-[13px]
//                       ${
//                         location.pathname.startsWith("/operations")
//                           ? "bg-[#eef2ff] text-[#2563eb] font-semibold border-l-[3px] border-l-[#2563eb]"
//                           : "text-gray-600 hover:bg-gray-100"
//                       }`}
//                   onClick={() =>
//                     !collapsed && setIsOperationsMenuOpen(!isOperationsMenuOpen)
//                   }
//                 >
//                   <FileText size={18} />
//                   {!collapsed && <span className="flex-1">Operations</span>}
//                   {!collapsed &&
//                     (isOperationsMenuOpen ? (
//                       <ChevronDown size={14} />
//                     ) : (
//                       <ChevronRight size={14} />
//                     ))}
//                   {collapsed && <div className={tooltipClass}>Operations</div>}
//                 </div>

//                 {!collapsed && isOperationsMenuOpen && (
//                   <ul className="bg-white py-1">
//                     {[
//                       { to: "/operations/vouchers", label: "Vouchers" },
//                       { to: "/operations/sample-issue", label: "Sample Issue" },
//                       { to: "/operations/sample-receipt", label: "Sample Receipt" },
//                       { to: "/operations/quotation", label: "Quotation" },
//                       { to: "/operations/stock-receipt-issue", label: "Stock Receipt/Issue" },
//                       { to: "/operations/stock-transfer", label: "Stock Transfer" },
//                       { to: "/operations/item-splitup", label: "Item Splitup" },
//                       { to: "/operations/cheque-clearing-bouncing", label: "Cheque Clearing/Bouncing" },
//                       { to: "/operations/continuous-bill", label: "Continuous Bill" },
//                       { to: "/operations/missing-bills", label: "Missing Bills" },
//                     ].map((item) => (
//                       <li key={item.to}>
//                         <NavLink
//                           to={item.to}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-12 pr-4 py-2 text-[13px] transition-colors ${
//                               isActive ? "text-[#2563eb] font-medium bg-[#f0f7ff]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
//                             }`
//                           }
//                         >
//                           {item.label}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               {/* PURCHASES */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 group relative text-[13px]
//                   ${
//                     location.pathname.startsWith("/purchases")
//                       ? "bg-[#eef2ff] text-[#2563eb] font-semibold border-l-[3px] border-l-[#2563eb]"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                   onClick={() =>
//                     !collapsed && setIsPurchaseMenuOpen(!isPurchaseMenuOpen)
//                   }
//                 >
//                   <ShoppingCart size={18} />
//                   {!collapsed && (
//                     <>
//                       <span className="flex-1">Purchases</span>
//                       {isPurchaseMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
//                     </>
//                   )}
//                   {collapsed && <div className={tooltipClass}>Purchases</div>}
//                 </div>

//                 {!collapsed && isPurchaseMenuOpen && (
//                   <ul className="bg-white py-1">
//                     {[
//                       { to: "/purchases", label: "Purchase" },
//                       { to: "/purchases/return", label: "Purchase Return" },
//                       { to: "/purchases/order", label: "Purchase Order" },
//                     ].map((item) => (
//                       <li key={item.to}>
//                         <NavLink
//                           to={item.to}
//                           end={item.to === "/purchases"}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-12 pr-4 py-2 text-[13px] transition-colors ${isActive ? "text-[#2563eb] font-medium bg-[#f0f7ff]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`
//                           }
//                         >
//                           <span>{item.label}</span>
//                           <Plus size={14} className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100" />
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <NavLink to="/sales" className={getNavItemClass}>
//                   <CircleDollarSign size={18} />
//                   {!collapsed && <span>Sales</span>}
//                   {collapsed && <div className={tooltipClass}>Sales</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/inventory" className={getNavItemClass}>
//                   <Warehouse size={18} />
//                   {!collapsed && <span>Inventory</span>}
//                   {collapsed && <div className={tooltipClass}>Inventory</div>}
//                 </NavLink>
//               </li>

//               <li>
//                 <NavLink to="/accounting" className={getNavItemClass}>
//                   <Calculator size={18} />
//                   {!collapsed && <span>Accounting</span>}
//                   {collapsed && <div className={tooltipClass}>Accounting</div>}
//                 </NavLink>
//               </li>

//               {/* VIEW SECTION */}
//               <li>
//                 <div
//                   className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 group relative text-[13px]
//                       ${
//                         location.pathname.startsWith("/view")
//                           ? "bg-[#eef2ff] text-[#2563eb] font-semibold border-l-[3px] border-l-[#2563eb]"
//                           : "text-gray-600 hover:bg-gray-100"
//                       }`}
//                   onClick={() => !collapsed && setIsViewMenuOpen(!isViewMenuOpen)}
//                 >
//                   <Eye size={18} />
//                   {!collapsed && <span className="flex-1">View</span>}
//                   {!collapsed &&
//                     (isViewMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
//                   {collapsed && <div className={tooltipClass}>View</div>}
//                 </div>

//                 {!collapsed && isViewMenuOpen && (
//                   <ul className="bg-white py-1">
//                     {["Balance Sheet", "P & L Account", "Trial Balance"].map((label) => (
//                       <li key={label}>
//                         <NavLink
//                           to={`/view/${label.toLowerCase().replace(/ /g, "-")}`}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 pl-12 pr-4 py-2 text-[13px] transition-colors ${
//                               isActive ? "text-[#2563eb] font-medium bg-[#f0f7ff]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
//                             }`
//                           }
//                         >
//                           {label}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>

//               <li>
//                 <NavLink to="/settings" className={getNavItemClass}>
//                   <Settings size={18} />
//                   {!collapsed && <span>Settings</span>}
//                   {collapsed && <div className={tooltipClass}>Settings</div>}
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>

//           {/* SIDEBAR FOOTER TOGGLE */}
//           <div className="mt-auto border-t border-gray-200 p-2">
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="w-full flex justify-center p-2 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//             </button>
//           </div>
//         </aside>

//         {/* ===== PAGE CONTENT ===== */}
//         <main className="flex-1 overflow-x-hidden bg-white">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
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
} from "lucide-react";

const Layout = () => {
  const [isMastersMenuOpen, setIsMastersMenuOpen] = useState(false);
  const [isOperationsMenuOpen, setIsOperationsMenuOpen] = useState(false);
  const [isOpeningMenuOpen, setIsOpeningMenuOpen] = useState(false);
  const [isBillsSubMenuOpen, setIsBillsSubMenuOpen] = useState(false);

  const [isPurchaseMenuOpen, setIsPurchaseMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const getNavItemClass = ({ isActive }) => `
    flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
    ${
      isActive
        ? "bg-blue-600 text-white font-medium shadow-sm"
        : "text-slate-300 hover:bg-slate-700 hover:text-white"
    }
  `;

  const tooltipClass =
    "absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-sm";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ===== HEADER ===== */}
      <header className="h-[60px] bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
            <Grid size={20} />
          </button>
          <span className="font-bold text-xl text-gray-800 tracking-tight">
            Inventory
          </span>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Settings size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>

          <div className="h-6 w-px bg-gray-200 mx-2"></div>

          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      {/* ===== MAIN ===== */}
      <div className="flex flex-1">
        {/* ===== SIDEBAR ===== */}
        <aside
          className={`bg-[#1e293b] text-white flex flex-col transition-all duration-300 border-r border-slate-700 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto shrink-0
          ${collapsed ? "w-16" : "w-52"}`}
        >
          {/* Sidebar Header / Toggle */}
          <div
            className={`flex items-center h-14 border-b border-slate-700 shrink-0 ${collapsed ? "justify-center" : "px-4"}`}
          >
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              {collapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
            {!collapsed && (
              <span className="font-semibold text-lg tracking-wide ml-3">
                Menu
              </span>
            )}
          </div>

          <nav className="flex-1 py-2">
            <ul>
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

              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
                        ${
                          location.pathname.startsWith("/masters")
                            ? "bg-blue-600 text-white font-medium"
                            : "text-slate-300 hover:bg-slate-700 hover:text-white"
                        }`}
                  onClick={() =>
                    !collapsed && setIsMastersMenuOpen(!isMastersMenuOpen)
                  }
                >
                  <Grid size={18} />

                  {!collapsed && <span className="flex-1">Masters</span>}
                  {!collapsed &&
                    (isMastersMenuOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}

                  {collapsed && <div className={tooltipClass}>Masters</div>}
                </div>

                {!collapsed && isMastersMenuOpen && (
                  <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
                    <li>
                      <NavLink
                        to="/masters/category-groups"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
                               ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Category Groups
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/categories"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
                               ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Categories
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/brand-names"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Brand Names
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/items"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Items
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/units"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Units
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/godowns"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Godowns
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/employees"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Employees
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/designations"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Designations
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/ledger-groups"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Ledger Groups
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/masters/areas"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors
           ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        Areas
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

          {/* ===== OPERATIONS SECTION ===== */}
<li>
  <div
    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
        ${
          location.pathname.startsWith("/operations")
            ? "bg-blue-600 text-white font-medium"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
        }`}
    onClick={() => !collapsed && setIsOperationsMenuOpen(!isOperationsMenuOpen)}
  >
    <FileText size={18} />
    {!collapsed && <span className="flex-1">Operations</span>}
    {!collapsed && (isOperationsMenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
    {collapsed && <div className={tooltipClass}>Operations</div>}
  </div>

  {!collapsed && isOperationsMenuOpen && (
    <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
      {/* Standard Links */}
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
              `flex items-center gap-3 pl-10 pr-4 py-2 text-sm transition-colors ${
                isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}

      {/* --- OPENING SECTION --- */}
      <li>
        <div 
          className="flex items-center justify-between pl-10 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer transition-colors"
          onClick={() => setIsOpeningMenuOpen(!isOpeningMenuOpen)}
        >
          <span>Opening</span>
          {/* ICON ADDED HERE */}
          <span className="ml-auto">
            {isOpeningMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        </div>

        {isOpeningMenuOpen && (
          <ul className="bg-white/5 py-1 border-l border-slate-700 ml-6">
            <li>
              <NavLink to="/operations/opening/ledger-balance" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white">
                Ledger Balance
              </NavLink>
            </li>
            <li>
              <NavLink to="/operations/opening/stock" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white">
                Stock
              </NavLink>
            </li>

            {/* Level 3: Bills */}
            <li>
              <div 
                className="flex items-center justify-between pl-4 pr-4 py-2 text-sm text-slate-400 hover:text-white cursor-pointer"
                onClick={() => setIsBillsSubMenuOpen(!isBillsSubMenuOpen)}
              >
                <span>Bills</span>
                {/* ICON ADDED HERE */}
                <span className="ml-auto">
                  {isBillsSubMenuOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </div>
              
              {isBillsSubMenuOpen && (
                <ul className="bg-black/40 py-1 border-l border-blue-500/30 ml-2">
                  <li>
                    <NavLink to="/operations/opening/bills/sales" className="block pl-6 py-2 text-sm text-slate-400 hover:text-blue-400">
                      Sales
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/operations/opening/bills/purchase" className="block pl-6 py-2 text-sm text-slate-400 hover:text-blue-400">
                      Purchase
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/operations/opening/sales-point" className="block pl-4 py-2 text-sm text-slate-400 hover:text-white">
                Sales Point
              </NavLink>
            </li>
          </ul>
        )}
      </li>
    </ul>
  )}
</li>
              <li>
                <div
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200 group relative text-sm
                  ${
                    location.pathname.startsWith("/purchases")
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                  onClick={() =>
                    !collapsed && setIsPurchaseMenuOpen(!isPurchaseMenuOpen)
                  }
                >
                  <ShoppingCart size={18} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">Purchases</span>
                      {isPurchaseMenuOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </>
                  )}
                  {collapsed && <div className={tooltipClass}>Purchases</div>}
                </div>
                {!collapsed && isPurchaseMenuOpen && (
                  <ul className="bg-[#0f172a] border-t border-slate-700 py-1">
                    <li>
                      <NavLink
                        to="/purchases"
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        <span>Purchase</span>
                        <Plus
                          size={16}
                          className="ml-auto hover:text-blue-400"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/purchases/return"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        <span>Purchase Return</span>
                        <Plus
                          size={16}
                          className="ml-auto hover:text-blue-400"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/purchases/order"
                        className={({ isActive }) =>
                          `flex items-center gap-3 pl-12 pr-4 py-2 text-sm transition-colors ${isActive ? "text-blue-400 font-medium" : "text-slate-400 hover:text-white"}`
                        }
                      >
                        <span>Purchase Order</span>
                        <Plus
                          size={16}
                          className="ml-auto hover:text-blue-400"
                        />
                      </NavLink>
                    </li>
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
        </aside>

        {/* ===== PAGE CONTENT ===== */}
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6 z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>&copy; 2026 Inventory System. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#help" className="hover:text-blue-600 transition-colors">
              Help
            </a>
            <a
              href="#privacy"
              className="hover:text-blue-600 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Plus, 
  FileText, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  Truck
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalStockValue: 0,
    totalSales: 0,
    totalPurchases: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    monthlySales: 0,
    monthlyPurchases: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set mock data
      setStats({
        totalItems: 1247,
        totalStockValue: 125430.50,
        totalSales: 89450.75,
        totalPurchases: 67230.25,
        lowStockItems: 23,
        pendingOrders: 15,
        monthlySales: 12450.50,
        monthlyPurchases: 8750.25
      });

      setRecentActivities([
        { id: 1, action: 'New Sale', description: 'Invoice #SA-2026-001 created', time: '2 minutes ago', type: 'sale' },
        { id: 2, action: 'New Purchase', description: 'Invoice #PU-2026-001 created', time: '15 minutes ago', type: 'purchase' },
        { id: 3, action: 'Low Stock Alert', description: 'Item #IT-2026-001 stock is low', time: '1 hour ago', type: 'alert' },
        { id: 4, action: 'Inventory Update', description: 'Stock adjusted for Item #IT-2026-002', time: '2 hours ago', type: 'inventory' },
        { id: 5, action: 'Payment Received', description: 'Payment received from Customer ABC', time: '3 hours ago', type: 'payment' }
      ]);

      setIsLoading(false);
    };

    loadData();
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, color, isLoading }) => (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="bg-gray-100 rounded w-24 h-8 mt-2 mb-1"></div>
            </div>
          ) : (
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {typeof value === 'number' && (title.toLowerCase().includes('value') || title.toLowerCase().includes('sales') || title.toLowerCase().includes('purchases')) 
                ? `$${value.toLocaleString()}` 
                : value}
            </h3>
          )}
        </div>
        <div className={`p-2 rounded-md ${color} bg-opacity-10`}>
          <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
      </div>
      
      {/* Trend / Footer */}
      <div className="mt-2">
        {isLoading ? (
           <div className="bg-gray-100 rounded w-16 h-3 animate-pulse"></div>
        ) : (
          trend ? (
            <div className={`flex items-center text-xs font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
              <span>{Math.abs(trend)}%</span>
              <span className="text-gray-400 ml-1 font-normal">vs last month</span>
            </div>
          ) : (
            <div className="text-xs text-gray-400">Updated just now</div>
          )
        )}
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => {
    const getIcon = (type) => {
      switch (type) {
        case 'sale': return <TrendingUp size={16} className="text-green-600" />;
        case 'purchase': return <ShoppingCart size={16} className="text-blue-600" />;
        case 'alert': return <AlertTriangle size={16} className="text-red-600" />;
        case 'inventory': return <Package size={16} className="text-orange-600" />;
        case 'payment': return <CreditCard size={16} className="text-purple-600" />;
        default: return <Activity size={16} className="text-gray-600" />;
      }
    };

    return (
      <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
        <div className="mt-1 mr-3 p-2 bg-gray-100 rounded-full">{getIcon(activity.type)}</div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{activity.action}</div>
          <div className="text-xs text-gray-500 mt-0.5">{activity.description}</div>
        </div>
        <div className="text-xs text-gray-400 whitespace-nowrap ml-2">{activity.time}</div>
      </div>
    );
  };

return (
  <div className="w-full px-6 py-6 bg-gray-50 min-h-screen">

    {/* Page Header */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your inventory performance</p>
      </div>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 shadow-sm flex items-center gap-2">
          <FileText size={16} /> Reports
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2">
          <Plus size={16} /> New Transaction
        </button>
      </div>
    </div>

    {/* Section 1: Sales & Purchase Activity */}
    <div className="mb-8">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Sales & Purchase Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Monthly Sales" value={stats.monthlySales} icon={TrendingUp} trend={12.5} color="bg-green-500 text-green-600" isLoading={isLoading} />
        <StatCard title="Monthly Purchases" value={stats.monthlyPurchases} icon={ShoppingCart} trend={8.2} color="bg-blue-500 text-blue-600" isLoading={isLoading} />
        <StatCard title="Total Sales" value={stats.totalSales} icon={DollarSign} color="bg-indigo-500 text-indigo-600" isLoading={isLoading} />
        <StatCard title="Total Purchases" value={stats.totalPurchases} icon={CreditCard} color="bg-orange-500 text-orange-600" isLoading={isLoading} />
      </div>
    </div>

    {/* Section 2: Inventory Summary */}
    <div className="mb-8">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Inventory Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Items" value={stats.totalItems} icon={Package} color="bg-teal-500 text-teal-600" isLoading={isLoading} />
        <StatCard title="Total Stock Value" value={stats.totalStockValue} icon={BarChart3} color="bg-purple-500 text-purple-600" isLoading={isLoading} />
        <StatCard title="Low Stock Items" value={stats.lowStockItems} icon={AlertTriangle} color="bg-red-500 text-red-600" isLoading={isLoading} />
        <StatCard title="Pending Orders" value={stats.pendingOrders} icon={Clock} color="bg-yellow-500 text-yellow-600" isLoading={isLoading} />
      </div>
    </div>

    {/* === SPLIT SECTION STARTS HERE === */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT: Recent Activities */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Activities</h3>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>

        <div className="p-4">
          {isLoading ? (
            <div className="animate-pulse">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="bg-gray-200 rounded-full w-8 h-8 mr-3"></div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded w-32 h-4 mb-2"></div>
                    <div className="bg-gray-200 rounded w-48 h-3"></div>
                  </div>
                  <div className="bg-gray-200 rounded w-16 h-3"></div>
                </div>
              ))}
            </div>
          ) : (
            recentActivities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </div>
      </div>

      {/* RIGHT: Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-fit">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Quick Actions</h3>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2 group-hover:bg-blue-200">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">New Sale</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group">
            <div className="p-3 bg-green-100 text-green-600 rounded-full mb-2 group-hover:bg-green-200">
              <ShoppingCart size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">New Purchase</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-all group">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-2 group-hover:bg-purple-200">
              <Package size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Add Item</span>
          </button>

          <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-full mb-2 group-hover:bg-orange-200">
              <Truck size={20} />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Delivery</span>
          </button>
        </div>
      </div>

    </div>
    {/* === SPLIT SECTION ENDS HERE === */}

  </div>
);

};

export default Dashboard;

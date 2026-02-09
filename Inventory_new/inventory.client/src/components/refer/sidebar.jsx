import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Patients", icon: Users },
  { name: "Case Assessment", icon: ClipboardList },
  { name: "Reports", icon: FileText },
  { name: "Settings", icon: Settings },
];

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-[#1f2937] text-white flex flex-col transition-all duration-300
      ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-gray-700">
        {!collapsed && (
          <span className="font-semibold text-lg tracking-wide">
            Ayurvedic ERP
          </span>
        )}
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu */}
      <div className="flex-1 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer
              transition-colors
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <Icon size={20} />
              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

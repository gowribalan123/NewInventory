import React, { useState } from "react";
import {
  Save,
  X,
  User,
  ChevronRight,
  ChevronDown,
  Shield,
  Folder,
  FolderOpen,
} from "lucide-react";

export default function UserPrivileges() {
  const [selectedUser, setSelectedUser] = useState("");
  const [expandedNodes, setExpandedNodes] = useState(new Set(["privileges", "setup"]));
  const [checkedNodes, setCheckedNodes] = useState(new Set());

  const MOCK_USERS = [
    "SHAHIL",
    "Sales User",
    "Inventory User",
    "Accountant",
    "Cashier",
    "Store Manager",
  ];

  // Tree structure with all privileges
  const privilegesTree = {
    id: "privileges",
    label: "Privileges",
    children: [
      {
        id: "setup",
        label: "Setup",
        children: [
          {
            id: "category",
            label: "Category",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "item",
            label: "Item",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "group-setup",
            label: "Group Setup",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "brand",
            label: "Brand",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "unit",
            label: "Unit",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "godown",
            label: "Godown",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "employee",
            label: "Employee",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "ledger",
            label: "Ledger",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
        ],
      },
      {
        id: "operations",
        label: "Operations",
        children: [
          {
            id: "voucher",
            label: "Voucher",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "purchase",
            label: "Purchase",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "sales",
            label: "Sales",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "stock-transfer",
            label: "Stock Transfer",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
          {
            id: "quotation",
            label: "Quotation",
            permissions: ["save", "edit", "show", "print", "delete"],
          },
        ],
      },
      {
        id: "reports",
        label: "Reports",
        children: [
          {
            id: "balance-sheet",
            label: "Balance Sheet",
            permissions: ["show", "print"],
          },
          {
            id: "profit-loss",
            label: "Profit & Loss",
            permissions: ["show", "print"],
          },
          {
            id: "stock-report",
            label: "Stock Report",
            permissions: ["show", "print"],
          },
          {
            id: "ledger-report",
            label: "Ledger Report",
            permissions: ["show", "print"],
          },
        ],
      },
    ],
  };

  const toggleExpand = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const toggleCheck = (checkId) => {
    const newChecked = new Set(checkedNodes);
    if (newChecked.has(checkId)) {
      newChecked.delete(checkId);
    } else {
      newChecked.add(checkId);
    }
    setCheckedNodes(newChecked);
  };

  const handleSelectAll = () => {
    // Collect all checkable IDs
    const allIds = new Set();
    const collectIds = (node) => {
      if (node.permissions) {
        node.permissions.forEach((perm) => {
          allIds.add(`${node.id}-${perm}`);
        });
      }
      if (node.children) {
        node.children.forEach(collectIds);
      }
    };
    privilegesTree.children.forEach(collectIds);
    setCheckedNodes(allIds);
  };

  const handleClearAll = () => {
    setCheckedNodes(new Set());
  };

  const handleSave = () => {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }
    console.log("Saving privileges for:", selectedUser, Array.from(checkedNodes));
    alert(`Privileges saved for ${selectedUser}!`);
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const hasPermissions = node.permissions && node.permissions.length > 0;

    return (
      <div key={node.id}>
        {/* Node Header */}
        <div
          className={`flex items-center gap-2 py-2 hover:bg-blue-50 rounded transition-colors`}
          style={{ paddingLeft: `${level * 24 + 8}px` }}
        >
          {/* Expand/Collapse Button */}
          {hasChildren && (
            <button
              onClick={() => toggleExpand(node.id)}
              className="p-0.5 hover:bg-blue-100 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-600" />
              ) : (
                <ChevronRight size={16} className="text-gray-600" />
              )}
            </button>
          )}
          {!hasChildren && <div className="w-5" />}

          {/* Node Checkbox (for parent nodes) */}
          {!hasPermissions && (
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
          )}

          {/* Folder Icon */}
          {hasChildren ? (
            isExpanded ? (
              <FolderOpen size={16} className="text-blue-500" />
            ) : (
              <Folder size={16} className="text-blue-500" />
            )
          ) : (
            <Folder size={16} className="text-gray-400" />
          )}

          {/* Node Label */}
          <span className="text-sm font-medium text-gray-700">
            {node.label}
          </span>
        </div>

        {/* Permissions */}
        {hasPermissions && (
          <div
            className="space-y-1.5 mt-1"
            style={{ paddingLeft: `${(level + 1) * 24 + 8}px` }}
          >
            {node.permissions.map((perm) => {
              const checkId = `${node.id}-${perm}`;
              return (
                <label
                  key={perm}
                  className="flex items-center gap-2 py-1 hover:bg-blue-50 rounded cursor-pointer transition-colors"
                >
                  <div className="w-5 flex justify-center">
                    <div className="w-px h-3 bg-gray-300"></div>
                  </div>
                  <input
                    type="checkbox"
                    checked={checkedNodes.has(checkId)}
                    onChange={() => toggleCheck(checkId)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <Folder size={14} className="text-blue-400" />
                  <span className="text-sm text-gray-700 capitalize">
                    {perm}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* Children Nodes */}
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  User Privileges
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Admin Control
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage user access rights and permissions
                </p>
              </div>
            </div>
          </div>

          {/* User Selection */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="max-w-md">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none"
                >
                  <option value="">Select User</option>
                  {MOCK_USERS.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Access Control Tree
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAll}
                className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Privileges Tree */}
          <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
              {privilegesTree.children.map((child) => renderNode(child, 0))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span className="font-semibold text-gray-700">
                {checkedNodes.size}
              </span>{" "}
              permissions selected
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedUser("");
                  setCheckedNodes(new Set());
                }}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <X size={18} />
                <span className="text-sm">Cancel</span>
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
              >
                <Save size={18} />
                <span className="text-sm">Save Privileges</span>
              </button>
            </div>
          </div>
        </div>

        {/* Custom Scrollbar Style */}
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e0;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #a0aec0;
          }
        `}</style>
      </div>
    </div>
  );
}
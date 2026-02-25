import React, { useState } from "react";
import {
  Save,
  X,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  RotateCcw,
  Users,
} from "lucide-react";

export default function User() {
  const [formData, setFormData] = useState({
    userName: "",
    newPassword: "",
    confirmPassword: "",
    displaySundryDebtors: false,
    displaySundryCreditors: false,
    displayBankLedgers: false,
    displaySalaryLedgers: false,
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const MOCK_USERS = [
    "Sales User",
    "Inventory User",
    "Accountant",
    "Cashier",
    "Store Manager",
    "Purchase Manager",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName) {
      newErrors.userName = "User name is required";
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saving user:", formData);
      alert("User settings saved successfully!");
    }
  };

  const handleClear = () => {
    setFormData({
      userName: "",
      newPassword: "",
      confirmPassword: "",
      displaySundryDebtors: false,
      displaySundryCreditors: false,
      displayBankLedgers: false,
      displaySalaryLedgers: false,
    });
    setErrors({});
  };

  const input =
    "px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder-gray-400 transition-all";
  const label = "text-sm font-semibold text-gray-700 mb-1.5";

  const ledgerOptions = [
    { name: "displaySundryDebtors", label: "Display Sundry Debtors" },
    { name: "displaySundryCreditors", label: "Display Sundry Creditors" },
    { name: "displayBankLedgers", label: "Display Bank Ledgers" },
    { name: "displaySalaryLedgers", label: "Display Salary Ledgers" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Users className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  User Management
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                    Admin Control
                  </span>
                </h2>
                <p className="text-xs text-blue-100 mt-0.5">
                  Manage user credentials and permissions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClear}
                className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 border border-white/30"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* User Name */}
              <div>
                <label className={label}>
                  User Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className={`${input} pl-10 appearance-none cursor-pointer ${
                      errors.userName ? "border-red-500" : ""
                    }`}
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
                {errors.userName && (
                  <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className={label}>New Password</label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`${input} pl-10 pr-10 ${
                      errors.newPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className={label}>Confirm Password</label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${input} pl-10 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Display Options */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  Ledger Display Permissions
                </h3>
                <div className="space-y-3">
                  {ledgerOptions.map((option) => (
                    <label
                      key={option.name}
                      className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        name={option.name}
                        checked={formData[option.name]}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-all"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              onClick={handleClear}
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
              <span className="text-sm">Save Changes</span>
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                User Permissions
              </h4>
              <p className="text-xs text-blue-700">
                Enable ledger display options to control which financial data this user can view in reports and statements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
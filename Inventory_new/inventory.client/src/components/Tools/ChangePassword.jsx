import React, { useState } from "react";
import { Save, RefreshCcw, X } from "lucide-react";

/**
 * ChangePassword.jsx
 * Windows classic style UI based on your screenshot
 * Same structure pattern as RestoreDatabase.jsx
 * You can later plug into your AuthService / UserService
 */

export default function ChangePassword() {
  const [form, setForm] = useState({
    userName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!form.userName || !form.oldPassword || !form.newPassword) {
      alert("Please fill required fields");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Change password request", form);

    // integrate later
    // AuthService.changePassword(form)
  };

  const handleReset = () => {
    setForm({
      userName: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      {/* Window */}
      <div className="w-[500px] bg-slate-200 border border-slate-400 shadow-xl">

        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 flex items-center justify-between">
          <span className="text-sm font-semibold">Change Password</span>
          <button className="hover:bg-red-500 px-2">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex justify-end gap-2 p-2 border-b bg-slate-300">
          <button onClick={handleSave} title="Save">
            <Save className="w-5 h-5 cursor-pointer" />
          </button>

          <button onClick={handleReset} title="Reset">
            <RefreshCcw className="w-5 h-5 cursor-pointer" />
          </button>

          <button title="Close">
            <X className="w-5 h-5 cursor-pointer text-red-600" />
          </button>
        </div>

        {/* Form Area */}
        <div className="p-6 bg-slate-300 border m-3">

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 items-center">

            {/* User Name */}
            <label className="text-blue-800 font-semibold text-sm">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="border border-slate-500 px-2 py-1 bg-slate-100"
            />

            {/* Old Password */}
            <label className="text-sm">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              className="border border-slate-500 px-2 py-1 bg-slate-100"
            />

            {/* New Password */}
            <label className="text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="border border-slate-500 px-2 py-1 bg-slate-100"
            />

            {/* Confirm Password */}
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-slate-500 px-2 py-1 bg-slate-100"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

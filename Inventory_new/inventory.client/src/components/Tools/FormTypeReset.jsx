import React, { useState } from "react";
import { Search, RotateCcw, X } from "lucide-react";

/**
 * FormTypeReset.jsx
 * Replicates the exact layout from your screenshot
 * Financial Year Reset / Ledger Reset Screen
 */

export default function FormTypeReset() {
  const [form, setForm] = useState({
    fromDatabase: "SiftProfitPlus",
    toDatabase: "SiftProfitPlus",
    fromCompany: "",
    toCompany: "Demo",
    fromDate: "",
    toDate: "",
    resetType: "Reset Ledger Balance",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    console.log("Reset clicked", form);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      {/* Window */}
      <div className="w-[900px] bg-slate-200 border border-slate-400 shadow-xl">

        {/* Title bar */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-3 py-1 flex justify-between">
          <span className="text-sm font-semibold">Form Type</span>
          <X className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Main content */}
        <div className="p-4 bg-slate-300 border m-2">

          {/* Top section */}
          <div className="grid grid-cols-2 gap-4">

            {/* From Section */}
            <div className="border p-3 bg-slate-200">

              <div className="grid grid-cols-[140px_1fr_auto] gap-2 items-center">

                <label className="font-semibold text-sm">From Database</label>
                <select
                  name="fromDatabase"
                  value={form.fromDatabase}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white"
                >
                  <option>SiftProfitPlus</option>
                </select>

                <div />

                <label className="text-sm">Company Name</label>
                <input
                  name="fromCompany"
                  value={form.fromCompany}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white"
                />

                <Search className="w-4 h-4 cursor-pointer" />

                <label className="text-sm">Financial Year</label>
                <div />
                <div />

                <label className="text-sm pl-4">From Date:</label>
                <input
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white"
                />

                <div />

                <label className="text-sm pl-4">To Date:</label>
                <input
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white"
                />

              </div>

            </div>

            {/* To Section */}
            <div className="border p-3 bg-slate-200">

              <div className="grid grid-cols-[140px_1fr] gap-2 items-center">

                <label className="font-semibold text-sm">To Database</label>
                <input
                  name="toDatabase"
                  value={form.toDatabase}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white"
                />

                <label className="text-sm">Company Name</label>
                <input
                  name="toCompany"
                  value={form.toCompany}
                  onChange={handleChange}
                  className="border px-2 py-1 bg-white text-blue-700 font-semibold"
                />

                <label className="text-sm">Financial Year</label>
                <div />

                <label className="text-sm pl-4">From Date:</label>
                <input
                  value="01-Jan-2025"
                  readOnly
                  className="border px-2 py-1 bg-white text-blue-700"
                />

                <label className="text-sm pl-4">To Date:</label>
                <input
                  value="31-Dec-2025"
                  readOnly
                  className="border px-2 py-1 bg-white text-blue-700"
                />

              </div>

            </div>

          </div>

          {/* Reset Controls */}
          <div className="flex items-center gap-4 mt-4">

            <label className="text-sm">Reset Type</label>

            <select
              name="resetType"
              value={form.resetType}
              onChange={handleChange}
              className="border px-2 py-1 bg-white"
            >
              <option>Reset Ledger Balance</option>
              <option>Reset All</option>
            </select>

            <button
              onClick={handleReset}
              className="border px-6 py-1 bg-slate-200 hover:bg-slate-300 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> RESET
            </button>

          </div>

          {/* Table */}
          <div className="mt-4 border bg-white h-[300px]">

            <div className="grid grid-cols-4 border-b bg-slate-200 text-sm font-semibold text-red-700">
              <div className="border-r px-2">Acc. Name</div>
              <div className="border-r px-2">Amount</div>
              <div className="border-r px-2">Acc. Name</div>
              <div className="px-2">Amount</div>
            </div>

            {/* Empty body */}

          </div>

        </div>

      </div>

    </div>
  );
}

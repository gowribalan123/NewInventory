import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function VoucherIndex() {
  const navigate = useNavigate();

  // TEMP DATA (replace later with API)
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      type: "Receipt",
      voucherNo: "RV-001",
      date: "2026-02-04",
      amount: 5000,
      narration: "Cash received",
    },
    {
      id: 2,
      type: "Payment",
      voucherNo: "PV-002",
      date: "2026-02-05",
      amount: 1200,
      narration: "Office supplies",
    },
  ]);

  const handleDelete = (idToDelete) => {
    // In a real app, you'd likely want a confirmation modal here.
    // e.g., if (window.confirm('Are you sure?')) { ... }
    setVouchers(vouchers.filter((voucher) => voucher.id !== idToDelete));
  };

  return (
    <div className="space-y-6">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Vouchers</h1>
          <p className="text-sm text-gray-500">
            Create and manage accounting vouchers
          </p>
        </div>

        <button
          onClick={() => navigate("/operations/vouchers/new")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          <Plus size={16} />
          New Voucher
        </button>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Voucher Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>All</option>
              <option>Receipt</option>
              <option>Payment</option>
              <option>Journal</option>
              <option>Contra</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              From Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              To Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-end">
            <button className="px-4 py-2 border rounded-md text-sm">
              Filter
            </button>
          </div>

        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Voucher No</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Narration</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {vouchers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No vouchers found
                </td>
              </tr>
            )}

            {vouchers.map((v) => (
              <tr
                key={v.id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2">{v.date}</td>
                <td className="px-4 py-2">{v.voucherNo}</td>
                <td className="px-4 py-2">{v.type}</td>
                <td className="px-4 py-2">{v.narration}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {v.amount.toFixed(2)}
                </td>

                {/* ACTION (NO flex on td) */}
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        navigate(`/operations/vouchers/${v.id}/edit`)
                      }
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(v.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

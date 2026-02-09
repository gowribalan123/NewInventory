import React, { useState } from "react";
import {
  Search,
  Save,
  ArrowLeft,
  CheckCircle2,
  Star,
  Award,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesPointIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Point to Currency conversion rate (e.g., 1 point = ₹0.50)
  const POINT_CONVERSION_RATE = 0.5;

  // Initial State based on your Ledger structure
  const [pointData, setPointData] = useState([
    { id: 1, accountHead: "A/C'S & TV'S", points: 0 },
    { id: 2, accountHead: "ABINASH LOAN", points: 0 },
    { id: 3, accountHead: "GENERAL CUSTOMER A", points: 100 },
    { id: 4, accountHead: "LOYALTY MEMBER B", points: 250 },
    { id: 5, accountHead: "ABU THALIB SALARY", points: 0 },
  ]);

  const handlePointChange = (id, value) => {
    const updatedData = pointData.map((item) => {
      if (item.id === id) {
        return { ...item, points: value === "" ? 0 : parseInt(value) };
      }
      return item;
    });
    setPointData(updatedData);
  };

  const handleSave = () => {
    console.log("Opening Points Saved:", pointData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const filteredData = pointData.filter((item) =>
    item.accountHead.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Total Calculations
  const totalPoints = filteredData.reduce((sum, item) => sum + item.points, 0);
  const totalPointValue = totalPoints * POINT_CONVERSION_RATE;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-sm">
      <div className="max-w-[98%] mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
        {/* Header Bar - Modern Zoho Style */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 rounded-xl">
                <Award size={20} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 leading-tight">
                  Opening Points
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Customer Reward Balances
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {showSuccess && (
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold animate-pulse">
                <CheckCircle2 size={16} /> Saved!
              </div>
            )}
            <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
              Opening Mode
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50/30">
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search Account Head..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Conversion Rate:{" "}
              <span className="font-bold text-slate-700">
                1 Point = ₹{POINT_CONVERSION_RATE.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-slate-500 font-bold text-xs uppercase">
                  <th className="py-3 px-4">Account Head</th>
                  <th className="py-3 px-4 text-center">Points</th>
                  <th className="py-3 px-4 text-right">Value (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-amber-50 rounded text-amber-500">
                          <Star size={14} />
                        </div>
                        <span>{item.accountHead}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        value={item.points}
                        onChange={(e) =>
                          handlePointChange(item.id, e.target.value)
                        }
                        className="w-24 text-center bg-white border-none focus:border focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none px-3 py-1.5 rounded text-sm font-bold text-indigo-600"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-slate-500 font-mono">
                      ₹ {(item.points * POINT_CONVERSION_RATE).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Action Bar */}
          <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-bold text-slate-600 text-xs hover:bg-slate-50 transition-colors"
            >
              <RotateCcw size={16} /> Reset
            </button>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">
                  Total Points
                </span>
                <div className="text-xl font-black text-slate-800">
                  {totalPoints}{" "}
                  <span className="text-sm font-medium text-slate-400">
                    pts
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="text-right mr-2">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">
                  Total Value
                </span>
                <div className="text-xl font-black text-indigo-600">
                  ₹{" "}
                  {totalPointValue.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 font-bold text-white text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
              >
                <Save size={18} /> Save Points
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPointIndex;

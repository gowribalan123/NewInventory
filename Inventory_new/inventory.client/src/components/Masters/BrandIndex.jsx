import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Tag, Save, RotateCcw } from "lucide-react";

// IMPORTANT: Check your 'dotnet run' output for the correct port (e.g., 7123, 5001, etc.)
const API_URL = "http://localhost:5166/api/Brands"; 

function BrandIndex() {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= LOAD BRANDS =================
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!brandName.trim()) return;

    try {
      let response;
      if (editId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brandId: editId,
            brandName: brandName,
          }),
        });
      } else {
        // CREATE
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brandName: brandName,
            userId: 1, // Hardcoded for now
            companyId: 1 // Hardcoded for now
          }),
        });
      }

      if (response.ok) {
        setBrandName("");
        setEditId(null);
        fetchBrands();
      } else {
        alert("Failed to save brand. Server returned an error.");
      }
    } catch (error) {
      console.error("Error saving brand:", error);
      alert("Failed to save brand. Please check if the backend is running and the port is correct.");
    }
  };

  // ================= EDIT =================
  const handleEdit = (brand) => {
    setBrandName(brand.brandName);
    setEditId(brand.brandId);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBrands();
      } else {
        alert("Failed to delete brand.");
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleClear = () => {
    setBrandName("");
    setEditId(null);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Tag size={14} className="text-yellow-400" /> Brand Master
            </h1>
          </div>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Form Section */}
          <div className="bg-white p-3 border border-blue-200 rounded shadow-sm mb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Brand Name</span>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Enter brand name"
                  className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-8 flex justify-end gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-3 py-1 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  <RotateCcw size={14} strokeWidth={2.5} className="text-red-500" /> CLEAR
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-1 rounded bg-emerald-600 font-black text-white text-[11px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide"
                >
                  <Save size={16} strokeWidth={2.5} /> {editId ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                  <th className="p-2 border-r border-slate-200">Brand Name</th>
                  <th className="p-2 w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brands.map((brand) => (
                  <tr key={brand.brandId} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">
                      {brand.brandName}
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(brand)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.brandId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {brands.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-xs text-slate-400">
                      No brands found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandIndex;

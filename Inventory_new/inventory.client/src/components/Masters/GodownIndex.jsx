import React, { useState, useEffect } from "react";
import { Warehouse, Save, RotateCcw, Pencil, Trash2 } from 'lucide-react';

const API_URL = "http://localhost:5166/api/Godowns";

function GodownIndex() {
  const [form, setForm] = useState({
    godownName: "",
    location: "",
    isGodown: true,
    vanRegNo: "",
    isClosed: false
  });

  const [godowns, setGodowns] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGodowns();
  }, []);

  const fetchGodowns = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setGodowns(data);
      }
    } catch (error) {
      console.error("Error fetching godowns:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSave = async () => {
    if (!form.godownName.trim()) return;

    const payload = {
      ...form,
      companyID: 1, // Hardcoded
      userID: 1     // Hardcoded
    };

    try {
      let response;
      if (editId) {
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, godownID: editId }),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        handleClear();
        fetchGodowns();
      } else {
        alert("Failed to save godown.");
      }
    } catch (error) {
      console.error("Error saving godown:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      godownName: item.godownName || "",
      location: item.location || "",
      isGodown: item.isGodown,
      vanRegNo: item.vanRegNo || "",
      isClosed: item.isClosed
    });
    setEditId(item.godownID);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) fetchGodowns();
    } catch (error) {
      console.error("Error deleting godown:", error);
    }
  };

  const handleClear = () => {
    setForm({
      godownName: "",
      location: "",
      isGodown: true,
      vanRegNo: "",
      isClosed: false
    });
    setEditId(null);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Warehouse size={14} className="text-yellow-400" /> Godown / Location Master
            </h1>
          </div>
        </div>
    

        <div>
        <div className="p-2 bg-[#e2ebf8]">
          {/* Form Section */}
          <div className="bg-white p-3 border border-blue-200 rounded shadow-sm mb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Name</span>
                <input
                  name="godownName"
                  value={form.godownName}
                  onChange={handleChange}
                  placeholder="Godown Name"
                  className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Location</span>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-4 flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" name="isGodown" checked={form.isGodown} onChange={handleChange} className="rounded text-blue-600" />
                  Is Godown
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" name="isClosed" checked={form.isClosed} onChange={handleChange} className="rounded text-red-600" />
                  Is Closed
                </label>
              </div>
              
              <div className="md:col-span-12 flex justify-end gap-2 mt-2">
                <button onClick={handleClear} className="flex items-center gap-1.5 px-3 py-1 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                  <RotateCcw size={14} strokeWidth={2.5} className="text-red-500" /> CLEAR
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-1 rounded bg-emerald-600 font-black text-white text-[11px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide">
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
                  <th className="p-2 border-r border-slate-200">Name</th>
                  <th className="p-2 border-r border-slate-200">Location</th>
                  <th className="p-2 border-r border-slate-200 w-24 text-center">Type</th>
                  <th className="p-2 w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {godowns.map((item) => (
                  <tr key={item.godownID} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">{item.godownName}</td>
                    <td className="p-2 border-r border-slate-100 text-xs text-slate-600">{item.location || "-"}</td>
                    <td className="p-2 border-r border-slate-100 text-xs text-center text-slate-600">{item.isGodown ? "Godown" : "Other"}</td>
                    <td className="p-2 text-center flex justify-center gap-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(item.godownID)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GodownIndex;
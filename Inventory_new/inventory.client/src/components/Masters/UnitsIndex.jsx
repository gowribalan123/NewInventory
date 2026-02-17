import React, { useState } from "react";
import { Pencil, Trash2, RotateCcw } from "lucide-react";

function UnitsIndex() {
  const [form, setForm] = useState({
    name: "",
    measure: "",
  });

  const [editingUnit, setEditingUnit] = useState(null);

  const [units, setUnits] = useState([
    { id: 1, name: "Kg", measure: 1 },
    { id: 2, name: "Lot", measure: 1 },
    { id: 3, name: "Meter", measure: 1 },
    { id: 4, name: "Nos", measure: 1 },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name) return;

    if (editingUnit) {
      setUnits(
        units.map((u) => (u.id === editingUnit.id ? { ...u, ...form } : u))
      );
    } else {
      setUnits([
        ...units,
        { id: Date.now(), name: form.name, measure: form.measure || 1 },
      ]);
    }
    handleClear();
  };

  const handleDelete = (id) => {
    setUnits(units.filter((u) => u.id !== id));
  };

  const handleEdit = (unit) => {
    setEditingUnit(unit);
    setForm({ name: unit.name, measure: unit.measure });
  };

  const handleClear = () => {
    setForm({ name: "", measure: "" });
    setEditingUnit(null);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .table-row-hover:hover { background: linear-gradient(90deg, #EFF6FF 0%, #DBEAFE 100%); transform: translateX(2px); transition: all 0.2s ease; }
        .premium-shadow { box-shadow: 0 1px 3px rgba(0, 82, 204, 0.08), 0 1px 2px rgba(0, 82, 204, 0.06); }
        .premium-shadow-lg { box-shadow: 0 4px 6px -1px rgba(0, 82, 204, 0.1), 0 2px 4px -1px rgba(0, 82, 204, 0.06); }
      `}</style>

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              Unit Setup
              <span className="text-xs font-normal text-gray-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Master</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Create and manage measurement units</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleClear} className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
              <RotateCcw size={16} className="text-gray-600 group-hover:text-blue-600" />
            </button>
          </div>
        </div>
      </header>

      {/* FORM */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in">
        <div className="flex items-end gap-4">
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter unit name" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1 block">Measure</label>
              <input name="measure" type="number" value={form.measure} onChange={handleChange} placeholder="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleClear} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">{editingUnit ? "Cancel" : "Clear"}</button>
            <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">{editingUnit ? "Update" : "Save"}</button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl premium-shadow-lg overflow-hidden border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Unit Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Measure</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-b border-gray-100 table-row-hover">
                <td className="px-6 py-3 text-sm text-gray-800 font-medium">{unit.name}</td>
                <td className="px-6 py-3 text-sm text-gray-600">{unit.measure}</td>
                <td className="px-6 py-3 text-right">
                    <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => handleEdit(unit)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id)}
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
    </div>
  );
}

export default UnitsIndex;

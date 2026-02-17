import { useState } from "react";
import { Pencil, Trash2, Briefcase, Save, RotateCcw } from "lucide-react";

export default function DesignationIndex() {
  const [designation, setDesignation] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [designations, setDesignations] = useState([
    { id: 1, name: "SALESMAN" },
    { id: 2, name: "TECHNICIAN" },
    { id: 3, name: "SALES ENGINEER" },
  ]);

  const handleSave = () => {
    if (!designation.trim()) return;

    if (editingId) {
      setDesignations((prev) =>
        prev.map((d) =>
          d.id === editingId ? { ...d, name: designation } : d
        )
      );
    } else {
      setDesignations((prev) => [
        ...prev,
        { id: Date.now(), name: designation },
      ]);
    }

    handleClear();
  };

  const handleEdit = (d) => {
    setDesignation(d.name);
    setEditingId(d.id);
  };

  const handleDelete = (id) => {
    setDesignations((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClear = () => {
    setDesignation("");
    setEditingId(null);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Briefcase size={14} className="text-yellow-400" /> Designation Master
            </h1>
          </div>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Form Section */}
          <div className="bg-white p-3 border border-blue-200 rounded shadow-sm mb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Designation</span>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Enter designation"
                  className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-8 flex justify-end gap-2">
                <button onClick={handleClear} className="flex items-center gap-1.5 px-3 py-1 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                  <RotateCcw size={14} strokeWidth={2.5} className="text-red-500" /> CLEAR
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-1 rounded bg-emerald-600 font-black text-white text-[11px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide">
                  <Save size={16} strokeWidth={2.5} /> {editingId ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                  <th className="p-2 border-r border-slate-200">Designation</th>
                  <th className="p-2 w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {designations.map((d) => (
                  <tr key={d.id} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">{d.name}</td>
                    <td className="p-2 text-center flex justify-center gap-2">
                      <button onClick={() => handleEdit(d)} className="text-blue-600 hover:text-blue-800"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

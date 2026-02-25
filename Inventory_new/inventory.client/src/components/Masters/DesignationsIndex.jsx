import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, Briefcase, Save, RotateCcw } from "lucide-react";

// IMPORTANT: Check your 'dotnet run' output for the correct port (e.g., 7123, 5001, etc.)
const API_URL = "http://localhost:5166/api/Designations";

export default function DesignationIndex() {
  const [designationName, setDesignationName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [designations, setDesignations] = useState([]);

  const fetchDesignations = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setDesignations(data);
      } else {
        console.error("Failed to fetch designations");
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  }, []);

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  const handleSave = async () => {
    if (!designationName.trim()) return;

    const designationData = {
      designationName: designationName,
      // financialYearId: 1 // Can be set if required by the form
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(designationData),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(designationData),
        });
      }

      if (response.ok) {
        handleClear();
        fetchDesignations();
      } else {
        alert("Failed to save designation. Server returned an error.");
      }
    } catch (error) {
      console.error("Error saving designation:", error);
      alert(
        "Failed to save designation. Please check if the backend is running and the port is correct."
      );
    }
  };

  const handleEdit = (d) => {
    setDesignationName(d.designationName);
    setEditingId(d.designationId);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this designation?"))
      return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchDesignations();
      } else {
        alert("Failed to delete designation.");
      }
    } catch (error) {
      console.error("Error deleting designation:", error);
    }
  };

  const handleClear = () => {
    setDesignationName("");
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
                  value={designationName}
                  onChange={(e) => setDesignationName(e.target.value)}
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
                {designations.length > 0 ? (
                  designations.map((d) => (
                    <tr
                      key={d.designationId}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">
                        {d.designationName}
                      </td>
                      <td className="p-2 text-center flex justify-center gap-2">
                        <button onClick={() => handleEdit(d)} className="text-blue-600 hover:text-blue-800"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(d.designationId)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="2" className="p-4 text-center text-xs text-slate-400">No designations found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

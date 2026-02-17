import React, { useState, useEffect } from "react";
import { Pencil, Trash2, FolderTree, Save, RotateCcw } from "lucide-react";

// IMPORTANT: Check your 'dotnet run' output for the correct port (e.g., 7123, 5001, etc.)
const API_URL = "http://localhost:5166/api/CategoryGroups"; 

function CategoryGroupIndex() {
  const [categoryGroupName, setCategoryGroupName] = useState("");
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= LOAD CATEGORY GROUPS =================
  useEffect(() => {
    fetchCategoryGroups();
  }, []);

  const fetchCategoryGroups = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCategoryGroups(data);
      }
    } catch (error) {
      console.error("Error fetching category groups:", error);
    }
  };

  // ================= SAVE =================
  const handleSave = async () => {
    if (!categoryGroupName.trim()) return;

    try {
      let response;
      const payload = {
        categoryGroupName: categoryGroupName
      };

      if (editId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, categoryGroupId: editId }),
        });
      } else {
        // CREATE
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        handleClear();
        fetchCategoryGroups();
      } else {
        alert("Failed to save category group. Server returned an error.");
      }
    } catch (error) {
      console.error("Error saving category group:", error);
      alert("Failed to save category group. Please check if the backend is running and the port is correct.");
    }
  };

  // ================= EDIT =================
  const handleEdit = (group) => {
    setCategoryGroupName(group.categoryGroupName);
    setEditId(group.categoryGroupId);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category group?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCategoryGroups();
      } else {
        alert("Failed to delete category group.");
      }
    } catch (error) {
      console.error("Error deleting category group:", error);
    }
  };

  const handleClear = () => {
    setCategoryGroupName("");
    setEditId(null);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <FolderTree size={14} className="text-yellow-400" /> Category Groups
            </h1>
          </div>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Form Section */}
          <div className="bg-white p-3 border border-blue-200 rounded shadow-sm mb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Group Name</span>
                <input
                  type="text"
                  value={categoryGroupName}
                  onChange={(e) => setCategoryGroupName(e.target.value)}
                  placeholder="Enter group name"
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
                  <th className="p-2 border-r border-slate-200">Group Name</th>
                  <th className="p-2 w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryGroups.map((group) => (
                  <tr key={group.categoryGroupId} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">
                      {group.categoryGroupName}
                    </td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(group)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(group.categoryGroupId)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categoryGroups.length === 0 && (
                  <tr>
                    <td colSpan="2" className="p-4 text-center text-xs text-slate-400">
                      No category groups found
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

export default CategoryGroupIndex;
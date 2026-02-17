import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

const API_URL = "http://localhost:5166/api/Categories";
const GROUP_API_URL = "http://localhost:5166/api/CategoryGroups";

function CategoryIndex() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryGroupId, setCategoryGroupId] = useState("");
  
  const [categories, setCategories] = useState([]);
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [editId, setEditId] = useState(null);

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchCategories();
    fetchCategoryGroups();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCategoryGroups = async () => {
    try {
      const response = await fetch(GROUP_API_URL);
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
    if (!categoryName.trim() || !categoryGroupId) {
      alert("Please enter a name and select a group.");
      return;
    }

    try {
      let response;
      const payload = {
        categoryName,
        categoryCode,
        categoryGroupId: parseInt(categoryGroupId)
      };

      if (editId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, categoryId: editId }),
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
        fetchCategories();
      } else {
        alert("Failed to save category.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setCategoryName(item.categoryName);
    setCategoryGroupId(item.categoryGroupId);
    setEditId(item.categoryId);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCategories();
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleClear = () => {
    setCategoryName("");
    setCategoryGroupId("");
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        <p className="text-sm text-gray-500">Manage item categories</p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
            <select
              value={categoryGroupId}
              onChange={(e) => setCategoryGroupId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select Group</option>
              {categoryGroups.map((g) => (
                <option key={g.categoryGroupId} value={g.categoryGroupId}>{g.categoryGroupName}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3 flex justify-start gap-2">
            <button onClick={handleClear} className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">Clear</button>
            <button onClick={handleSave} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">{editId ? "Update" : "Save"}</button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Category Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Group</th>
              <th className="px-4 py-3 text-right font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.categoryId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.categoryName}</td>
                <td className="px-4 py-3 text-gray-500">{item.categoryGroupName || item.categoryGroup?.categoryGroupName || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-800"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(item.categoryId)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && <tr><td colSpan="3" className="px-4 py-6 text-center text-gray-400">No categories found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryIndex;
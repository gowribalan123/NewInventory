import { useState, useEffect } from "react";

export default function CategoriesForm({ onSave, editingCategory, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    group: "",
  });

  const input =
    "h-9 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  useEffect(() => {
    if (editingCategory) {
      setFormData({ name: editingCategory.name, group: editingCategory.group });
    } else {
      setFormData({ name: "", group: "" });
    }
  }, [editingCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.name && formData.group) {
      onSave({ id: editingCategory?.id, ...formData });
      setFormData({ name: "", group: "" });
    }
  };

  const handleAutofill = () => {
    const dummyData = [
      { name: "Tablets", group: "Electronics" },
      { name: "Chairs", group: "Furniture" },
      { name: "Jeans", group: "Clothing" },
      { name: "Headphones", group: "Electronics" },
      { name: "Monitors", group: "Electronics" },
      { name: "Beds", group: "Furniture" },
    ];
    const random = dummyData[Math.floor(Math.random() * dummyData.length)];
    setFormData(random);
  };

  const handleClear = () => {
    setFormData({ name: "", group: "" });
    if (editingCategory) {
      onCancel();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {editingCategory ? "Edit Category" : "Category Name"}
        </h2>
        <button 
          onClick={handleAutofill}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Autofill Dummy Data
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-4 mb-6">
        {/* CATEGORY NAME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">
            Category Name
          </label>

          <div className="md:col-span-2 flex gap-2">
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              className={`${input} flex-1`}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CATEGORY GROUP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">
            Category Group
          </label>

          <div className="md:col-span-2 flex gap-2">
            <select 
              name="group" 
              className={` flex-1`}
              value={formData.group}
              onChange={handleChange}
            >
              <option value="">Select category group</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Stationery">Stationery</option>
              <option value="Groceries">Groceries</option>
              <option value="HDCVI CAMERA">HDCVI CAMERA</option>
              <option value="IP CAMERA">IP CAMERA</option>
              <option value="POE SWITCH">POE SWITCH</option>
            </select>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button 
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
        >
          {editingCategory ? "Cancel" : "Clear"}
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {editingCategory ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}

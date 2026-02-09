import { useState, useEffect } from "react";

export default function CategoryGrpForm({ onSave, editingGroup, onCancel }) {
  const [name, setName] = useState("");
  const input =
    "h-9 px-3 border border-gray-300 rounded text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  useEffect(() => {
    if (editingGroup) {
      setName(editingGroup.name);
    } else {
      setName("");
    }
  }, [editingGroup]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({ id: editingGroup?.id, name });
      setName("");
    }
  };

  const handleAutofill = () => {
    const dummyNames = ["Automotive", "Toys", "Books", "Sports", "Health", "Beauty"];
    const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    setName(randomName);
  };

  const handleClear = () => {
    setName("");
    if (editingGroup) {
      onCancel();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {editingGroup ? "Edit Category Group" : "Category Group"}
        </h2>
        <button 
          onClick={handleAutofill}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Autofill Dummy Data
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <label className="text-sm font-medium text-gray-700">
          Group Name
        </label>

        <div className="md:col-span-2 flex gap-2">
          <input
            type="text"
            placeholder="Enter category group name"
            className={`${input} flex-1`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button 
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100"
        >
          {editingGroup ? "Cancel" : "Clear"}
        </button>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {editingGroup ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}

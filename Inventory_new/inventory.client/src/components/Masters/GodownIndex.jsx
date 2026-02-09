import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

function GodownIndex() {
  const [form, setForm] = useState({
    name: "",
    location: "",
  });

  const [editingGodown, setEditingGodown] = useState(null);

  const [godowns, setGodowns] = useState([
    { id: 1, name: "GODOWN", location: "Main Store" },
  ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name) return;
    if (editingGodown) {
      setGodowns(
        godowns.map((g) => (g.id === editingGodown.id ? { ...g, ...form } : g))
      );
    } else {
      setGodowns([
        ...godowns,
        {
          id: Date.now(),
          name: form.name,
          location: form.location,
        },
      ]);
    }
    handleClear();
  };

  const handleDelete = (id) => {
    setGodowns(godowns.filter((g) => g.id !== id));
  };

  const handleEdit = (godown) => {
    setEditingGodown(godown);
    setForm({ name: godown.name, location: godown.location });
  };

  const handleClear = () => {
    setForm({ name: "", location: "" });
    setEditingGodown(null);
  };

 

  return (
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Godown Names
        </h2>
        <p className="text-sm text-gray-500">
          Create and manage storage locations
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800">
            Godown
          </h3>
          
        </div>

        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-2 text-sm text-gray-700">
            Godown Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter godown name"
            className="col-span-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <label className="col-span-2 text-sm text-gray-700">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="col-span-4 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
          >
            {editingGodown ? "Cancel" : "Clear"}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            {editingGodown ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Godown Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
                     {godowns.map((g) => (
                        <tr key={g.id} className="border-b border-gray-200 last:border-none hover:bg-gray-50">
                            <td className="px-4 py-2">{g.name}</td>
                            <td className="px-4 py-2">{g.location}</td>

                            <td className="px-4 py-2 text-right">
                            <div className="flex justify-end gap-3">
                                <button 
                                  onClick={() => handleEdit(g)}
                                  className="text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                <Pencil size={16} />
                                </button>
                                <button
                                onClick={() => handleDelete(g.id)}
                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                >
                                <Trash2 size={16} />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}


            {godowns.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No godowns added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GodownIndex;

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Unit Setup</h2>
        <p className="text-sm text-gray-500">
          Create and manage measurement units
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-md font-semibold text-gray-800 mb-4">
          Unit
        </h3>

        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-2 text-sm text-gray-700">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter unit name"
            className="col-span-6 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <label className="col-span-2 text-sm text-gray-700">
            Measure
          </label>
          <input
            name="measure"
            type="number"
            value={form.measure}
            onChange={handleChange}
            placeholder="1"
            className="col-span-2 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
          >
            {editingUnit ? "Cancel" : "Clear"}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            {editingUnit ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Unit Name</th>
              <th className="px-4 py-2 text-left">Measure</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-b border-gray-200 last:border-none hover:bg-gray-50">
                <td className="px-4 py-2">{unit.name}</td>
                <td className="px-4 py-2">{unit.measure}</td>
                <td className="px-4 py-2 text-right ">
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
            {units.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No units added
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitsIndex;

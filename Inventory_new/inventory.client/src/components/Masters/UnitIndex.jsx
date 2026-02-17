import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

const API_URL = "http://localhost:5166/api/Units";

function UnitIndex() {
  const [unitName, setUnitName] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [units, setUnits] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setUnits(data);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  };

  const handleSave = async () => {
    if (!unitName.trim()) return;

    const payload = {
      unitName,
      multiplier: multiplier !== "" && multiplier !== null ? parseFloat(multiplier) : null,
      companyId: 1, // Hardcoded
      userId: 1     // Hardcoded
    };

    try {
      let response;
      if (editId) {
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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
        fetchUnits();
      } else {
        alert("Failed to save unit.");
      }
    } catch (error) {
      console.error("Error saving unit:", error);
    }
  };

  const handleEdit = (unit) => {
    setUnitName(unit.unitName);
    setMultiplier(unit.multiplier !== null && unit.multiplier !== undefined ? unit.multiplier : "");
    setEditId(unit.unitId);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) fetchUnits();
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
  };

  const handleClear = () => {
    setUnitName("");
    setMultiplier("");
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Units</h2>
        <p className="text-sm text-gray-500">Manage measurement units</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Name</label>
            <input
              type="text"
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Kg"
            />
          </div>
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Multiplier</label>
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="1"
            />
          </div>
          <div className="col-span-4 flex justify-end gap-2">
            <button onClick={handleClear} className="px-3 py-2 border border-gray-300 rounded-md text-sm">Clear</button>
            <button onClick={handleSave} className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm">{editId ? "Update" : "Save"}</button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Unit Name</th>
              <th className="px-4 py-3 text-left">Multiplier</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.unitId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{unit.unitName}</td>
                <td className="px-4 py-3">{unit.multiplier !== null && unit.multiplier !== undefined ? unit.multiplier : "-"}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleEdit(unit)} className="text-blue-600"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(unit.unitId)} className="text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnitIndex;
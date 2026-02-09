import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Designations
        </h2>
        <p className="text-sm text-gray-500">
          Create and manage employee designations
        </p>
      </div>

      {/* ===== FORM CARD ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h3 className="text-sm font-medium text-gray-700 mb-4">
          Designation
        </h3>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Designation
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="Enter designation"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {designations.map((d) => (
              <tr
                key={d.id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2">{d.name}</td>

                {/* IMPORTANT: NO flex on td */}
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(d)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
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
  );
}

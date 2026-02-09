import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function AreaIndex() {
  const [areaName, setAreaName] = useState("");
  const [areas, setAreas] = useState([
    { id: 1, name: "North Zone" },
    { id: 2, name: "South Zone" },
  ]);
  const [editId, setEditId] = useState(null);

  const handleSave = () => {
    if (!areaName.trim()) return;

    if (editId) {
      // update
      setAreas(
        areas.map((a) =>
          a.id === editId ? { ...a, name: areaName } : a
        )
      );
    } else {
      // create
      setAreas([
        ...areas,
        { id: Date.now(), name: areaName },
      ]);
    }

    handleClear();
  };

  const handleEdit = (area) => {
    setAreaName(area.name);
    setEditId(area.id);
  };

  const handleDelete = (id) => {
    setAreas(areas.filter((a) => a.id !== id));
  };

  const handleClear = () => {
    setAreaName("");
    setEditId(null);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Areas</h2>
        <p className="text-sm text-gray-500">
          Create and manage area names
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area Name
            </label>
            <input
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              placeholder="Enter area name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="col-span-8 flex justify-end gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              {editId ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-full px-4 py-3 text-left font-medium text-gray-600">Area Name</th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {areas.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No areas added
                </td>
              </tr>
            )}

            {areas.map((area) => (
              <tr
                key={area.id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-800">{area.name}</td>

                {/* IMPORTANT: NO flex on td */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(area)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(area.id)}
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

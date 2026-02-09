import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

function BrandIndex() {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([
    "NETGEAR",
    "CAN",
    "CAPITAL",
    "LINKSYS",
    "FLIR",
    "ALCATEL",
    "MICROSENSE",
    "LENOVO",
  ]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (!brandName.trim()) return;

    if (editIndex !== null) {
      const updated = [...brands];
      updated[editIndex] = brandName;
      setBrands(updated);
      setEditIndex(null);
    } else {
      setBrands([...brands, brandName]);
    }

    setBrandName("");
  };

  const handleEdit = (index) => {
    setBrandName(brands[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setBrands(brands.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setBrandName("");
    setEditIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Brand Names</h2>
        <p className="text-sm text-gray-500">
          Create and manage item brand names
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand Name
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="col-span-8 flex justify-end gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== LIST ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="w-full px-4 py-3 text-left font-medium text-gray-600">
                Brand Name
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50" >
                <td className="px-4 py-3">{brand}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-6 text-center text-gray-400">
                  No brands found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrandIndex;

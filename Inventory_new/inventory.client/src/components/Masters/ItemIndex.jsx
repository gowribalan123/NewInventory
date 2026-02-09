import React, { useState } from "react";

function ItemIndex() {
  const [form, setForm] = useState({
    partNo: "",
    sapNo: "",
    name: "",
    arabicName: "",
    category: "",
    group: "",
    brand: "",
    unit: "",
    alternateUnit: "",
    alternateQty: "",
    purchaseUnit: "",
    purchaseRate: "",
    landingRate: "",
    mrp: "",
    rack: "",
    minimumLevel: "",
    stockType: "Stock Item",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">Item Details</h2>
        <p className="text-sm text-gray-500">
          Create and manage inventory items
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-12 gap-4">
          {/* LEFT COLUMN */}
          <div className="col-span-6 space-y-3">
            {[
              ["Part No", "partNo"],
              ["SAP No", "sapNo"],
              ["Name", "name"],
              ["Arabic Name", "arabicName"],
              ["Category", "category"],
              ["Group", "group"],
              ["Brand Name", "brand"],
              ["Unit", "unit"],
              ["Alternate Unit", "alternateUnit"],
              ["Alternate Qty", "alternateQty"],
              ["Purchase Unit", "purchaseUnit"],
              ["Purchase Rate", "purchaseRate"],
              ["Landing Rate", "landingRate"],
              ["MRP", "mrp"],
              ["Rack", "rack"],
            ].map(([label, name]) => (
              <div key={name} className="grid grid-cols-12 items-center gap-3">
                <label className="col-span-4 text-sm text-gray-700">
                  {label}
                </label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="col-span-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-6 space-y-3">
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-sm text-gray-700">
                Minimum Level
              </label>
              <input
                name="minimumLevel"
                value={form.minimumLevel}
                onChange={handleChange}
                className="col-span-8 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-sm text-gray-700">
                Stock Type
              </label>
              <select
                name="stockType"
                value={form.stockType}
                onChange={handleChange}
                className="col-span-8 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option>Stock Item</option>
                <option>Non Stock Item</option>
                <option>Service</option>
              </select>
            </div>

            {/* IMAGE PLACEHOLDER */}
            <div className="mt-6 border border-dashed border-gray-300 rounded-md h-40 flex items-center justify-center text-gray-400">
              Item Image
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border rounded-md text-sm">
            Clear
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm">
            Save
          </button>
        </div>
      </div>

      {/* ===== RATE TABLE ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Rate Name</th>
              <th className="px-4 py-2 text-left">Margin %</th>
              <th className="px-4 py-2 text-left">Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              "Customer Price",
              "Technician Price",
              "Wholesale Price",
            ].map((rate) => (
              <tr key={rate} className="border-b">
                <td className="px-4 py-2">{rate}</td>
                <td className="px-4 py-2">
                  <input className="w-full px-2 py-1 border rounded" />
                </td>
                <td className="px-4 py-2">
                  <input className="w-full px-2 py-1 border rounded" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemIndex;

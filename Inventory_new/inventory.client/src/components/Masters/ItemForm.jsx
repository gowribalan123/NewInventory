import React, { useState, useEffect } from "react";

function ItemForm({ initialData, onSubmit, onCancel }) {
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

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      // Reset form for new entry
      setForm({
        partNo: "", sapNo: "", name: "", arabicName: "", category: "", group: "",
        brand: "", unit: "", alternateUnit: "", alternateQty: "", purchaseUnit: "",
        purchaseRate: "", landingRate: "", mrp: "", rack: "", minimumLevel: "",
        stockType: "Stock Item",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* ===== HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {initialData ? "Edit Item" : "New Item"}
        </h2>
        <p className="text-sm text-gray-500">
          {initialData ? "Update item details." : "Create a new inventory item."}
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {[
              ["Part No", "partNo"], ["SAP No", "sapNo"], ["Name", "name"],
              ["Arabic Name", "arabicName"], ["Category", "category"], ["Group", "group"],
              ["Brand Name", "brand"], ["Unit", "unit"],
            ].map(([label, name]) => (
              <div key={name} className="grid grid-cols-3 items-center gap-3">
                <label className="col-span-1 text-sm text-gray-700">{label}</label>
                <input
                  name={name} value={form[name] || ''} onChange={handleChange}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {[
              ["Alternate Unit", "alternateUnit"], ["Alternate Qty", "alternateQty"],
              ["Purchase Unit", "purchaseUnit"], ["Purchase Rate", "purchaseRate"],
              ["Landing Rate", "landingRate"], ["MRP", "mrp"], ["Rack", "rack"],
              ["Minimum Level", "minimumLevel"],
            ].map(([label, name]) => (
              <div key={name} className="grid grid-cols-3 items-center gap-3">
                <label className="col-span-1 text-sm text-gray-700">{label}</label>
                <input
                  name={name} value={form[name] || ''} onChange={handleChange}
                  className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="grid grid-cols-3 items-center gap-3">
              <label className="col-span-1 text-sm text-gray-700">Stock Type</label>
              <select
                name="stockType" value={form.stockType} onChange={handleChange}
                className="col-span-2 px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                <option>Stock Item</option>
                <option>Non Stock Item</option>
                <option>Service</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RATE TABLE & IMAGE ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Rate Name</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Margin %</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Rate</th>
              </tr>
            </thead>
            <tbody>
              {["Customer Price", "Technician Price", "Wholesale Price"].map((rate) => (
                <tr key={rate} className="border-b last:border-none">
                  <td className="px-4 py-2 text-gray-700">{rate}</td>
                  <td className="px-4 py-2"><input className="w-full px-2 py-1 border rounded-md" /></td>
                  <td className="px-4 py-2"><input className="w-full px-2 py-1 border rounded-md" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 h-40 lg:h-auto">
          Item Image
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-3 mt-6 bg-white border border-gray-200 rounded-lg p-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          {initialData ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
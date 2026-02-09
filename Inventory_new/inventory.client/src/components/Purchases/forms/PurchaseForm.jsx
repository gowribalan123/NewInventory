
export default function PurchaseForm() {
  const inputStyle ="h-9 px-2 border border-gray-300 rounded text-gray-800 placeholder-gray-600";

  return (
    <div className="bg-white border border-gray-300 rounded-md p-6 text-sm shadow-sm">

      {/* ===== 1. HEADER ===== */}
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Purchase Entry</h2>

      {/* ===== 2. PURCHASE INFO ===== */}
      <section className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-4">Purchase Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input className={inputStyle} placeholder="Invoice No" />
          <input className={inputStyle} type="date" />
          <select className={inputStyle}>
            <option>Bill Type</option>
            <option>Cash</option>
            <option>Credit</option>
          </select>
          <input className={inputStyle} placeholder="Godown" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input className={inputStyle} placeholder="Vendor Name" />
          <input className={inputStyle} placeholder="Address" />
        </div>

        <input className={`${inputStyle} w-full`} placeholder="Narration" />
      </section>

      {/* ===== 3. ITEM DETAILS ===== */}
      <section className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-4">Item #1 Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Item Info */}
          <input className={inputStyle} placeholder="Item Code" />
          <input className={inputStyle} placeholder="Item Name" />
          <input className={inputStyle} placeholder="Barcode" />
          <input className={inputStyle} placeholder="Unit" />
          <input className={inputStyle} placeholder="Quantity" />
          <input className={inputStyle} placeholder="Type" />
          <input className={inputStyle} placeholder="Alternate Qty" />
          <input className={inputStyle} placeholder="Purchase Unit" />
          <input className={inputStyle} placeholder="VAT %" />
          <input className={inputStyle} placeholder="Min Level" />

          {/* Pricing */}
          <input className={inputStyle} placeholder="Purchase Rate" />
          <input className={inputStyle} placeholder="MRP" />
          <input className={inputStyle} placeholder="Tax %" />
          <input className={inputStyle} placeholder="Tax Amount" />
          <input className={inputStyle} placeholder="Round Off" />
          <input className={inputStyle} placeholder="Landing Rate" />
          <input className={inputStyle} placeholder="Sales Rate" />
          <input className={inputStyle} placeholder="Stock Type" />

          {/* Dates */}
          <input className={inputStyle} type="date" placeholder="Last Purchase Date" />
          <input className={inputStyle} type="date" placeholder="Last Sales Date" />

          {/* Misc */}
          <input className={inputStyle} placeholder="Item Image URL" />
          <input className={inputStyle} placeholder="Rack" />
          <input className={inputStyle} placeholder="Total" />
          <input className={inputStyle} placeholder="Cost Price" />
          <input className={inputStyle} placeholder="Total Amount" />
          <input className={inputStyle} placeholder="Grand Total" />
          <input className={inputStyle} placeholder="Total Tax" />
          <input className={inputStyle} placeholder="Discount %" />
          <input className={inputStyle} placeholder="Discount Amount" />
          <input className={inputStyle} placeholder="Balance Amount" />
          <input className={inputStyle} placeholder="Freight" />
          <input className={inputStyle} placeholder="Other Charges" />
        </div>
      </section>

      {/* ===== 4. ACTION BUTTONS ===== */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save Purchase
        </button>
      </div>
    </div>
  );
}
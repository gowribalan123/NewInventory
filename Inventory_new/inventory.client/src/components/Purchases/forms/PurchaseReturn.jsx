import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import SearchableInput from "../../Items/forms/SearchableInput";

export default function PurchaseReturn({ onSave, onCancel, initialData }) {

  /* ================= HEADER ================= */
  const [header, setHeader] = useState({
    returnNo: initialData?.returnNo || "",
    returnDate: initialData?.returnDate || "",
    billType: initialData?.billType || "Credit",
    party: initialData?.party || "",
    godown: initialData?.godown || "",
    narration: initialData?.narration || "",
    printType: initialData?.printType || "Windows",
    copies: initialData?.copies || "1",
    language: initialData?.language || "English",
  });

  const [returnNumbers, setReturnNumbers] = useState([
    "PR-0001", "PR-0002", "PR-0003",
  ]);

  const [parties, setParties] = useState([
    "Party A", "Party B", "Party C",
  ]);

  const [godowns, setGodowns] = useState([
    "Godown A", "Godown B", "Godown C",
  ]);

  /* ================= ITEMS ================= */
  const emptyRow = {
    partNo: "",
    itemName: "",
    serialNo: "",
    unit: "",
    qty: "",
    rate: "",
    discountPercent: "",
    discountAmount: "",
    grossValue: "",
  };

  const [items, setItems] = useState(initialData?.items || [{ ...emptyRow }]);
  const MOCK_ITEMS = [
    {
      id: 1,
      itemName: "iPhone 15 Pro",
      sku: "SAP-1001",
      partNo: "IP15P-256",
      unit: "Pcs",
      purchaseRate: 900.00,
      taxPercent: 15,
      stock: 10,
      barcode: "987654321098",
      mrp: 1099.00
    },
    {
      id: 2,
      itemName: "Macbook Pro",
      sku: "SAP-1002",
      partNo: "MBP-256",
      unit: "Pcs",
      purchaseRate: 1750.00,
      taxPercent: 15,
      stock: 5,
      barcode: "987654321099",
      mrp: 2199.00
    },
    {
      id: 3,
      itemName: "Nokia Pro",
      sku: "SAP-1003",
      partNo: "NP-128",
      unit: "Pcs",
      purchaseRate: 380.00,
      taxPercent: 15,
      stock: 20,
      barcode: "987654321100",
      mrp: 549.00
    }
  ];
  const [itemSearch, setItemSearch] = useState("");
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [selectedItemToAdd, setSelectedItemToAdd] = useState(null);

  /* ================= HANDLERS ================= */
  const handleHeaderChange = (e) =>
    setHeader({ ...header, [e.target.name]: e.target.value });

  const handleItemChange = (i, e) => {
    const updated = [...items];
    updated[i][e.target.name] = e.target.value;
    setItems(updated);
  };

  const addRow = () => setItems([...items, { ...emptyRow }]);

  const removeRow = (i) => {
    if (items.length > 1) {
      setItems(items.filter((_, idx) => idx !== i));
    }
  };

  const handleAddItem = () => {
    if (selectedItemToAdd) {
      const newItem = {
        partNo: selectedItemToAdd.partNo,
        itemName: selectedItemToAdd.itemName,
        serialNo: "",
        unit: selectedItemToAdd.unit,
        qty: "1",
        rate: selectedItemToAdd.purchaseRate,
        discountPercent: "",
        discountAmount: "",
        grossValue: selectedItemToAdd.purchaseRate,
      };

      let newItems;
      if (items.length === 1 && !items[0].itemName) {
        newItems = [newItem];
      } else {
        newItems = [...items, newItem];
      }

      setItems(newItems);
      setSelectedItemToAdd(null);
      setItemSearch("");
    }
  };

  const handleSave = () => {
    onSave?.({
      ...header,
      items,
    });
  };

  const addDummyData = () => {
    setHeader({
      returnNo: "PR-" + Math.floor(Math.random() * 1000),
      returnDate: new Date().toISOString().split('T')[0],
      billType: "Credit",
      party: "Party A",
      godown: "Godown A",
      narration: "Returning damaged goods",
      printType: "Windows",
      copies: "1",
      language: "English",
    });

    setItems([
      {
        partNo: "IP15P-256",
        itemName: "iPhone 15 Pro",
        serialNo: "SN12345",
        unit: "Pcs",
        qty: "1",
        rate: "900.00",
        discountPercent: "0",
        discountAmount: "0",
        grossValue: "900.00",
      },
    ]);
  };

  /* ================= STYLES ================= */
  const input =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";
  const label =
    "block text-xs font-medium text-gray-600 mb-1";
  const sectionTitle =
    "text-sm font-bold text-blue-700 uppercase border-b border-gray-200 pb-2 mb-4";
  const tableInput =
    "w-full px-2 py-1 border border-gray-200 rounded text-xs";

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">

      <div className="px-4 py-3 border-b border-gray-200 bg-blue-50 flex justify-between items-center rounded-t-lg">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{initialData ? "Edit Purchase Return" : "Purchase Return"}</h2>
          <p className="text-xs text-gray-500 mt-1">{initialData ? "Update purchase return details." : "Create a new purchase return."}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md text-sm">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm">
            Save
          </button>
        </div>
      </div>

      <div className="p-4 space-y-8">

        {/* RETURN DETAILS */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <h3 className={sectionTitle}>Return Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <SearchableInput
                label="Return No"
                name="returnNo"
                value={header.returnNo}
                onChange={handleHeaderChange}
                items={returnNumbers}
              />
            </div>

            <div>
              <label className={label}>Return Date</label>
              <input type="date" className={input} name="returnDate" value={header.returnDate} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Bill Type</label>
              <select className={input} name="billType" value={header.billType} onChange={handleHeaderChange}>
                <option>Credit</option>
                <option>Cash</option>
              </select>
            </div>

            <div>
              <SearchableInput
                label="Party"
                name="party"
                value={header.party}
                onChange={handleHeaderChange}
                items={parties}
              />
            </div>

            <div>
              <SearchableInput
                label="Godown"
                name="godown"
                value={header.godown}
                onChange={handleHeaderChange}
                items={godowns}
              />
            </div>

            <div>
              <label className={label}>Print Type</label>
              <select className={input} name="printType" value={header.printType} onChange={handleHeaderChange}>
                <option>Windows</option>
                <option>Dos</option>
              </select>
            </div>

            <div>
              <label className={label}>Copies</label>
              <input className={input} name="copies" value={header.copies} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Language</label>
              <select className={input} name="language" value={header.language} onChange={handleHeaderChange}>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <label className={label}>Narration</label>
              <input className={input} name="narration" value={header.narration} onChange={handleHeaderChange} />
            </div>

          </div>
        </div>

        {/* ITEM GRID */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <h3 className={sectionTitle}>Returned Items</h3>
          <div className="flex gap-2 items-end mb-4 w-full md:w-1/2">
            <div className="relative flex-1">
              <label className={label}>Add Item</label>

              <input
                className={input}
                placeholder="Type or click to select an item"
                value={itemSearch}
                onChange={(e) => {
                  setItemSearch(e.target.value);
                  setShowItemDropdown(true);
                  setSelectedItemToAdd(null);
                }}
                onFocus={() => setShowItemDropdown(true)}
                onBlur={() => setTimeout(() => setShowItemDropdown(false), 200)}
              />

              {showItemDropdown && (
                <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-auto mt-1">
                  {MOCK_ITEMS.filter(i =>
                    i.itemName.toLowerCase().includes(itemSearch.toLowerCase())
                  ).map(item => (
                    <div
                      key={item.id}
                      className="px-3 py-2 hover:bg-blue-600 hover:text-white cursor-pointer border-b group"
                      onClick={() => {
                        setSelectedItemToAdd(item);
                        setItemSearch(item.itemName);
                        setShowItemDropdown(false);
                      }}
                    >
                      <div className="font-medium text-sm">{item.itemName}</div>
                      <div className="text-xs text-gray-500 group-hover:text-blue-100 flex justify-between">
                        <span>{item.sku}</span>
                        <span>Stock: {item.stock} {item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleAddItem}
              disabled={!selectedItemToAdd}
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors h-[38px] ${
                selectedItemToAdd ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              + Add
            </button>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "Part No","Item Name","Serial No","Unit","Qty",
                    "Rate","Discount %","Discount Rs.","Gross Value",""
                  ].map(h => (
                    <th key={h} className="px-3 py-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((row, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    {Object.keys(row).map(key => (
                      <td key={key} className="px-2 py-1">
                        <input
                          className={tableInput}
                          name={key}
                          value={row[key]}
                          onChange={e => handleItemChange(i, e)}
                        />
                      </td>
                    ))}
                    <td className="px-2 text-center">
                      <button onClick={() => removeRow(i)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={addRow} className="mt-3 flex items-center gap-2 text-sm text-blue-600">
            <Plus size={16} /> Add Another Line
          </button>
        </div>

      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center rounded-b-lg">
        <div className="text-xs text-gray-500">
            * Required fields
        </div>
        <button onClick={addDummyData} className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
          <span className="text-lg">+</span> Auto-fill Sample Data
        </button>
      </div>
    </div>
  );
}

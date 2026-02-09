import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function LocalPurchaseOrder({ onSave, onCancel, initialData }) {

  /* ================= HEADER ================= */
  const [header, setHeader] = useState({
    orderNo: initialData?.orderNo || "",
    orderDate: initialData?.orderDate || "",
    party: initialData?.party || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    language: initialData?.language || "English",
    status: initialData?.status || "Active",
    statusDate: initialData?.statusDate || "",
  });

  /* ================= ITEMS ================= */
  const emptyRow = {
    partNo: "",
    itemName: "",
    unit: "",
    qty: "",
    purRate: "",
    total: "",
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
      stock: 10,
    },
    {
      id: 2,
      itemName: "Macbook Pro",
      sku: "SAP-1002",
      partNo: "MBP-256",
      unit: "Pcs",
      purchaseRate: 1750.00,
      stock: 5,
    },
    {
      id: 3,
      itemName: "Nokia Pro",
      sku: "SAP-1003",
      partNo: "NP-128",
      unit: "Pcs",
      purchaseRate: 380.00,
      stock: 20,
    }
  ];
  const [itemSearch, setItemSearch] = useState("");
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [selectedItemToAdd, setSelectedItemToAdd] = useState(null);

  /* ================= SUMMARY ================= */
  const [summary, setSummary] = useState({
    totalAmount: initialData?.totalAmount || "0.00",
    roundOff: initialData?.roundOff || "0.00",
    grandTotal: initialData?.grandTotal || "0.00",
  });

  /* ================= CALCULATIONS ================= */
  const calculateSummaryTotals = (currentItems, currentSummary) => {
    const totalAmount = currentItems.reduce((sum, i) => sum + (parseFloat(i.total) || 0), 0);
    const roundOff = parseFloat(currentSummary.roundOff) || 0;
    const grandTotal = totalAmount + roundOff;

    return {
      ...currentSummary,
      totalAmount: totalAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  /* ================= HANDLERS ================= */
  const handleHeaderChange = (e) =>
    setHeader({ ...header, [e.target.name]: e.target.value });

  const handleItemChange = (i, e) => {
    const updated = [...items];
    updated[i][e.target.name] = e.target.value;

    if (e.target.name === "qty" || e.target.name === "purRate") {
      const qty = parseFloat(updated[i].qty) || 0;
      const rate = parseFloat(updated[i].purRate) || 0;
      updated[i].total = (qty * rate).toFixed(2);
    }

    setItems(updated);
    setSummary(calculateSummaryTotals(updated, summary));
  };

  const handleSummaryChange = (e) => {
    const { name, value } = e.target;
    const newSummary = { ...summary, [name]: value };
    
    if (name === "roundOff") {
       setSummary(calculateSummaryTotals(items, newSummary));
    } else {
       setSummary(newSummary);
    }
  };

  const addRow = () => setItems([...items, { ...emptyRow }]);

  const removeRow = (i) => {
    if (items.length > 1) {
      const newItems = items.filter((_, idx) => idx !== i);
      setItems(newItems);
      setSummary(calculateSummaryTotals(newItems, summary));
    }
  };

  const handleAddItem = () => {
    if (selectedItemToAdd) {
      const newItem = {
        partNo: selectedItemToAdd.partNo,
        itemName: selectedItemToAdd.itemName,
        unit: selectedItemToAdd.unit,
        qty: "1",
        purRate: selectedItemToAdd.purchaseRate,
        total: (1 * selectedItemToAdd.purchaseRate).toFixed(2),
      };

      let newItems;
      if (items.length === 1 && !items[0].itemName) {
        newItems = [newItem];
      } else {
        newItems = [...items, newItem];
      }

      setItems(newItems);
      setSummary(calculateSummaryTotals(newItems, summary));
      setSelectedItemToAdd(null);
      setItemSearch("");
    }
  };

  const handleSave = () => {
    onSave?.({
      ...header,
      items,
      ...summary,
    });
  };

  const addDummyData = () => {
    setHeader({
      orderNo: "LPO-" + Math.floor(Math.random() * 1000),
      orderDate: new Date().toISOString().split('T')[0],
      party: "Global Suppliers Ltd",
      address1: "123 Business Park",
      address2: "Tech City",
      language: "English",
      status: "Active",
      statusDate: new Date().toISOString().split('T')[0],
    });

    setItems([
      {
        partNo: "IP15P-256",
        itemName: "iPhone 15 Pro",
        unit: "Pcs",
        qty: "5",
        purRate: "900.00",
        total: "4500.00",
      },
    ]);

    setSummary({
      totalAmount: "4500.00",
      roundOff: "0.00",
      grandTotal: "4500.00",
    });
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

      {/* HEADER BAR */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Local Purchase Order" : "Local Purchase Order"}
        </h2>
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

        {/* ORDER DETAILS */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className={sectionTitle}>Order Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <label className={label}>Order No</label>
              <input className={input} name="orderNo" value={header.orderNo} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Order Date</label>
              <input type="date" className={input} name="orderDate" value={header.orderDate} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Party</label>
              <input className={input} name="party" value={header.party} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Status</label>
              <select className={input} name="status" value={header.status} onChange={handleHeaderChange}>
                <option>Active</option>
                <option>Closed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div>
              <label className={label}>Address 1</label>
              <input className={input} name="address1" value={header.address1} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Address 2</label>
              <input className={input} name="address2" value={header.address2} onChange={handleHeaderChange} />
            </div>

            <div>
              <label className={label}>Language</label>
              <select className={input} name="language" value={header.language} onChange={handleHeaderChange}>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>

            <div>
              <label className={label}>Status Date</label>
              <input type="date" className={input} name="statusDate" value={header.statusDate} onChange={handleHeaderChange} />
            </div>

          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
          <h3 className={sectionTitle}>Item Details</h3>

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
              <thead className="bg-gray-50">
                <tr>
                  {["Part No","Item Name","Unit","Qty","Pur Rate","Total",""].map(h => (
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
            <Plus size={16} /> Add Item
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-blue-50 p-4 border border-blue-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={label}>Total Amount</label>
              <input className={input} name="totalAmount" value={summary.totalAmount} onChange={handleSummaryChange} />
            </div>
            <div>
              <label className={label}>Round Off</label>
              <input className={input} name="roundOff" value={summary.roundOff} onChange={handleSummaryChange} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">Grand Total</label>
              <input
                className="w-full px-3 py-2 border border-blue-400 rounded-md text-lg font-bold text-blue-700"
                name="grandTotal"
                value={summary.grandTotal}
                onChange={handleSummaryChange}
              />
            </div>
          </div>
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

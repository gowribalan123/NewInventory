import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import SearchableInput from "../../Items/forms/SearchableInput";

export default function SalesReturn({ onSave, onCancel, initialData }) {
  const [header, setHeader] = useState({
    returnNo: initialData?.returnNo || "",
    returnDate: initialData?.returnDate || "",
    billType: initialData?.billType || "Credit",
    rateType: initialData?.rateType || "Retail",
    returnType: initialData?.returnType || "Current Year",
    godown: initialData?.godown || "",
    salesBillNo: initialData?.salesBillNo || "",
    party: initialData?.party || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    balance: initialData?.balance || "",
    language: initialData?.language || "English",
    printType: initialData?.printType || "Dos",
    copies: initialData?.copies || "1",
    narration: initialData?.narration || "",
  });

  const [returnNumbers, setReturnNumbers] = useState(["SR-1001", "SR-1002", "SR-1003"]);
  const [godowns, setGodowns] = useState(["Main Store", "Warehouse A", "Shop"]);
  const [rateTypes, setRateTypes] = useState(["Retail", "Wholesale", "Distributor"]);
  const [parties, setParties] = useState(["Cash Customer", "John Doe", "Jane Smith"]);
  const [salesBillNos, setSalesBillNos] = useState(["INV-001", "INV-002", "INV-003"]);

  const [items, setItems] = useState(initialData?.items || [
    { partNo: "", itemName: "", unit: "", qty: 0, freeQty: 0, rate: 0, discount: 0, total: 0 }
  ]);

  const MOCK_ITEMS = [
    {
      id: 1,
      itemName: "iPhone 15 Pro",
      itemCode: "IP15P-256",
      sku: "SAP-1001",
      barcode: "987654321098",
      itemUnit: "Pcs",
      salesRate: "999.00",
      vat: "15",
      stock: 10,
    },
    {
      id: 2,
      itemName: "Macbook Pro",
      itemCode: "MBP-256",
      sku: "SAP-1002",
      barcode: "987654321099",
      itemUnit: "Pcs",
      salesRate: "1999.00",
      vat: "15",
      stock: 5,
    },
    {
      id: 3,
      itemName: "Nokia Pro",
      itemCode: "NP-128",
      sku: "SAP-1003",
      barcode: "987654321100",
      itemUnit: "Pcs",
      salesRate: "499.00",
      vat: "15",
      stock: 20,
    },
  ];
  const [itemSearch, setItemSearch] = useState("");
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [selectedItemToAdd, setSelectedItemToAdd] = useState(null);
  const [showAllBillItems, setShowAllBillItems] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [errors, setErrors] = useState({});

  const MOCK_BILL_ITEMS = {
    "INV-001": [
      { partNo: "IP15P-256", itemName: "iPhone 15 Pro", unit: "Pcs", qty: 1, freeQty: 0, rate: 999.00, discount: 0, total: 999.00 },
      { partNo: "MBP-256", itemName: "Macbook Pro", unit: "Pcs", qty: 1, freeQty: 0, rate: 1999.00, discount: 50, total: 1949.00 }
    ],
    "INV-002": [
      { partNo: "NP-128", itemName: "Nokia Pro", unit: "Pcs", qty: 2, freeQty: 0, rate: 499.00, discount: 0, total: 998.00 }
    ],
    "INV-003": [
      { partNo: "IP15P-256", itemName: "iPhone 15 Pro", unit: "Pcs", qty: 5, freeQty: 1, rate: 999.00, discount: 100, total: 4895.00 }
    ]
  };

  const handleAddItem = () => {
    if (selectedItemToAdd) {
      const newItem = {
        partNo: selectedItemToAdd.itemCode,
        itemName: selectedItemToAdd.itemName,
        unit: selectedItemToAdd.itemUnit,
        qty: 1,
        freeQty: 0,
        rate: parseFloat(selectedItemToAdd.salesRate) || 0,
        discount: 0,
        total: parseFloat(selectedItemToAdd.salesRate) || 0
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

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader({ ...header, [name]: value });

    if (name === "salesBillNo" && MOCK_BILL_ITEMS[value]) {
      setItems(MOCK_BILL_ITEMS[value]);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    updated[index].total =
      (updated[index].qty * updated[index].rate) -
      (updated[index].discount || 0);

    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      { partNo: "", itemName: "", unit: "", qty: 0, freeQty: 0, rate: 0, discount: 0, total: 0 }
    ]);
  };

  const removeRow = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const grandTotal = items.reduce((sum, i) => sum + i.total, 0);

  const validate = () => {
    const newErrors = {};
    if (!header.returnNo.trim()) {
      newErrors.returnNo = "Return No is required";
    } else if (returnNumbers.includes(header.returnNo) && (!initialData || header.returnNo !== initialData.returnNo)) {
      newErrors.returnNo = "Return No already exists";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    onSave?.({
      ...header,
      items,
      grandTotal: grandTotal.toFixed(2)
    });
  };

  const handlePrint = () => {
    console.log("Printing Sales Return Details:", {
      ...header,
      items,
      grandTotal: grandTotal.toFixed(2)
    });
  };

  // Styles
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";
  const sectionTitle = "text-sm font-bold text-blue-700 uppercase border-b border-gray-200 pb-2 mb-4";
  const tableInput = "w-full px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-500";

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 my-6">
      
      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center rounded-t-lg">
        <h2 className="text-xl font-bold text-gray-800">{initialData ? "Edit Sales Return" : "Sales Return"}</h2>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
            Print
          </button>
          <button onClick={onCancel} className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Header Section */}
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
                    {errors.returnNo && <p className="text-red-500 text-xs mt-1">{errors.returnNo}</p>}
                </div>
                <div>
                    <label className={labelClass}>Return Date</label>
                    <input type="date" className={inputClass} name="returnDate" value={header.returnDate} onChange={handleHeaderChange} />
                </div>
                <div>
                    <label className={labelClass}>Bill Type</label>
                    <select className={inputClass} name="billType" value={header.billType} onChange={handleHeaderChange}>
                        <option>Credit</option>
                        <option>Cash</option>
                    </select>
                </div>
                <div>
                    <SearchableInput 
                        label="Rate Type" 
                        name="rateType" 
                        value={header.rateType} 
                        onChange={handleHeaderChange}
                        items={rateTypes}
                    />
                </div>
                <div>
                    <label className={labelClass}>Return Type</label>
                    <select className={inputClass} name="returnType" value={header.returnType} onChange={handleHeaderChange}>
                        <option>Current Year</option>
                        <option>Previous Year</option>
                    </select>
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
                    <SearchableInput 
                        label="Sales Bill No" 
                        name="salesBillNo" 
                        value={header.salesBillNo} 
                        onChange={handleHeaderChange}
                        items={salesBillNos}
                    />
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
                    <label className={labelClass}>Address 1</label>
                    <input className={inputClass} name="address1" value={header.address1} onChange={handleHeaderChange} />
                </div>
                <div>
                    <label className={labelClass}>Address 2</label>
                    <input className={inputClass} name="address2" value={header.address2} onChange={handleHeaderChange} />
                </div>
                <div>
                    <label className={labelClass}>Balance</label>
                    <input className={inputClass} name="balance" value={header.balance} onChange={handleHeaderChange} />
                </div>
                <div>
                    <label className={labelClass}>Language</label>
                    <select className={inputClass} name="language" value={header.language} onChange={handleHeaderChange}>
                        <option>English</option>
                        <option>Tamil</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Print Type</label>
                    <select className={inputClass} name="printType" value={header.printType} onChange={handleHeaderChange}>
                        <option>Dos</option>
                        <option>Windows</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Copies</label>
                    <input type="number" className={inputClass} name="copies" value={header.copies} onChange={handleHeaderChange} />
                </div>
                <div className="md:col-span-2">
                    <label className={labelClass}>Narration</label>
                    <input className={inputClass} name="narration" value={header.narration} onChange={handleHeaderChange} />
                </div>
            </div>
        </div>

        {/* Items Table */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
            <h3 className={sectionTitle}>Item Details</h3>
            <div className="flex gap-2 items-end mb-4 w-full md:w-1/2">
              <div className="relative flex-1">
                <label className={labelClass}>Add Item</label>
                <input
                  className={inputClass}
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
                          <span>Stock: {item.stock} {item.itemUnit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={handleAddItem} disabled={!selectedItemToAdd} className={`px-4 py-2 rounded-md text-white font-medium transition-colors h-[38px] ${selectedItemToAdd ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>+ Add</button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                    <tr>
                        {["Part No", "Item Name", "Unit", "Qty", "Free Qty", "Rate", "Discount", "Total", ""].map((h) => (
                        <th key={h} className="px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    {items.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                        <td className="px-2 py-1"><input className={tableInput} value={row.partNo} onChange={e => handleItemChange(i, "partNo", e.target.value)} /></td>
                        <td className="px-2 py-1"><input className={tableInput} value={row.itemName} onChange={e => handleItemChange(i, "itemName", e.target.value)} /></td>
                        <td className="px-2 py-1"><input className={tableInput} value={row.unit} onChange={e => handleItemChange(i, "unit", e.target.value)} /></td>
                        <td className="px-2 py-1"><input type="number" className={tableInput} value={row.qty} onChange={e => handleItemChange(i, "qty", +e.target.value)} /></td>
                        <td className="px-2 py-1"><input type="number" className={tableInput} value={row.freeQty} onChange={e => handleItemChange(i, "freeQty", +e.target.value)} /></td>
                        <td className="px-2 py-1"><input type="number" className={tableInput} value={row.rate} onChange={e => handleItemChange(i, "rate", +e.target.value)} /></td>
                        <td className="px-2 py-1"><input type="number" className={tableInput} value={row.discount} onChange={e => handleItemChange(i, "discount", +e.target.value)} /></td>
                        <td className="px-2 py-1 font-medium text-right">{row.total.toFixed(2)}</td>
                        <td className="px-2 py-1 text-center">
                            <button onClick={() => removeRow(i)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button onClick={addRow} className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors w-fit">
                <Plus size={16} /> Add Item
            </button>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-4">
            <div className="flex gap-6 mb-2 md:mb-0">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={showAllBillItems}
                        onChange={(e) => setShowAllBillItems(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Show All Bill Items</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                        type="checkbox" 
                        checked={showAllItems}
                        onChange={(e) => setShowAllItems(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Show All Items</span>
                </label>
            </div>
            <div className="flex items-end gap-4 w-full md:w-auto">
                <div className="w-48">
                    <label className={labelClass}>Balance</label>
                    <input className={inputClass} placeholder="0.00" />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 min-w-[200px]">
                    <div className="flex justify-between items-center gap-4">
                        <span className="text-sm font-bold text-gray-700">Grand Total:</span>
                        <span className="text-xl font-bold text-blue-700">₹ {grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import SearchableInput from "../../Items/forms/SearchableInput";

export default function PurchaseEntry({ onSave, onCancel, initialData }) {
  const MOCK_PARTIES = [
    { id: 1, name: "Global Suppliers Ltd", address: "123 Global Way, New York, NY 10001" },
    { id: 2, name: "Tech Supplies Inc.", address: "456 Tech Park, San Francisco, CA 94016" },
    { id: 3, name: "Office Depot", address: "789 Office Blvd, Chicago, IL 60601" },
  ];

  const MOCK_GODOWNS = [
    { id: 1, name: "Main Warehouse" },
    { id: 2, name: "Store A" },
    { id: 3, name: "Store B" },
  ];

  const MOCK_INVOICES = [
      { id: 1, no: "PUR-2024-001" },
      { id: 2, no: "PUR-2024-002" },
      { id: 3, no: "PUR-2024-003" },
  ];

  const [header, setHeader] = useState({
    invoiceNo: initialData?.invoiceNo || "",
    invoiceDate: initialData?.invoiceDate || "",
    billType: initialData?.billType || "Credit",
    narration: initialData?.narration || "",
    party: initialData?.party || "",
    address: initialData?.address || "",
    type: initialData?.type || "",
    godown: initialData?.godown || "",
    printType: initialData?.printType || "Dos",
    language: initialData?.language || "English",
  });

  const [items, setItems] = useState(initialData?.items || [
    {
      partNo: "",
      itemName: "",
      barcode: "",
      unit: "",
      qty: "",
      purRate: "",
      mrp: "",
      total: "",
      discPercent: "",
      discAmount: "",
      taxPercent: "",
      taxAmount: "",
      costPrice: "",
    },
  ]);

  const [summary, setSummary] = useState({
    balanceAmt: initialData?.balanceAmt || "",
    totalQty: initialData?.totalQty || "",
    totalTax: initialData?.totalTax || "",
    freight: initialData?.freight || "",
    roundOff: initialData?.roundOff || "",
    totalAmount: initialData?.totalAmount || "",
    otherCharges: initialData?.otherCharges || "",
    grandTotal: initialData?.grandTotal || "",
    changeItemRate: initialData?.changeItemRate || false,
  });

  const [invoiceList, setInvoiceList] = useState(MOCK_INVOICES.map(i => i.no));
  const [partyList, setPartyList] = useState(MOCK_PARTIES.map(p => p.name));
  const [godownList, setGodownList] = useState(MOCK_GODOWNS.map(g => g.name));

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


  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === "party") {
      const party = MOCK_PARTIES.find((p) => p.name === value);
      setHeader({ ...header, [name]: value, address: party?.address || "" });
    } else {
      setHeader({ ...header, [name]: value });
    }
  };

  const calculateRow = (item) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.purRate) || 0;
    const discPercent = parseFloat(item.discPercent) || 0;
    const taxPercent = parseFloat(item.taxPercent) || 0;

    const gross = qty * rate;
    const discAmount = (gross * discPercent) / 100;
    const taxable = gross - discAmount;
    const taxAmount = (taxable * taxPercent) / 100;
    const netAmount = taxable + taxAmount;
    
    const costPrice = qty > 0 ? netAmount / qty : 0;

    return {
      ...item,
      total: gross.toFixed(2),
      discAmount: discAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      costPrice: costPrice.toFixed(2)
    };
  };

  const calculateSummaryTotals = (currentItems, currentSummary) => {
    const totalQty = currentItems.reduce((sum, i) => sum + (parseFloat(i.qty) || 0), 0);
    const totalGross = currentItems.reduce((sum, i) => sum + (parseFloat(i.total) || 0), 0);
    const totalDisc = currentItems.reduce((sum, i) => sum + (parseFloat(i.discAmount) || 0), 0);
    const totalTax = currentItems.reduce((sum, i) => sum + (parseFloat(i.taxAmount) || 0), 0);
    
    const freight = parseFloat(currentSummary.freight) || 0;
    const otherCharges = parseFloat(currentSummary.otherCharges) || 0;
    const roundOff = parseFloat(currentSummary.roundOff) || 0;

    const totalAmount = totalGross - totalDisc;
    const grandTotal = totalAmount + totalTax + freight + otherCharges + roundOff;

    return {
      ...currentSummary,
      totalQty: totalQty.toFixed(2),
      totalTax: totalTax.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      grandTotal: grandTotal.toFixed(2)
    };
  };

  const handleSummaryChange = (e) => {
    const { name, value } = e.target;
    const newSummary = { ...summary, [name]: value };
    
    if (["freight", "otherCharges", "roundOff"].includes(name)) {
       setSummary(calculateSummaryTotals(items, newSummary));
    } else {
       setSummary(newSummary);
    }
  };

  const handleSummaryCheckbox = (e) => {
    setSummary({ ...summary, [e.target.name]: e.target.checked });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    let item = { ...updatedItems[index], [name]: value };

    if (["qty", "purRate", "discPercent", "taxPercent"].includes(name)) {
       item = calculateRow(item);
    }
    
    updatedItems[index] = item;
    setItems(updatedItems);
    setSummary(calculateSummaryTotals(updatedItems, summary));
  };

  const addRow = () => {
    setItems([...items, { ...items[0] }]);
  };

  const removeRow = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
      setSummary(calculateSummaryTotals(newItems, summary));
    }
  };

  const handleAddItem = () => {
    if (selectedItemToAdd) {
      const newItem = calculateRow({
        partNo: selectedItemToAdd.partNo,
        itemName: selectedItemToAdd.itemName,
        barcode: selectedItemToAdd.barcode,
        unit: selectedItemToAdd.unit,
        qty: "1",
        purRate: selectedItemToAdd.purchaseRate,
        mrp: selectedItemToAdd.mrp || "",
        total: "",
        discPercent: "",
        discAmount: "",
        taxPercent: selectedItemToAdd.taxPercent,
        taxAmount: "",
        costPrice: ""
      });

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
    const purchaseData = {
      ...header,
      items,
      ...summary,
    };
    onSave(purchaseData);
  };

  const addDummyData = () => {
    setHeader({
      invoiceNo: "INV-" + Math.floor(Math.random() * 1000),
      invoiceDate: new Date().toISOString().split('T')[0],
      billType: "Credit",
      narration: "Bulk purchase of electronics",
      party: "Global Suppliers Ltd",
      address: "123 Business Park, Tech City",
      type: "Local",
      godown: "Main Store",
      printType: "Dos",
      language: "English",
    });

    setItems([
      {
        partNo: "ITM-001",
        itemName: "Wireless Mouse",
        barcode: "890123456",
        unit: "Pcs",
        qty: "50",
        purRate: "15.00",
        mrp: "25.00",
        total: "750.00",
        discPercent: "0",
        discAmount: "0",
        taxPercent: "5",
        taxAmount: "37.50",
        costPrice: "15.75",
      },
    ]);

    setSummary({
      balanceAmt: "0.00",
      totalQty: "50",
      totalTax: "37.50",
      freight: "10.00",
      roundOff: "0.00",
      totalAmount: "750.00",
      otherCharges: "0.00",
      grandTotal: "797.50",
      changeItemRate: false,
    });
  };

  const input = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all";
  const label = "block text-xs font-medium text-gray-600 mb-1.5";
  const sectionTitle = "text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-gray-200 pb-2 mb-4";
  const tableInput = "w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const summaryInput = "w-full text-right px-3 py-1.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const summaryLabel = "text-sm font-medium text-gray-600";

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">

      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{initialData ? "Edit Purchase" : "New Purchase"}</h2>
          <p className="text-xs text-gray-500 mt-1">{initialData ? "Update purchase details." : "Create a new purchase entry."}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md bg-white hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">Save</button>
        </div>
      </div>

      <div className="p-4 space-y-8">
        {/* Purchase Details Section */}
        <div>
          <h3 className={sectionTitle}>Purchase Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <SearchableInput
                label="Invoice No"
                name="invoiceNo"
                value={header.invoiceNo}
                onChange={handleHeaderChange}
                items={invoiceList}
                onItemsChange={setInvoiceList}
              />
            </div>
            <div><label className={label}>Invoice Date</label><input type="date" className={input} name="invoiceDate" value={header.invoiceDate} onChange={handleHeaderChange} /></div>
            <div>
              <label className={label}>Bill Type</label>
              <select className={input} name="billType" value={header.billType} onChange={handleHeaderChange}>
                <option>Credit</option>
                <option>Cash</option>
              </select>
            </div>
            <div><label className={label}>Narration</label><input className={input} name="narration" value={header.narration} onChange={handleHeaderChange} /></div>
            <div>
              <SearchableInput
                label="Party"
                name="party"
                value={header.party}
                onChange={handleHeaderChange}
                items={partyList}
                onItemsChange={setPartyList}
              />
            </div>
          <div>
              <label className={label}>Type</label>
              <select className={input} name="type" value={header.type} onChange={handleHeaderChange}>
                <option value="">Select Type</option>
                <option value="Local">Local</option>
                <option value="Interstate">Interstate</option>
              </select>
            </div>
            <div>
              <SearchableInput
                label="Godown"
                name="godown"
                value={header.godown}
                onChange={handleHeaderChange}
                items={godownList}
                onItemsChange={setGodownList}
              />
            </div>
            <div>
              <label className={label}>Print Type</label>
              <select className={input} name="printType" value={header.printType} onChange={handleHeaderChange}>
                <option>Dos</option>
                <option>Windows</option>
              </select>
            </div>
            <div>
              <label className={label}>Language</label>
              <select className={input} name="language" value={header.language} onChange={handleHeaderChange}>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>
               <div><label className={label}>Address</label><textarea className={input} name="address" value={header.address} onChange={handleHeaderChange} rows={3} /></div>
           
          </div>
        </div>

        {/* Items Table Section */}
        <div>
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
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  {[
                    "Part No", "Item Name", "Barcode", "Unit", "Qty",
                    "Pur Rate", "MRP", "Total",
                    "Disc %", "Disc Amt",
                    "Tax %", "Tax Amt",
                    "Cost Price", ""
                  ].map((h, i) => (
                    <th key={i} className="px-3 py-3 whitespace-nowrap min-w-[100px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 group">
                    {Object.keys(row).map((key) => (
                      <td key={key} className="px-2 py-2">
                        <input
                          className={tableInput}
                          name={key}
                          value={row[key]}
                          onChange={(e) => handleItemChange(i, e)}
                        />
                      </td>
                    ))}
                    <td className="px-2 py-2 text-center">
                      <button 
                        onClick={() => removeRow(i)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 opacity-0 group-hover:opacity-100"
                        title="Remove Row"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={addRow}
            className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors w-fit"
          >
            <Plus size={16} /> Add Another Line
          </button>
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 items-end">
            <div>
              <label className={summaryLabel}>Balance Amt</label>
              <input
                className={summaryInput}
                name="balanceAmt"
                value={summary.balanceAmt}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Qty</label>
              <input
                className={summaryInput}
                name="totalQty"
                value={summary.totalQty}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Total Tax</label>
              <input
                className={summaryInput}
                name="totalTax"
                value={summary.totalTax}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Freight</label>
              <input
                className={summaryInput}
                name="freight"
                value={summary.freight}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Round Off</label>
              <input
                className={summaryInput}
                name="roundOff"
                value={summary.roundOff}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Total Amount</label>
              <input
                className={summaryInput}
                name="totalAmount"
                value={summary.totalAmount}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className={summaryLabel}>Other Charges</label>
              <input
                className={summaryInput}
                name="otherCharges"
                value={summary.otherCharges}
                onChange={handleSummaryChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700">
                Grand Total
              </label>
              <input
                className="w-full text-right px-3 py-2 bg-white border border-blue-400 rounded-md text-lg font-bold text-blue-700"
                name="grandTotal"
                value={summary.grandTotal}
                onChange={handleSummaryChange}
              />
            </div>
          </div>

          {/* Change Item Rate */}
          <div className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              name="changeItemRate"
              checked={summary.changeItemRate}
              onChange={handleSummaryCheckbox}
              className="h-4 w-4"
            />
            <label className="text-sm text-gray-700">
              Change Item Rate
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
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

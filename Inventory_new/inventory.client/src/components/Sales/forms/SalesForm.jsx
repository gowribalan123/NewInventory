import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function SalesForm({ onSave, onCancel, initialData }) {

  const MOCK_CUSTOMERS = [
    { id: 1, name: "Walk-in Customer", address1: "N/A", address2: "", mobileNo: "N/A" },
    { id: 2, name: "John Doe", address1: "123 React St", address2: "Vite City", mobileNo: "555-1234" },
    { id: 3, name: "Jane Smith", address1: "456 Component Ave", address2: "State Hook", mobileNo: "555-5678" },
  ];
  const MOCK_SALESMEN = ["John Doe", "Peter Jones", "Admin"];
  const MOCK_USERS = ["Admin", "Manager", "Sales Staff"];
  const MOCK_GODOWNS = ["Main Store", "Warehouse A", "Shop"];

  /* ================= HEADER ================= */
  const [header, setHeader] = useState({
    billNo: initialData?.billNo || "",
    billDate: initialData?.billDate || "",
    billType: initialData?.billType || "Cash",
    salesType: initialData?.salesType || "Show Room",
    lpoNo: initialData?.lpoNo || "",
    deliveryNo: initialData?.deliveryNo || "",
    party: initialData?.party || "",
    address1: initialData?.address1 || "",
    address2: initialData?.address2 || "",
    mobileNo: initialData?.mobileNo || "",
    salesman: initialData?.salesman || "",
    rateType: initialData?.rateType || "CUSTOMER PRICE",
    preparedBy: initialData?.preparedBy || "",
    godown: initialData?.godown || "",
    narration: initialData?.narration || "",
    language: initialData?.language || "English",
    printType: initialData?.printType || "Dos",
    type: initialData?.type || "Normal",
  });

  /* ================= ITEMS ================= */
  const emptyRow = {
    barcode: "",
    partNo: "",
    itemName: "",
    unit: "",
    qty: "",
    freeQty: "",
    saleRate: "",
    discPercent: "",
    discAmount: "",
    taxPercent: "",
    taxAmount: "",
    total: "",
  };

  const [items, setItems] = useState(initialData?.items || [{ ...emptyRow }]);

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
  
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);
  const [showSalesmanDropdown, setShowSalesmanDropdown] = useState(false);
  const [showRateTypeDropdown, setShowRateTypeDropdown] = useState(false);
  const [showPreparedByDropdown, setShowPreparedByDropdown] = useState(false);
  const [showGodownDropdown, setShowGodownDropdown] = useState(false);

  /* ================= SUMMARY ================= */
  const [summary, setSummary] = useState({
    balance: initialData?.balance || "",
    qty: initialData?.qty || "",
    totalDiscount: initialData?.totalDiscount || "",
    serviceTotal: initialData?.serviceTotal || "",
    totalTax: initialData?.totalTax || "",
    creditCharges: initialData?.creditCharges || "",
    totalAmount: initialData?.totalAmount || "",
    additionalDisc: initialData?.additionalDisc || "",
    grandTotal: initialData?.grandTotal || "",
  });

  /* ================= CALCULATIONS ================= */
  const calculateRow = (item) => {
    const qty = parseFloat(item.qty) || 0;
    const saleRate = parseFloat(item.saleRate) || 0;
    const discPercent = parseFloat(item.discPercent) || 0;
    const taxPercent = parseFloat(item.taxPercent) || 0;

    const grossTotal = qty * saleRate;
    const discAmount = (grossTotal * discPercent) / 100;
    const taxableAmount = grossTotal - discAmount;
    const taxAmount = (taxableAmount * taxPercent) / 100;
    const total = taxableAmount + taxAmount;

    return {
      ...item,
      discAmount: discAmount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const calculateSummaryTotals = (currentItems, currentSummary) => {
    const totalQty = currentItems.reduce((sum, i) => sum + (parseFloat(i.qty) || 0), 0);
    const totalGross = currentItems.reduce((sum, i) => sum + ((parseFloat(i.qty) || 0) * (parseFloat(i.saleRate) || 0)), 0);
    const totalDiscount = currentItems.reduce((sum, i) => sum + (parseFloat(i.discAmount) || 0), 0);
    const totalTax = currentItems.reduce((sum, i) => sum + (parseFloat(i.taxAmount) || 0), 0);

    const serviceTotal = parseFloat(currentSummary.serviceTotal) || 0;
    const creditCharges = parseFloat(currentSummary.creditCharges) || 0;
    const additionalDisc = parseFloat(currentSummary.additionalDisc) || 0;

    const grandTotal = totalGross - totalDiscount - additionalDisc + totalTax + serviceTotal + creditCharges;

    return {
      ...currentSummary,
      qty: totalQty.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2),
      totalAmount: totalGross.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  };

  /* ================= HANDLERS ================= */
  const handleHeaderChange = e => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  }

  const handlePartySelect = (customer) => {
    setHeader(prev => ({
      ...prev,
      party: customer.name,
      address1: customer.address1,
      address2: customer.address2,
      mobileNo: customer.mobileNo,
    }));
    setShowPartyDropdown(false);
  };

  const handleItemChange = (i, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    let item = { ...updatedItems[i], [name]: value };

    if (["qty", "saleRate", "discPercent", "taxPercent"].includes(name)) {
      item = calculateRow(item);
    }
    
    updatedItems[i] = item;
    setItems(updatedItems);
    setSummary(calculateSummaryTotals(updatedItems, summary));
  };

  const handleSummaryChange = e => {
    const { name, value } = e.target;
    const newSummary = { ...summary, [name]: value };

    if (["serviceTotal", "creditCharges", "additionalDisc"].includes(name)) {
      setSummary(calculateSummaryTotals(items, newSummary));
    } else {
      setSummary(newSummary);
    }
  };

  const handleAddItem = () => {
    if (selectedItemToAdd) {
      const newItem = calculateRow({
        barcode: selectedItemToAdd.barcode,
        partNo: selectedItemToAdd.itemCode,
        itemName: selectedItemToAdd.itemName,
        unit: selectedItemToAdd.itemUnit,
        qty: "1",
        freeQty: "0",
        saleRate: selectedItemToAdd.salesRate,
        discPercent: "0",
        discAmount: "",
        taxPercent: selectedItemToAdd.vat,
        taxAmount: "",
        total: "",
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
      setTimeout(() => {
        const rows = document.querySelectorAll("input[name='qty']");
        if (rows.length > 0) { rows[rows.length - 1].focus(); }
      }, 50);
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

  const handleSave = () => {
    onSave?.({
      ...header,
      items,
      ...summary,
    });
  };

  const addDummyData = () => {
    setHeader({
      billNo: "INV-" + Math.floor(Math.random() * 10000),
      billDate: new Date().toISOString().split('T')[0],
      billType: "Cash",
      salesType: "Show Room",
      lpoNo: "LPO-" + Math.floor(Math.random() * 1000),
      deliveryNo: "DN-" + Math.floor(Math.random() * 1000),
      party: "Walk-in Customer",
      address1: "123 Market Street",
      address2: "City Center",
      mobileNo: "555-0123",
      salesman: "John Doe",
      rateType: "CUSTOMER PRICE",
      preparedBy: "Admin",
      godown: "Main Store",
      narration: "Sales entry for electronics",
      language: "English",
      printType: "Dos",
      type: "Normal",
    });

    setItems([
      {
        barcode: "89012345",
        partNo: "ITM-001",
        itemName: "Wireless Mouse",
        unit: "Pcs",
        qty: "1",
        freeQty: "0",
        saleRate: "450.00",
        discPercent: "0",
        discAmount: "0",
        taxPercent: "5",
        taxAmount: "22.50",
        total: "472.50",
      }
    ]);

    setSummary({
      balance: "0.00",
      qty: "1",
      totalDiscount: "0.00",
      serviceTotal: "0.00",
      totalTax: "22.50",
      creditCharges: "0.00",
      totalAmount: "450.00",
      additionalDisc: "0.00",
      grandTotal: "472.50",
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
  const summaryInput = "w-full text-right px-3 py-1.5 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
  const summaryLabel = "text-sm font-medium text-gray-600";

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">

      {/* HEADER BAR */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          {initialData ? "Edit Sales" : "New Sales"}
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

        {/* SALES DETAILS */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <h3 className={sectionTitle}>Sales Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div><label className={label}>Bill No</label><input className={input} name="billNo" value={header.billNo} onChange={handleHeaderChange} /></div>
            <div><label className={label}>Bill Date</label><input type="date" className={input} name="billDate" value={header.billDate} onChange={handleHeaderChange} /></div>
            <div><label className={label}>Bill Type</label>
              <select className={input} name="billType" value={header.billType} onChange={handleHeaderChange}>
                <option>Cash</option>
                <option>Credit</option>
              </select>
            </div>
            <div>
              <label className={label}>Sales Type</label>
              <select
                className={input}
                name="salesType"
                value={header.salesType}
                onChange={handleHeaderChange}
              >
                <option>Show Room</option>
                <option>Counter</option>
                <option>Online</option>
              </select>
            </div>
            <div>
              <label className={label}>LPO No</label>
              <input
                className={input}
                name="lpoNo"
                value={header.lpoNo}
                onChange={handleHeaderChange}
              />
            </div>
            <div>
              <label className={label}>Delivery No</label>
              <input
                className={input}
                name="deliveryNo"
                value={header.deliveryNo}
                onChange={handleHeaderChange}
              />
            </div>
            <div>
              <label className={label}>Party</label>
              <div className="relative">
                <input
                  className={input}
                  name="party"
                  value={header.party}
                  onChange={handleHeaderChange}
                  onFocus={() => setShowPartyDropdown(true)}
                  onBlur={() => setTimeout(() => setShowPartyDropdown(false), 200)}
                  autoComplete="off"
                />
                {showPartyDropdown && (
                  <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                    {MOCK_CUSTOMERS.filter(c => c.name.toLowerCase().includes((header.party || '').toLowerCase())).map(customer => (
                      <div key={customer.id} className="px-3 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => handlePartySelect(customer)}>
                        {customer.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div><label className={label}>Address 1</label><input className={input} name="address1" value={header.address1} onChange={handleHeaderChange} /></div>
            <div><label className={label}>Address 2</label><input className={input} name="address2" value={header.address2} onChange={handleHeaderChange} /></div>
            <div><label className={label}>Mobile No</label><input className={input} name="mobileNo" value={header.mobileNo} onChange={handleHeaderChange} /></div>
            <div>
              <label className={label}>Salesman</label>
              <div className="relative">
                <input className={input} name="salesman" value={header.salesman} onChange={handleHeaderChange} onFocus={() => setShowSalesmanDropdown(true)} onBlur={() => setTimeout(() => setShowSalesmanDropdown(false), 200)} autoComplete="off" />
                {showSalesmanDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                    {MOCK_SALESMEN.filter(opt => opt.toLowerCase().includes((header.salesman || '').toLowerCase())).map(opt => (
                      <div key={opt} className="px-3 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => { handleHeaderChange({ target: { name: 'salesman', value: opt } }); setShowSalesmanDropdown(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div><label className={label}>Type</label>
              <select className={input} name="type" value={header.type} onChange={handleHeaderChange}>
                <option>Normal</option>
                <option>Return</option>
                <option>Service</option>
              </select>
            </div>
            <div><label className={label}>Print Type</label>
              <select className={input} name="printType" value={header.printType} onChange={handleHeaderChange}>
                <option>Dos</option>
                <option>Windows</option>
              </select>
            </div>
            <div><label className={label}>Language</label>
              <select className={input} name="language" value={header.language} onChange={handleHeaderChange}>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </div>
            <div>
              <label className={label}>Rate Type</label>
              <div className="relative">
                <input className={input} name="rateType" value={header.rateType} onChange={handleHeaderChange} onFocus={() => setShowRateTypeDropdown(true)} onBlur={() => setTimeout(() => setShowRateTypeDropdown(false), 200)} autoComplete="off" />
                {showRateTypeDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                    {["CUSTOMER PRICE", "TECHNICIAN PRICE", "WHOLESALE PRICE"].filter(opt => opt.toLowerCase().includes((header.rateType || '').toLowerCase())).map(opt => (
                      <div key={opt} className="px-3 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => { handleHeaderChange({ target: { name: 'rateType', value: opt } }); setShowRateTypeDropdown(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={label}>Prepared By</label>
              <div className="relative">
                <input className={input} name="preparedBy" value={header.preparedBy} onChange={handleHeaderChange} onFocus={() => setShowPreparedByDropdown(true)} onBlur={() => setTimeout(() => setShowPreparedByDropdown(false), 200)} autoComplete="off" />
                {showPreparedByDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                    {MOCK_USERS.filter(opt => opt.toLowerCase().includes((header.preparedBy || '').toLowerCase())).map(opt => (
                      <div key={opt} className="px-3 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => { handleHeaderChange({ target: { name: 'preparedBy', value: opt } }); setShowPreparedByDropdown(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={label}>Godown</label>
              <div className="relative">
                <input className={input} name="godown" value={header.godown} onChange={handleHeaderChange} onFocus={() => setShowGodownDropdown(true)} onBlur={() => setTimeout(() => setShowGodownDropdown(false), 200)} autoComplete="off" />
                {showGodownDropdown && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                    {MOCK_GODOWNS.filter(opt => opt.toLowerCase().includes((header.godown || '').toLowerCase())).map(opt => (
                      <div key={opt} className="px-3 py-2 hover:bg-blue-100 cursor-pointer" onMouseDown={() => { handleHeaderChange({ target: { name: 'godown', value: opt } }); setShowGodownDropdown(false); }}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div><label className={label}>Narration</label><input className={input} name="narration" value={header.narration} onChange={handleHeaderChange} /></div>
          </div>
        </div>

        {/* ITEMS GRID */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
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
                        <span>Stock: {item.stock} {item.itemUnit}</span>
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
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Barcode","Part No","Item Name","Unit","Qty","Free Qty",
                    "Sale Rate","Disc %","Disc Amt","Tax %","Tax Amt","Total",""
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

          <button onClick={addRow} className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors w-fit">
            <Plus size={16} /> Add Another Line
          </button>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
            <div><label className={summaryLabel}>Total Amount</label><input className={summaryInput} name="totalAmount" value={summary.totalAmount} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Total Discount</label><input className={summaryInput} name="totalDiscount" value={summary.totalDiscount} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Additional Disc</label><input className={summaryInput} name="additionalDisc" value={summary.additionalDisc} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Total Tax</label><input className={summaryInput} name="totalTax" value={summary.totalTax} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Service Total</label><input className={summaryInput} name="serviceTotal" value={summary.serviceTotal} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Credit Charges</label><input className={summaryInput} name="creditCharges" value={summary.creditCharges} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Qty</label><input className={summaryInput} name="qty" value={summary.qty} onChange={handleSummaryChange} /></div>
            <div><label className={summaryLabel}>Balance</label><input className={summaryInput} name="balance" value={summary.balance} onChange={handleSummaryChange} /></div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-bold text-gray-700">Grand Total</label>
              <input
                className="w-full text-right px-3 py-2 bg-white border border-blue-400 rounded-md text-lg font-bold text-blue-700"
                name="grandTotal"
                value={summary.grandTotal}
                onChange={handleSummaryChange}
              />
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
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
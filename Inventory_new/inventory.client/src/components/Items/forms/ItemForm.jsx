import { useState, useRef } from "react";
import { Image as ImageIcon, ChevronDown, ChevronUp, Plus } from "lucide-react";
import SearchableInput from "./SearchableInput";

export default function ItemForm({ onSubmit, onCancel, initialData }) {

  const EMPTY_FORM = {
    itemCode: "",
    sapNo: "",
    itemName: "",
    itemArabicName: "",
    catId: "",
    groupId: "",
    brandId: "",
    itemUnit: "",
    alternateUnit: "",
    alternateQty: "",
    purchaseUnit: "",
    purchaseRate: "",
    landingRate: "",
    salesRate: "",
    mrp: "",
    rack: "",
    vat: "",
    minimumLevel: "",
    stockType: "Stock Item",
    barcodeFilling: "ItemCode",
    lastPurchaseDate: "",
    lastSalesDate: "",
    itemImgFile: null,

    // Rate table
    customerMargin: "",
    customerPrice: "",
    technicianMargin: "",
    technicianPrice: "",
    specialMargin: "",
    specialPrice: "",
    wholesaleMargin: "",
    wholesalePrice: "",
    projectMargin: "",
    projectPrice: ""
  };

  const [formData, setFormData] = useState(initialData || EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRateDetailsOpen, setIsRateDetailsOpen] = useState(false);
  const [showItemCodeDropdown, setShowItemCodeDropdown] = useState(false);
  const [showItemNameDropdown, setShowItemNameDropdown] = useState(false);
  const fileRef = useRef(null);
  
  // MOCK DATA FOR DROPDOWNS
  const MOCK_ITEMS_MASTER = [
    { itemId: 1, itemCode: 'IP15P-256', itemName: 'iPhone 15 Pro', itemArabicName: 'ايفون 15 برو', catId: 'Electronics', groupId: 'Mobile Phones', brandId: 'Apple', itemUnit: 'Pcs', alternateUnit: 'Box', purchaseUnit: 'Box', stockType: 'Stock Item' },
    { itemId: 2, itemCode: 'MBP-256', itemName: 'Macbook Pro', itemArabicName: 'ماك بوك برو', catId: 'Electronics', groupId: 'Computers', brandId: 'Apple', itemUnit: 'Pcs', alternateUnit: 'Box', purchaseUnit: 'Box', stockType: 'Stock Item' },
    { itemId: 3, itemCode: 'NP-128', itemName: 'Nokia Pro', itemArabicName: 'نوكيا برو', catId: 'Electronics', groupId: 'Mobile Phones', brandId: 'Nokia', itemUnit: 'Pcs', alternateUnit: 'Box', purchaseUnit: 'Box', stockType: 'Stock Item' },
  ];
  const [mockCategories, setMockCategories] = useState(['Electronics', 'Furniture', 'Stationery', 'Clothing']);
  const [mockGroups, setMockGroups] = useState(['Mobile Phones', 'Computers', 'Laptops', 'Accessories']);
  const [mockBrands, setMockBrands] = useState(['Apple', 'Nokia', 'Samsung', 'HP', 'Dell']);
  const [mockUnits, setMockUnits] = useState(['Pcs', 'Box', 'Kg', 'Liter', 'Set']);
  const [mockStockTypes, setMockStockTypes] = useState(['Stock Item', 'Service']);
  const [mockBarcodeFillings, setMockBarcodeFillings] = useState(['ItemCode', 'Barcode']);
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "itemImg" && files?.[0]) {
      setFormData(p => ({ ...p, itemImgFile: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(p => ({ ...p, [name]: value }));
    }
  };

  const handleItemCodeSelect = (selectedItem) => {
    setFormData(p => ({
      ...p,
      itemCode: selectedItem.itemCode,
      itemName: selectedItem.itemName,
      itemArabicName: selectedItem.itemArabicName,
      catId: selectedItem.catId,
      groupId: selectedItem.groupId,
      brandId: selectedItem.brandId,
      itemUnit: selectedItem.itemUnit,
      alternateUnit: selectedItem.alternateUnit,
      purchaseUnit: selectedItem.purchaseUnit,
      stockType: selectedItem.stockType,
    }));
    setShowItemNameDropdown(false);
    setShowItemCodeDropdown(false);
  };

  const handleAddNewItemCode = () => {
    // The formData.itemCode is already set to what the user typed.
    // We just need to clear dependent fields and close the dropdown.
    setFormData(p => ({
      ...EMPTY_FORM,
      itemCode: p.itemCode
    }));
    setShowItemCodeDropdown(false);
  };

  const handleAddNewItemName = () => {
    // The formData.itemName is already set to what the user typed.
    // We just need to clear dependent fields and close the dropdown.
    setFormData(p => ({
      ...EMPTY_FORM,
      itemName: p.itemName
    }));
    setShowItemNameDropdown(false);
  };

  const handleSubmit = () => {
    if (!formData.itemName) {
      alert("Item Name is required");
      return;
    }
    onSubmit?.(formData);
  };

  const addDummyData = () => {
    setFormData({
      itemCode: "IT-" + Math.floor(Math.random() * 10000),
      sapNo: "SAP-" + Math.floor(Math.random() * 100000),
      itemName: "Sample Item " + Math.floor(Math.random() * 100),
      itemArabicName: "عنصر نموذج",
      catId: "Electronics",
      groupId: "General",
      brandId: "Generic",
      itemUnit: "Pcs",
      alternateUnit: "Box",
      alternateQty: "10",
      purchaseUnit: "Box",
      purchaseRate: "100.00",
      landingRate: "110.00",
      salesRate: "150.00",
      mrp: "160.00",
      rack: "A-01",
      vat: "5",
      minimumLevel: "10",
      stockType: "Stock Item",
      barcodeFilling: "ItemCode",
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      lastSalesDate: new Date().toISOString().split('T')[0],
      itemImgFile: null,
      customerMargin: "10", customerPrice: "165.00",
      technicianMargin: "15", technicianPrice: "155.00",
      specialMargin: "20", specialPrice: "145.00",
      wholesaleMargin: "25", wholesalePrice: "135.00",
      projectMargin: "30", projectPrice: "125.00"
    });
  };

  const input = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all";
  const compactInput = "w-full px-2 py-1 bg-white border border-gray-300 rounded text-xs text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all";
  const label = "block text-xs font-medium text-gray-600 mb-1.5";
  const sectionTitle = "text-sm font-bold text-blue-700 uppercase tracking-wider border-b border-gray-200 pb-2 mb-4";

  const rateTypes = [
    ["Customer", "customer"],
    ["Technician", "technician"],
    ["Special", "special"],
    ["Wholesale", "wholesale"],
    ["Project", "project"],
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
        <div>
            <h2 className="text-xl font-bold text-gray-800">
            {initialData ? "Edit Item" : "New Item"}
            </h2>
            <p className="text-xs text-gray-500 mt-1">Fill in the details to register a new item.</p>
        </div>
        <div className="flex gap-3">
             <button onClick={onCancel} className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md bg-white hover:bg-gray-50 transition-colors">Cancel</button>
             <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">Save</button>
        </div>
      </div>

      <div className="p-4">
        
        {/* Top Section: Basic Info & Image */}
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
            
            {/* Left Column: Inputs */}
            <div className="flex-1 space-y-10">

                {/* Type Selection */}
                <div>
                    <h3 className={sectionTitle}>Primary Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="relative">
                            <label className={label}>Item Code</label>
                            <input
                                className={input}
                                name="itemCode"
                                value={formData.itemCode}
                                onChange={(e) => { setFormData(p => ({ ...p, itemCode: e.target.value })); if (!showItemCodeDropdown) setShowItemCodeDropdown(true); }}
                                onFocus={() => setShowItemCodeDropdown(true)}
                                onBlur={() => setTimeout(() => setShowItemCodeDropdown(false), 200)}
                                placeholder="Type to search or add new"
                                autoComplete="off"
                            />
                            {showItemCodeDropdown && (
                                <div className="absolute z-30 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                                    {MOCK_ITEMS_MASTER.filter(item =>
                                        formData.itemCode && (
                                            item.itemCode.toLowerCase().includes(formData.itemCode.toLowerCase()) ||
                                            item.itemName.toLowerCase().includes(formData.itemCode.toLowerCase())
                                        )
                                    ).map(item => (
                                        <div key={item.itemId} className="px-3 py-2 hover:bg-blue-50 cursor-pointer" onMouseDown={() => handleItemCodeSelect(item)}>
                                            <div className="font-medium">{item.itemCode}</div><div className="text-xs text-gray-500">{item.itemName}</div>
                                        </div>
                                    ))}
                                    {!MOCK_ITEMS_MASTER.some(item => item.itemCode.toLowerCase() === formData.itemCode?.toLowerCase()) && formData.itemCode && (
                                        <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-blue-600 font-medium" onMouseDown={handleAddNewItemCode}><Plus size={16} className="mr-2" /> Use new code "{formData.itemCode}"</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-3 relative">
                            <label className={`${label} after:content-['*'] after:ml-0.5 after:text-red-500`}>Item Name</label>
                            <input
                                className={input}
                                name="itemName"
                                value={formData.itemName}
                                onChange={(e) => { setFormData(p => ({ ...p, itemName: e.target.value })); if (!showItemNameDropdown) setShowItemNameDropdown(true); }}
                                onFocus={() => setShowItemNameDropdown(true)}
                                onBlur={() => setTimeout(() => setShowItemNameDropdown(false), 200)}
                                placeholder="Type to search or add new"
                                autoComplete="off"
                            />
                            {showItemNameDropdown && (
                                <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto mt-1">
                                    {MOCK_ITEMS_MASTER.filter(item =>
                                        formData.itemName && item.itemName.toLowerCase().includes(formData.itemName.toLowerCase())
                                    ).map(item => (
                                        <div key={item.itemId} className="px-3 py-2 hover:bg-blue-50 cursor-pointer" onMouseDown={() => handleItemCodeSelect(item)}><div className="font-medium">{item.itemName}</div><div className="text-xs text-gray-500">{item.itemCode}</div></div>
                                    ))}
                                    {!MOCK_ITEMS_MASTER.some(item => item.itemName.toLowerCase() === formData.itemName?.toLowerCase()) && formData.itemName && (
                                        <div className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex items-center text-blue-600 font-medium" onMouseDown={handleAddNewItemName}><Plus size={16} className="mr-2" /> Use new name "{formData.itemName}"</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label className={label}>Arabic Name</label>
                            <input className={`${input} text-right`} dir="rtl" name="itemArabicName" value={formData.itemArabicName} onChange={handleChange} placeholder="اسم العنصر" />
                        </div>
                        <div>
                            <label className={label}>SAP No</label>
                            <input className={input} name="sapNo" value={formData.sapNo} onChange={handleChange} />
                        </div>
                        <SearchableInput
                            label="Category"
                            name="catId"
                            value={formData.catId}
                            onChange={handleChange}
                            items={mockCategories}
                            onItemsChange={setMockCategories}
                        />
                        <SearchableInput
                            label="Group"
                            name="groupId"
                            value={formData.groupId}
                            onChange={handleChange}
                            items={mockGroups}
                            onItemsChange={setMockGroups}
                        />
                        <SearchableInput
                            label="Brand"
                            name="brandId"
                            value={formData.brandId}
                            onChange={handleChange}
                            items={mockBrands}
                            onItemsChange={setMockBrands}
                        />
                        <SearchableInput
                            label="Item Type"
                            name="stockType"
                            value={formData.stockType}
                            onChange={handleChange}
                            items={mockStockTypes}
                            onItemsChange={setMockStockTypes}
                        />
                        <SearchableInput
                            label="Barcode Gen."
                            name="barcodeFilling"
                            value={formData.barcodeFilling}
                            onChange={handleChange}
                            items={mockBarcodeFillings}
                            onItemsChange={setMockBarcodeFillings}
                        />
                    </div>
                </div>

                <div>
                    <h3 className={sectionTitle}>Inventory & Units</h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <SearchableInput
                            label="Unit"
                            name="itemUnit"
                            value={formData.itemUnit}
                            onChange={handleChange}
                            items={mockUnits}
                            onItemsChange={setMockUnits}
                        />
                        <SearchableInput
                            label="Alt. Unit"
                            name="alternateUnit"
                            value={formData.alternateUnit}
                            onChange={handleChange}
                            items={mockUnits}
                            onItemsChange={setMockUnits}
                        />
                        <div><label className={label}>Alt. Qty</label><input className={input} name="alternateQty" value={formData.alternateQty} onChange={handleChange} /></div>
                        <SearchableInput
                            label="Purchase Unit"
                            name="purchaseUnit"
                            value={formData.purchaseUnit}
                            onChange={handleChange}
                            items={mockUnits}
                            onItemsChange={setMockUnits}
                        />
                        <div><label className={label}>Min Level</label><input className={input} name="minimumLevel" value={formData.minimumLevel} onChange={handleChange} /></div>
                        <div><label className={label}>Rack Location</label><input className={input} name="rack" value={formData.rack} onChange={handleChange} /></div>
                    </div>
                </div>

                <div>
                    <h3 className={sectionTitle}>Pricing Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                        <div><label className={label}>Purchase Rate</label><input className={input} name="purchaseRate" value={formData.purchaseRate} onChange={handleChange} /></div>
                        <div><label className={label}>Landing Rate</label><input className={input} name="landingRate" value={formData.landingRate} onChange={handleChange} /></div>
                        <div><label className={label}>Sales Rate</label><input className={input} name="salesRate" value={formData.salesRate} onChange={handleChange} /></div>
                        <div><label className={label}>MRP</label><input className={input} name="mrp" value={formData.mrp} onChange={handleChange} /></div>
                        <div><label className={label}>VAT %</label><input className={input} name="vat" value={formData.vat} onChange={handleChange} /></div>
                    </div>
                </div>

            </div>

            {/* Right Column: Image & Meta */}
            <div className="w-full lg:w-80 flex flex-col gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Item Image</label>
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer bg-white hover:border-blue-400 transition-colors text-gray-400 relative overflow-hidden group"
                        onClick={() => fileRef.current.click()}
                    >
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} className="h-full w-full object-contain" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-medium">Change Image</span>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-4">
                                <div className="mx-auto h-10 w-10 text-gray-300 mb-2">
                                    <ImageIcon size={32} strokeWidth={1} />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Click to upload</span>
                                <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF</p>
                            </div>
                        )}
                    </div>
                    <input type="file" ref={fileRef} className="hidden" name="itemImg" onChange={handleChange} accept="image/*" />
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden w-full">
                    <button 
                        type="button"
                        onClick={() => setIsRateDetailsOpen(!isRateDetailsOpen)}
                        className={`w-full px-3 py-1.5 bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition-colors ${isRateDetailsOpen ? 'border-b border-gray-200' : ''}`}
                    >
                        <h4 className="text-[11px] font-bold text-blue-700 uppercase mr-4">Advanced Rate Details</h4>
                        {isRateDetailsOpen ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
                    </button>
                    {isRateDetailsOpen && (
                    <div className="overflow-x-auto">
                        <table className="w-auto text-xs text-left">
                            <thead className="bg-white text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-2 py-1">Rate Type</th>
                                    <th className="px-2 py-1 w-20">Margin %</th>
                                    <th className="px-2 py-1 w-24">Final Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {rateTypes.map(([label, key]) => (
                                <tr key={key} className="hover:bg-gray-50">
                                    <td className="px-2 py-1 font-medium text-gray-700">{label}</td>
                                    <td className="px-2 py-1">
                                        <input className={compactInput} name={`${key}Margin`} value={formData[`${key}Margin`]} onChange={handleChange} placeholder="0" />
                                    </td>
                                    <td className="px-2 py-1">
                                        <input className={compactInput} name={`${key}Price`} value={formData[`${key}Price`]} onChange={handleChange} placeholder="0.00" />
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}
                </div>
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

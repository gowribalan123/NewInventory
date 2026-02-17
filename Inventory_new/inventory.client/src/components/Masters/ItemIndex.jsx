import React, { useState, useRef, useEffect } from "react";
import { 
  Edit2, Trash2, Search, Download, Printer, Filter, MoreVertical, 
  ChevronLeft, ChevronRight, Plus, X, Image as ImageIcon, ChevronDown, ChevronUp, RotateCcw, ChevronsLeft, ChevronsRight 
} from "lucide-react";

export default function ItemIndex() {
  // ===== STATE MANAGEMENT =====
  const [items, setItems] = useState([
    {
      id: 1,
      itemCode: 'IP15P-256',
      itemName: 'iPhone 15 Pro',
      itemArabicName: 'ايفون 15 برو',
      sapNo: 'SAP-1001',
      barcode: '987654321098',
      category: 'Electronics',
      group: 'Mobile Phones',
      brand: 'Apple',
      unit: 'Pcs',
      alternateUnit: 'Box',
      alternateQty: '1',
      purchaseUnit: 'Box',
      purchaseRate: '900',
      landingRate: '950',
      customerPrice: '999',
      salesRate: '999',
      mrp: '1099',
      rack: 'A-12',
      vat: '15',
      minimumLevel: '5',
      stockType: 'Stock Item',
    },
    {
      id: 2,
      itemCode: 'MBP-256',
      itemName: 'Macbook Pro',
      itemArabicName: 'ماك بوك برو',
      sapNo: 'SAP-1002',
      barcode: '987654321099',
      category: 'Electronics',
      group: 'Computers',
      brand: 'Apple',
      unit: 'Pcs',
      alternateUnit: 'Box',
      alternateQty: '1',
      purchaseUnit: 'Box',
      purchaseRate: '1750',
      landingRate: '1800',
      customerPrice: '1999',
      salesRate: '1999',
      mrp: '2199',
      rack: 'B-5',
      vat: '15',
      minimumLevel: '3',
      stockType: 'Stock Item',
    },
    {
      id: 3,
      itemCode: 'NP-128',
      itemName: 'Nokia Pro',
      itemArabicName: 'نوكيا برو',
      sapNo: 'SAP-1003',
      barcode: '987654321100',
      category: 'Electronics',
      group: 'Mobile Phones',
      brand: 'Nokia',
      unit: 'Pcs',
      alternateUnit: 'Box',
      alternateQty: '1',
      purchaseUnit: 'Box',
      purchaseRate: '380',
      landingRate: '400',
      customerPrice: '499',
      salesRate: '499',
      mrp: '549',
      rack: 'A-8',
      vat: '15',
      minimumLevel: '10',
      stockType: 'Stock Item',
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [imagePreview, setImagePreview] = useState(null);
  const [isRateDetailsOpen, setIsRateDetailsOpen] = useState(false);
  const fileRef = useRef(null);

  const EMPTY_FORM = {
    itemCode: "",
    itemName: "",
    itemArabicName: "",
    sapNo: "",
    barcode: "",
    category: "",
    group: "",
    brand: "",
    unit: "",
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
    customerMargin: "",
    customerPrice: "",
    technicianMargin: "",
    technicianPrice: "",
    specialMargin: "",
    specialPrice: "",
    wholesaleMargin: "",
    wholesalePrice: "",
  };

  const [formData, setFormData] = useState(EMPTY_FORM);

  // ===== CLEANUP IMAGE PREVIEW ON UNMOUNT =====
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ===== HANDLERS =====
  const handleAddNew = () => {
    setEditingItem(null);
    setFormData(EMPTY_FORM);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData(EMPTY_FORM);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.itemName || formData.itemName.trim() === '') {
      alert("Item Name is required");
      return;
    }

    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
      ));
    } else {
      const newItem = { ...formData, id: Date.now() };
      setItems([...items, newItem]);
    }
    handleCancel();
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImg" && files && files[0]) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ===== FILTERING & PAGINATION =====
  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.barcode && item.barcode.includes(searchQuery))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // ===== STYLES =====
  const input = "w-full px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 transition-all";
  const label = "block text-xs font-medium text-gray-700 mb-1";
  const sectionTitle = "text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-2 mb-4";

  const rateTypes = [
    ["Customer", "customer"],
    ["Technician", "technician"],
    ["Special", "special"],
    ["Wholesale", "wholesale"],
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { font-family: 'Inter', sans-serif; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
        .table-row-hover:hover { background: linear-gradient(90deg, #EFF6FF 0%, #DBEAFE 100%); transform: translateX(2px); transition: all 0.2s ease; }
        .premium-shadow { box-shadow: 0 1px 3px rgba(0, 82, 204, 0.08), 0 1px 2px rgba(0, 82, 204, 0.06); }
        .premium-shadow-lg { box-shadow: 0 4px 6px -1px rgba(0, 82, 204, 0.1), 0 2px 4px -1px rgba(0, 82, 204, 0.06); }
      `}</style>
      
      {/* ===== FORM VIEW ===== */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex flex-col h-full bg-white/50 backdrop-blur-sm">
            
            {/* Form Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editingItem ? "Edit Item" : "New Item"}
                </h2>
              </div>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={handleCancel} 
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              
              {/* Form Content */}
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Left Column - Form Fields */}
                <div className="flex-1 space-y-8">
                  
                  {/* Primary Details */}
                  <div>
                    <h3 className={sectionTitle}>Primary Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className={label}>Item Code</label>
                        <input className={input} name="itemCode" value={formData.itemCode || ''} onChange={handleChange} placeholder="Enter item code" />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`${label} after:content-['*'] after:ml-0.5 after:text-red-500`}>Item Name</label>
                        <input className={input} name="itemName" value={formData.itemName || ''} onChange={handleChange} placeholder="Enter item name" required />
                      </div>
                      <div>
                        <label className={label}>SAP No</label>
                        <input className={input} name="sapNo" value={formData.sapNo || ''} onChange={handleChange} placeholder="SAP number" />
                      </div>
                      <div>
                        <label className={label}>Barcode</label>
                        <input className={input} name="barcode" value={formData.barcode || ''} onChange={handleChange} placeholder="Barcode" />
                      </div>
                      <div>
                        <label className={label}>Arabic Name</label>
                        <input className={`${input} text-right`} dir="rtl" name="itemArabicName" value={formData.itemArabicName || ''} onChange={handleChange} placeholder="اسم العنصر" />
                      </div>
                      <div>
                        <label className={label}>Category</label>
                        <input className={input} name="category" value={formData.category || ''} onChange={handleChange} placeholder="Category" />
                      </div>
                      <div>
                        <label className={label}>Group</label>
                        <input className={input} name="group" value={formData.group || ''} onChange={handleChange} placeholder="Group" />
                      </div>
                      <div>
                        <label className={label}>Brand</label>
                        <input className={input} name="brand" value={formData.brand || ''} onChange={handleChange} placeholder="Brand" />
                      </div>
                      <div>
                        <label className={label}>Stock Type</label>
                        <select className={input} name="stockType" value={formData.stockType} onChange={handleChange}>
                          <option>Stock Item</option>
                          <option>Service</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Inventory & Units */}
                  <div>
                    <h3 className={sectionTitle}>Inventory & Units</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div>
                        <label className={label}>Unit</label>
                        <input className={input} name="unit" value={formData.unit || ''} onChange={handleChange} placeholder="Pcs" />
                      </div>
                      <div>
                        <label className={label}>Alt. Unit</label>
                        <input className={input} name="alternateUnit" value={formData.alternateUnit || ''} onChange={handleChange} placeholder="Box" />
                      </div>
                      <div>
                        <label className={label}>Alt. Qty</label>
                        <input className={input} name="alternateQty" value={formData.alternateQty || ''} onChange={handleChange} placeholder="1" />
                      </div>
                      <div>
                        <label className={label}>Purchase Unit</label>
                        <input className={input} name="purchaseUnit" value={formData.purchaseUnit || ''} onChange={handleChange} placeholder="Box" />
                      </div>
                      <div>
                        <label className={label}>Min Level</label>
                        <input className={input} name="minimumLevel" value={formData.minimumLevel || ''} onChange={handleChange} placeholder="5" />
                      </div>
                      <div>
                        <label className={label}>Rack</label>
                        <input className={input} name="rack" value={formData.rack || ''} onChange={handleChange} placeholder="A-12" />
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className={sectionTitle}>Pricing Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <label className={label}>Purchase Rate</label>
                        <input className={input} name="purchaseRate" value={formData.purchaseRate || ''} onChange={handleChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={label}>Landing Rate</label>
                        <input className={input} name="landingRate" value={formData.landingRate || ''} onChange={handleChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={label}>Sales Rate</label>
                        <input className={input} name="salesRate" value={formData.salesRate || ''} onChange={handleChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={label}>MRP</label>
                        <input className={input} name="mrp" value={formData.mrp || ''} onChange={handleChange} placeholder="0.00" />
                      </div>
                      <div>
                        <label className={label}>VAT %</label>
                        <input className={input} name="vat" value={formData.vat || ''} onChange={handleChange} placeholder="5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Image & Rate Details */}
                <div className="w-full lg:w-80 flex flex-col gap-4">
                  
                  {/* Image Upload */}
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Item Image</label>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded h-48 flex flex-col items-center justify-center cursor-pointer bg-white hover:border-blue-400 transition-all duration-200 text-gray-400 relative overflow-hidden group"
                      onClick={() => fileRef.current?.click()}
                    >
                      {imagePreview ? (
                        <>
                          <img src={imagePreview} className="h-full w-full object-contain" alt="Preview" />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <span className="text-white text-sm font-medium">Change Image</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-4">
                          <ImageIcon size={40} className="mx-auto mb-2 text-gray-300" strokeWidth={1.5} />
                          <span className="text-sm font-medium text-gray-600">Click to upload</span>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG or GIF</p>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={fileRef} className="hidden" name="itemImg" onChange={handleChange} accept="image/*" />
                  </div>

                  {/* Advanced Rate Details */}
                  <div className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm">
                    <button 
                      type="button"
                      onClick={() => setIsRateDetailsOpen(!isRateDetailsOpen)}
                      className="w-full px-4 py-2 bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-all duration-200 border-b border-gray-200"
                    >
                      <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Advanced Rate Details</h4>
                      {isRateDetailsOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                    </button>
                    {isRateDetailsOpen && (
                      <div className="overflow-x-auto bg-white">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">Rate Type</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">Margin %</th>
                              <th className="px-3 py-2 text-left font-semibold text-gray-700">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {rateTypes.map(([label, key]) => (
                              <tr key={key} className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-3 py-2 font-medium text-gray-700">{label}</td>
                                <td className="px-3 py-2">
                                  <input className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20" name={`${key}Margin`} value={formData[`${key}Margin`] || ''} onChange={handleChange} placeholder="0" />
                                </td>
                                <td className="px-3 py-2">
                                  <input className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20" name={`${key}Price`} value={formData[`${key}Price`] || ''} onChange={handleChange} placeholder="0.00" />
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

            {/* Form Footer */}
            <div className="px-6 py-3 bg-white border-t border-gray-200 flex justify-between items-center shrink-0 premium-shadow">
              <div className="text-xs text-gray-500">
                <span className="text-red-500">*</span> Required fields
              </div>
            </div>
          </div>
        </form>
      ) : (
        /* ===== LIST VIEW ===== */
        <div className="flex flex-col h-full">
          
          {/* HEADER */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 premium-shadow animate-slide-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  Items
                  <span className="text-xs font-normal text-gray-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Master</span>
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">Manage your products and services</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
                  <RotateCcw size={16} className="text-gray-600 group-hover:text-blue-600" />
                </button>
                <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
                  <Printer size={16} className="text-gray-600 group-hover:text-blue-600" />
                </button>
                <button className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 group">
                  <Download size={16} className="text-gray-600 group-hover:text-blue-600" />
                </button>
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm text-sm font-medium"
                >
                  <Plus size={16} />
                  <span>New Item</span>
                </button>
              </div>
            </div>
          </header>

          {/* FILTERS */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 premium-shadow animate-slide-in">
             <div className="flex items-center gap-4">
               <div className="relative w-full max-w-md">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input
                   type="text"
                   placeholder="Search by item name, code, or barcode..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 />
               </div>
               <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
                 <Filter size={14} />
                 <span>Filter</span>
               </button>
             </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-xl premium-shadow-lg overflow-hidden border border-gray-100">
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left w-12">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Code</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Item Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Purchase Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Sales Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">MRP</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Search size={48} className="mb-3 opacity-50" />
                          <p className="text-sm font-medium text-gray-600">No items found</p>
                          <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className="border-b border-gray-100 table-row-hover cursor-pointer group"
                      >
                        <td className="px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm text-blue-600 font-medium">{item.itemCode}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-blue-700 font-bold text-sm">{item.itemName.charAt(0)}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900 truncate">{item.itemName}</p>
                              {item.itemArabicName && (
                                <p className="text-xs text-gray-500 truncate" dir="rtl">{item.itemArabicName}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200">
                            {item.brand}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{item.minimumLevel || 0}</span>
                          <span className="text-xs text-gray-500 ml-1">{item.unit}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-700">₹{parseFloat(item.purchaseRate || 0).toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-semibold text-blue-600">₹{parseFloat(item.salesRate || 0).toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-700">₹{parseFloat(item.mrp || 0).toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                              title="More"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            </div>
            </div>

          {/* FOOTER / PAGINATION */}
          <footer className="bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center text-xs text-gray-600 premium-shadow">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Showing:</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-medium">
                  {filteredItems.length === 0 ? "0" : `${indexOfFirstItem + 1} - ${Math.min(indexOfLastItem, filteredItems.length)}`} of {filteredItems.length}
                </span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-medium transition-all ${
                          currentPage === pageNum ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  
  );
}
import { useState } from "react";
import ItemForm from "./forms/ItemForm";
import ItemList from "./lists/ItemList";

// Main App Component - ZOHO MODEL
export default function Index() {
  const [items, setItems] = useState([
    {
      itemId: 1,
      itemName: 'iPhone 15 Pro',
      itemCode: 'IP15P-256',
      sapNo: 'SAP-1001',
      barcode: '987654321098',
      itemArabicName: '',
      catId: 'Electronics',
      groupId: 'Mobile Phones',
      brandId: 'Apple',
      itemUnit: 'Pcs',
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
      stockType: 'Finished Goods',
      lastPurchaseDate: '2025-12-20',
      lastSalesDate: '2026-01-10',
      itemImg: ''
    },
    {
      itemId: 2,
      itemName: 'Macbook Pro',
      itemCode: 'MBP-256',
      sapNo: 'SAP-1002',
      barcode: '987654321099',
      itemArabicName: '',
      catId: 'Electronics',
      groupId: 'Computers',
      brandId: 'Apple',
      itemUnit: 'Pcs',
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
      stockType: 'Finished Goods',
      lastPurchaseDate: '2025-11-15',
      lastSalesDate: '2026-01-05',
      itemImg: ''
    },
    {
      itemId: 3,
      itemName: 'Nokia Pro',
      itemCode: 'NP-128',
      sapNo: 'SAP-1003',
      barcode: '987654321100',
      itemArabicName: '',
      catId: 'Electronics',
      groupId: 'Mobile Phones',
      brandId: 'Nokia',
      itemUnit: 'Pcs',
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
      stockType: 'Finished Goods',
      lastPurchaseDate: '2025-12-01',
      lastSalesDate: '2026-01-08',
      itemImg: ''
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNew = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.itemId === editingItem.itemId ? { ...formData, itemId: editingItem.itemId } : item
      ));
    } else {
      // Add new item
      const newItem = { ...formData, itemId: items.length + 1 };
      setItems([...items, newItem]);
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.itemId !== itemId));
    }
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.barcode.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4">
      <div>
        {/* Header */}
        {!showForm && <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Items</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your products and services.</p>
        </div>}

        {/* ZOHO MODEL: Search + Add Button Section */}
        {!showForm && <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by item name, code, or barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2 whitespace-nowrap"
          >
            <span className="text-lg font-bold">+</span>
            New
          </button>
        </div>}

        {/* ZOHO MODEL: Form appears ABOVE the table when button clicked */}
        {showForm && (
          <ItemForm
            initialData={editingItem}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {/* ZOHO MODEL: Items List (Always visible) */}
        {!showForm && (
          <ItemList
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

  
import { useState } from "react";
import LedgerForm from "./forms/LedgerForm";
import LedgerList from "./lists/LedgerList";

// Main App Component - ZOHO MODEL
export default function LedgerIndex() {
  const [ledgers, setLedgers] = useState([
    {
      ledgerId: 1,
      ledgerName: 'Cash Account',
      ledgerCode: 'CASH-001',
      group: 'Cash-in-hand',
      openingBalance: '5000.00',
      type: 'Dr',
      contactPerson: '',
      mobile: '',
      email: '',
      city: ''
    },
    {
      ledgerId: 2,
      ledgerName: 'ABC Traders',
      ledgerCode: 'SUP-001',
      group: 'Sundry Creditors',
      openingBalance: '12500.00',
      type: 'Cr',
      contactPerson: 'John Doe',
      mobile: '9876543210',
      email: 'john@abctraders.com',
      city: 'Dubai'
    },
    {
      ledgerId: 3,
      ledgerName: 'XYZ Electronics',
      ledgerCode: 'CUST-001',
      group: 'Sundry Debtors',
      openingBalance: '8000.00',
      type: 'Dr',
      contactPerson: 'Jane Smith',
      mobile: '9876543211',
      email: 'jane@xyzelec.com',
      city: 'Abu Dhabi'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingLedger, setEditingLedger] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNew = () => {
    setEditingLedger(null);
    setShowForm(true);
  };

  const handleEdit = (ledger) => {
    setEditingLedger(ledger);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLedger(null);
  };

  const handleSubmit = (formData) => {
    if (editingLedger) {
      // Update existing ledger
      setLedgers(ledgers.map(l => 
        l.ledgerId === editingLedger.ledgerId ? { ...formData, ledgerId: editingLedger.ledgerId } : l
      ));
    } else {
      // Add new ledger
      const newLedger = { ...formData, ledgerId: ledgers.length + 1 };
      setLedgers([...ledgers, newLedger]);
    }
    setShowForm(false);
    setEditingLedger(null);
  };

  const handleDelete = (ledgerId) => {
    if (window.confirm('Are you sure you want to delete this ledger?')) {
      setLedgers(ledgers.filter(l => l.ledgerId !== ledgerId));
    }
  };

  const filteredLedgers = ledgers.filter(l =>
    l.ledgerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.ledgerCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-2 sm:p-4">
      <div>
        {/* Header */}
        {!showForm && <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Ledgers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your accounts and parties.</p>
        </div>}

        {/* ZOHO MODEL: Search + Add Button Section */}
        {!showForm && <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by ledger name or code..."
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
          <LedgerForm
            initialData={editingLedger}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}

        {/* ZOHO MODEL: Ledgers List (Always visible) */}
        {!showForm && (
          <LedgerList
            ledgers={filteredLedgers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
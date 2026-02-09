import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

// Helper components for form fields to keep the main form JSX clean.
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input {...props} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea {...props} rows="2" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select {...props} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
        <option value="">- Select -</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function LedgerIndex() {
  const emptyForm = {
    name: "",
    groupName: "",
    openingAmount: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    email: "",
    outletOwner: "",
    mobile: "",
    shopInCharge: "",
    scMobile: "",
    salesman: "",
    area: "",
    rateType: "",
    creditLimit: "",
    dueDays: "30",
    document: "NO",
    type: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [ledgers, setLedgers] = useState([
    { id: 1, name: "Cash", groupName: "Cash-in-hand", mobile: "", type: "Cash" },
    { id: 2, name: "Customer A", groupName: "Sundry Debtors", mobile: "9988776655", type: "Customer" },
  ]);
  const [editingLedger, setEditingLedger] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAutofill = () => {
    setForm({
      name: "Test Ledger " + Math.floor(Math.random() * 1000),
      groupName: "Sundry Creditors",
      openingAmount: "5000",
      address1: "123 Test St",
      address2: "Test Area",
      address3: "Test City",
      phone: "0484-1234567",
      email: "test@example.com",
      outletOwner: "Test Owner",
      mobile: "9876543210",
      shopInCharge: "Test Manager",
      scMobile: "9123456780",
      salesman: "Salesman 1",
      area: "North Zone",
      rateType: "Retail",
      creditLimit: "10000",
      dueDays: "45",
      document: "YES",
      type: "Supplier",
    });
  };

  const handleSave = () => {
    if (!form.name || !form.groupName) return;

    if (editingLedger) {
      setLedgers(ledgers.map(l => l.id === editingLedger.id ? { ...form, id: l.id } : l));
    } else {
      setLedgers([...ledgers, { ...form, id: Date.now() }]);
    }
    handleClear();
  };

  const handleEdit = (ledger) => {
    setEditingLedger(ledger);
    setForm(ledger);
  };

  const handleDelete = (id) => {
    setLedgers(ledgers.filter(l => l.id !== id));
    if (editingLedger && editingLedger.id === id) {
      handleClear();
    }
  };

  const handleClear = () => {
    setForm(emptyForm);
    setEditingLedger(null);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h1 className="text-lg font-semibold text-gray-800">Ledgers</h1>
        <p className="text-sm text-gray-500">Create and manage ledger accounts</p>
      </div>

      {/* FORM */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="flex justify-between items-center -mb-2">
          <h2 className="text-md font-semibold text-gray-800">
            {editingLedger ? "Edit Ledger" : "New Ledger"}
          </h2>
          <button
            onClick={handleAutofill}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Autofill Dummy Data
          </button>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Group Name" name="groupName" value={form.groupName} onChange={handleChange} />
          <Input label="Opening Amount" name="openingAmount" value={form.openingAmount} onChange={handleChange} type="number" />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Textarea label="Address Line 1" name="address1" value={form.address1} onChange={handleChange} />
          <Textarea label="Address Line 2" name="address2" value={form.address2} onChange={handleChange} />
          <Textarea label="Address Line 3" name="address3" value={form.address3} onChange={handleChange} />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Phone No" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Mobile No" name="mobile" value={form.mobile} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        </div>

        <div className="w-full border-t border-gray-200"></div>

        {/* Personnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Input label="Outlet Owner" name="outletOwner" value={form.outletOwner} onChange={handleChange} />
            <Input label="Shop In Charge" name="shopInCharge" value={form.shopInCharge} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <Input label="Owner Mobile No" name="mobile" value={form.mobile} onChange={handleChange} />
            <Input label="In-Charge Mobile No" name="scMobile" value={form.scMobile} onChange={handleChange} />
          </div>
        </div>

        {/* Sales & Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Salesman" name="salesman" value={form.salesman} onChange={handleChange} />
          <Input label="Area" name="area" value={form.area} onChange={handleChange} />
          <Input label="Rate Type" name="rateType" value={form.rateType} onChange={handleChange} />
        </div>

        <div className="w-full border-t border-gray-200"></div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input label="Credit Limit" name="creditLimit" value={form.creditLimit} onChange={handleChange} type="number" />
          <Input label="Due Days" name="dueDays" value={form.dueDays} onChange={handleChange} type="number" />
          <Select label="Document" name="document" value={form.document} onChange={handleChange} options={["NO", "YES"]} />
          <Select label="Type" name="type" value={form.type} onChange={handleChange} options={["Customer", "Supplier", "Cash", "Bank"]} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={handleClear} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            {editingLedger ? "Cancel" : "Clear"}
          </button>
          <button onClick={handleSave} className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            {editingLedger ? "Update" : "Save"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Group</th>
              <th className="px-4 py-3 text-left font-medium">Mobile</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {ledgers.map((l) => (
              <tr key={l.id} className="border-b border-gray-200 last:border-none hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-800">{l.name}</td>
                <td className="px-4 py-2 text-gray-600">{l.groupName}</td>
                <td className="px-4 py-2 text-gray-600">{l.mobile}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => handleEdit(l)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(l.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {ledgers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-400 py-6">No ledgers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

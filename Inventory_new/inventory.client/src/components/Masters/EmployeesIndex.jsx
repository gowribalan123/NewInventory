import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const EmployeesIndex = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      designation: "Manager",
      address1: "Street 1",
      address2: "Area",
      address3: "City",
      pincode: "680001",
      phone: "0487-123456",
      mobile: "9876543210",
      inactive: false,
    },
  ]);

  const emptyForm = {
    id: null,
    name: "",
    designation: "",
    address1: "",
    address2: "",
    address3: "",
    pincode: "",
    phone: "",
    mobile: "",
    inactive: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (!form.name.trim()) return;

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === editingEmployee.id ? { ...form, id: editingEmployee.id } : e))
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }
    handleClear();
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setForm(emp);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    if (editingEmployee && editingEmployee.id === id) {
      handleClear();
    }
  };

  const handleClear = () => {
    setForm(emptyForm);
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* ===== PAGE HEADER ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h1 className="text-lg font-semibold text-gray-800">Employees</h1>
        <p className="text-sm text-gray-500">
          Create and manage employees
        </p>
      </div>

      {/* ===== FORM ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-md font-semibold text-gray-800 mb-4">
          {editingEmployee ? "Edit Employee" : "New Employee"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {/* Left Column */}
          <div className="space-y-3">
            {[
              ["Name", "name", "Employee Name"],
              ["Designation", "designation", "Designation"],
              ["Address 1", "address1", "Street, Building"],
              ["Address 2", "address2", "Area, Landmark"],
            ].map(([label, name, placeholder]) => (
              <div key={name} className="grid grid-cols-3 items-center gap-3">
                <label className="col-span-1 text-sm text-gray-700">{label}</label>
                <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {[
              ["Address 3", "address3", "City"],
              ["Pin Code", "pincode", "Pin Code"],
              ["Phone", "phone", "Phone No (Res.)"],
              ["Mobile", "mobile", "Mobile No"],
            ].map(([label, name, placeholder]) => (
              <div key={name} className="grid grid-cols-3 items-center gap-3">
                <label className="col-span-1 text-sm text-gray-700">{label}</label>
                <input name={name} value={form[name]} onChange={handleChange} placeholder={placeholder} className="col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Checkbox and Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="inactive"
              checked={form.inactive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Mark as Inactive
          </label>

          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {editingEmployee ? "Cancel" : "Clear"}
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none"
            >
              {editingEmployee ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Designation</th>
              <th className="px-4 py-3 text-left font-medium">Mobile</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-gray-200 last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2 font-medium text-gray-800">{emp.name}</td>
                <td className="px-4 py-2 text-gray-600">{emp.designation}</td>
                <td className="px-4 py-2 text-gray-600">{emp.mobile}</td>

                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesIndex;

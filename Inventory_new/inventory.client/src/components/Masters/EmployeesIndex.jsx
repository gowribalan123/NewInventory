import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Users, Save, RotateCcw } from "lucide-react";

const API_URL = "http://localhost:5166/api/Employees";

const EmployeesIndex = () => {
  const [employees, setEmployees] = useState([]);

  const emptyForm = {
    empCode: "",
    empName: "",
    designation: "",
    address1: "",
    address2: "",
    address3: "",
    pinCode: "",
    mobile: "",
    emailId: "",
    isSalesman: false,
    isRemoved: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async () => {
    if (!form.empName.trim()) return;

    const payload = {
      ...form,
      empCode: form.empCode || `EMP${Math.floor(1000 + Math.random() * 9000)}`,
      companyID: 1 // Hardcoded
    };

    try {
      let response;
      if (editingEmployee) {
        response = await fetch(`${API_URL}/${editingEmployee.empId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, empId: editingEmployee.empId }),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        handleClear();
        fetchEmployees();
      } else {
        alert("Failed to save employee.");
      }
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setForm(emp);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleClear = () => {
    setForm(emptyForm);
    setEditingEmployee(null);
  };

  return (
    <div className="p-1 md:p-2 bg-[#f0f5ff] min-h-screen font-sans text-sm w-full">
      <div className="max-w-[99%] mx-auto bg-white shadow-md rounded border border-blue-300 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#1e293b] px-3 py-1.5 flex justify-between items-center text-white">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Users size={14} className="text-yellow-400" /> Employee Master
            </h1>
          </div>
        </div>

        <div className="p-2 bg-[#e2ebf8]">
          {/* Form Section */}
          <div className="bg-white p-3 border border-blue-200 rounded shadow-sm mb-2">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Row 1 */}
              <div className="md:col-span-6 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Name</span>
                <input name="empName" value={form.empName} onChange={handleChange} placeholder="Employee Name" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-6 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Designation</span>
                <input name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>

              {/* Row 2 */}
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Address 1</span>
                <input name="address1" value={form.address1} onChange={handleChange} placeholder="Street" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Address 2</span>
                <input name="address2" value={form.address2} onChange={handleChange} placeholder="Area" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-4 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Address 3</span>
                <input name="address3" value={form.address3} onChange={handleChange} placeholder="City" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>

              {/* Row 3 */}
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Pin Code</span>
                <input name="pinCode" value={form.pinCode} onChange={handleChange} placeholder="Pin Code" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="w-24 text-[11px] font-semibold text-slate-600">Mobile</span>
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="flex-1 border border-slate-300 p-1 text-xs outline-none focus:border-blue-500" />
              </div>
              <div className="md:col-span-6 flex items-center gap-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" name="isSalesman" checked={form.isSalesman} onChange={handleChange} className="rounded text-blue-600" />
                  Salesman
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input type="checkbox" name="isRemoved" checked={form.isRemoved} onChange={handleChange} className="rounded text-red-600" />
                  Removed
                </label>
              </div>
              <div className="md:col-span-4 flex justify-end gap-2">
                <button onClick={handleClear} className="flex items-center gap-1.5 px-3 py-1 border border-slate-300 rounded font-bold text-slate-700 text-[11px] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                  <RotateCcw size={14} strokeWidth={2.5} className="text-red-500" /> CLEAR
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-1 rounded bg-emerald-600 font-black text-white text-[11px] shadow-md hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide">
                  <Save size={16} strokeWidth={2.5} /> {editingEmployee ? "UPDATE" : "SAVE"}
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="border border-slate-300 rounded bg-white overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc] border-b border-slate-300">
                <tr className="text-[#1e3a8a] font-bold text-[10px] uppercase text-left">
                  <th className="p-2 border-r border-slate-200">Code</th>
                  <th className="p-2 border-r border-slate-200">Name</th>
                  <th className="p-2 border-r border-slate-200">Designation</th>
                  <th className="p-2 border-r border-slate-200">Mobile</th>
                  <th className="p-2 w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map((emp) => (
                  <tr key={emp.empId} className="hover:bg-blue-50/50 transition-colors">
                    <td className="p-2 border-r border-slate-100 text-xs text-slate-600">{emp.empCode}</td>
                    <td className="p-2 border-r border-slate-100 text-xs font-medium text-slate-700">{emp.empName}</td>
                    <td className="p-2 border-r border-slate-100 text-xs text-slate-600">{emp.designation}</td>
                    <td className="p-2 border-r border-slate-100 text-xs text-slate-600">{emp.mobile}</td>
                    <td className="p-2 text-center flex justify-center gap-2">
                      <button onClick={() => handleEdit(emp)} className="text-blue-600 hover:text-blue-800"><Pencil size={14} /></button>
                      <button onClick={() => handleDelete(emp.empId)} className="text-red-600 hover:text-red-800"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-xs text-slate-400">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesIndex;

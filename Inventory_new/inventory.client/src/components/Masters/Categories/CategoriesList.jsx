import React, { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react';

function CategoriesList({ data, onEdit, onDelete, onDeleteSelected }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(data.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleDeleteSelected = () => {
    onDeleteSelected(selectedIds);
    setSelectedIds([]);
  };

  const isAllSelected = data && data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
      {selectedIds.length > 0 && (
        <div className="bg-gray-50 px-6 py-2 border-b border-gray-200 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">{selectedIds.length} selected</span>
          <button 
            onClick={handleDeleteSelected}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Selected
          </button>
        </div>
      )}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 w-12">
               <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={isAllSelected} onChange={handleSelectAll} />
            </th>
            <th className="px-6 py-3">Category Name</th>
            <th className="w-full px-6 py-3">Category Group</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedIds.includes(item.id) ? 'bg-blue-50' : 'bg-white'}`}>
                <td className="px-6 py-4">
                   <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={selectedIds.includes(item.id)} onChange={() => handleSelectOne(item.id)} />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {item.group}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(item)}
                    className="p-1.5 hover:bg-blue-50 text-blue-600 rounded transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="p-1.5 hover:bg-red-50 text-red-600 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList

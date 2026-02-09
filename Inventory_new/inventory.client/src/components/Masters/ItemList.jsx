import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Item Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Part No</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Category</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Brand</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Unit</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b last:border-none hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
              <td className="px-4 py-3 text-gray-600">{item.partNo}</td>
              <td className="px-4 py-3 text-gray-600">{item.category}</td>
              <td className="px-4 py-3 text-gray-600">{item.brand}</td>
              <td className="px-4 py-3 text-gray-600">{item.unit}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="6" className="px-4 py-6 text-center text-gray-400">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
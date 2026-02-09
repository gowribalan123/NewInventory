import { FilePenLine, Trash2, Image } from 'lucide-react';

export default function ItemList({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-base">No items found. Click "Add New Item" to create your first item.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">All Items</h3>
        <span className="text-sm text-gray-600 font-medium">
          {items.length} result(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SAP No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Pur. Rate</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Rate</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.itemId} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  {item.itemImg ? (
                    <img src={item.itemImg} alt="" className="h-10 w-10 object-cover rounded border border-gray-200" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                      <Image size={20} />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">{item.itemId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">{item.itemName}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.itemCode}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.sapNo || '-'}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.catId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.brandId}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.itemUnit}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                  {Number(item.purchaseRate || item.landingRate || 0).toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900 font-semibold">
                  {Number(item.salesRate || 0).toFixed(2)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <FilePenLine size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item.itemId)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
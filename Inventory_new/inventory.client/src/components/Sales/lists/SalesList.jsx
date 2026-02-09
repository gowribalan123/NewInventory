import { FilePenLine, Trash2 } from 'lucide-react';

export default function SalesList({ sales, onEdit, onDelete }) {
  if (!sales || sales.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-16 text-center">
        <p className="text-gray-500 text-base">No sales found. Click "+ New Sale" to create your first entry.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">All Sales</h3>
        <span className="text-sm text-gray-600 font-medium">
          {sales.length} result(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {sale.billNo}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {sale.billDate}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {sale.party}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sale.billType === 'Cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {sale.billType}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                  {sale.grandTotal}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-3">
                    <button onClick={() => onEdit && onEdit(sale)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit"><FilePenLine size={18} /></button>
                    <button onClick={() => onDelete && onDelete(sale.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete"><Trash2 size={18} /></button>
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

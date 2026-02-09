import { FilePenLine, Trash2 } from 'lucide-react';

export default function PurchaseList({ purchases, onEdit, onDelete }) {
  if (!purchases || purchases.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 text-base">No purchases found. Click "+ Add New Purchase" to create your first entry.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">All Purchases</h3>
        <span className="text-sm text-gray-600 font-medium">
          {purchases.length} result(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Godown</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {purchase.invoiceNo}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {purchase.invoiceDate}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {purchase.party}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    purchase.billType === 'Cash' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {purchase.billType}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {purchase.godown}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-900 font-bold">
                  {purchase.grandTotal}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit && onEdit(purchase)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <FilePenLine size={18} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(purchase.id)}
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

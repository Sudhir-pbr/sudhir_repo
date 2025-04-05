

import { useState } from 'react';

const DataTable = ({ 
  title, 
  columns, 
  data, 
  filters, 
  onFilterChange,
  showPagination = false,
  showExport = false
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Calculate paginated data
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex space-x-4">
            {filters && onFilterChange && (
              <>
                {filters.specialization && (
                  <select 
                    name="specialization"
                    value={filters.specialization}
                    onChange={onFilterChange}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  >
                    <option>All Specializations</option>
                    <option>Computer Science</option>
                    <option>Electrical Engineering</option>
                    <option>Mechanical Engineering</option>
                  </select>
                )}
                {filters.status && (
                  <select 
                    name="status"
                    value={filters.status}
                    onChange={onFilterChange}
                    className="border border-gray-300 rounded px-3 py-1 text-sm"
                  >
                    <option>All Status</option>
                    <option>Shortlisted</option>
                    <option>Pending</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                )}
              </>
            )}
            {showExport && (
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Export to Excel
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.header} 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td 
                    key={`${rowIndex}-${column.accessor}`} 
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {column.cell 
                      ? column.cell(row[column.accessor]) 
                      : row[column.accessor]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    page === currentPage 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
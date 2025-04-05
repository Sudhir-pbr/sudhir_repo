

import React from 'react';

const CompanyCard = ({ company = {} }) => {
  const { 
    name = 'Unknown Company',
    selected = 0,
    package: pkg = 0,
    date = 'Not scheduled',
    process = 'Not specified'
  } = company;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
      <div className="p-6 h-full flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {name}
        </h3>
        
        <div className="space-y-3 text-gray-600 flex-grow">
          <div className="flex justify-between">
            <span>Selected:</span>
            <span className="font-medium">{selected}</span>
          </div>
          
          <div className="flex justify-between">
            <span>Package:</span>
            <span className="font-medium">
              {pkg ? `₹${pkg}L` : 'Not disclosed'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Drive Date:</span>
            <span className="font-medium">
              {date}
            </span>
          </div>
          
          <div className="pt-2 mt-auto border-t border-gray-100">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Process:</span> {process}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearchClick }) => {
  return (
    <div className="mt-4 flex justify-center">
      <input
        type="text"
        className="border rounded-l-md w-80 py-2 px-4 text-gray-700 focus:outline-none"
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md"
        onClick={onSearchClick}
      >
        ค้นหา
      </button>
    </div>
  );
};

export default SearchBar;

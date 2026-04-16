"use client";
import React from 'react';
import { 
  FaSearch, 
  FaBars, 
  FaUserCircle, 
  FaChevronDown 
} from 'react-icons/fa';

export function AdminHeaderPage() {
  return (
    <header className="h-17 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      {/* Search Section */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#0C8CE9] transition-colors">
            <FaSearch size={18} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 bg-gray-50/50 border border-gray-100 rounded-xl leading-5 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0C8CE9]/20 focus:border-[#0C8CE9] transition-all text-sm"
          />
        </div>
      </div>

      {/* Right Section: Menu & Profile */}
      <div className="flex items-center gap-6">
        {/* Burger Menu Icon */}
        <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
          <FaBars size={18} />
        </button>

        {/* Account / User Section */}
        <button className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-50 rounded-2xl transition-all group">
          {/* Profile Icon with Blue Background */}
          <div className="w-9 h-9 bg-[#0C8CE9] text-white rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <FaUserCircle size={20} />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700">Account</span>
            <FaChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </button>
      </div>
    </header>
  );
}

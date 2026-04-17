"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaShoppingCart, 
  FaHandshake, 
  FaTasks, 
  FaChartBar, 
  FaCreditCard, 
  FaCog, 
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/admin/dashboard' },
  { id: 'users', label: 'Utilisateurs', icon: FaUsers, path: '/admin/users' },
  { id: 'purchases', label: 'Achat', icon: FaShoppingCart, path: '/admin/achat' },
  { id: 'deals', label: 'Deals', icon: FaHandshake, path: '/admin/deals' },
  { id: 'tasks', label: 'Tasks', icon: FaTasks, path: '/admin/tasks' },
  { id: 'reports', label: 'Reports', icon: FaChartBar, path: '/admin/reports' },
  { id: 'billing', label: 'Billing', icon: FaCreditCard, path: '/admin/billing' },
  { id: 'settings', label: 'Settings', icon: FaCog, path: '/admin/settings' },
];

export function AdminSidebarPage({ isCollapsed, onToggle }) {
  const pathname = usePathname();

  return (
    <aside 
      className={`
        fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col font-sans z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      {/* Header section */}
      <div className={`p-4.5 flex items-center mb-4 border-b border-gray-100 ${isCollapsed ? 'justify-center px-0' : 'justify-between'}`}>
        {!isCollapsed && (
          <h1 className="font-bold text-gray-800 text-lg tracking-tight truncate animate-in fade-in duration-500">
            Formini Admin
          </h1>
        )}
        <button 
          onClick={onToggle}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500"
        >
          {isCollapsed ? <FaChevronRight size={18} /> : <FaChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation section */}
      <nav className={`flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {menuItems.map((item) => {
          // L'item est actif si le pathname commence par son chemin
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.path}
              title={isCollapsed ? item.label : ''}
              className={`
                w-full flex items-center rounded-xl transition-all duration-200 group
                ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}
                ${isActive 
                  ? 'bg-[#0C8CE9] text-white' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              <Icon 
                size={18} 
                className={`flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`} 
              />
              {!isCollapsed && (
                <span className={`font-medium truncate transition-all duration-300 animate-in slide-in-from-left-2`}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer User section */}
      <div className={`p-4 border-t border-gray-100 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`bg-gray-50 rounded-2xl p-3 flex items-center gap-3 transition-all ${isCollapsed ? 'p-2' : 'p-3'}`}>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-[#0C8CE9] font-bold">
            AD
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden animate-in fade-in duration-500">
              <p className="text-sm font-bold text-gray-800 truncate">Administrateur</p>
              <p className="text-[10px] text-gray-500 truncate">admin@formini.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  { id: 'users', label: 'Apprenants', icon: FaUsers, path: '/admin/users' },
  { id: 'formateur', label: 'Formateur', icon: FaUsers, path: '/admin/formateur' },
  { id: 'purchases', label: 'Achat', icon: FaShoppingCart, path: '/admin/achat' },
  { id: 'tasks', label: 'Tasks', icon: FaTasks, path: '#' },
  { id: 'deals', label: 'Deals', icon: FaHandshake, path: '#' },
  { id: 'billing', label: 'Billing', icon: FaCreditCard, path: '#'}, 
  { id: 'settings', label: 'Settings', icon: FaCog, path: '#' },
];

// Navigation principale visible sur le menu mobile (4 éléments max)
const mobileNav = [
  { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt, path: '/admin/dashboard' },
  { id: 'users', label: 'Apprenants', icon: FaUsers, path: '/admin/users' },
  { id: 'formateur', label: 'Formateur', icon: FaChartBar, path: '/admin/formateur' },
  { id: 'purchases', label: 'Achat', icon: FaShoppingCart, path: '/admin/achat' },
];

export function AdminSidebarPage({ isCollapsed, onToggle }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  return (
    <>
      {/* Sidebar Desktop - Masquée sur mobile */}
      <aside 
        className={`
          hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex-col font-sans z-40
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
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.path}
                title={isCollapsed ? item.label : ''}
                className={`
                  w-full flex items-center rounded-xl transition-all duration-200 group
                  ${isCollapsed ? 'justify-center p-3' : 'gap-4 px-4 py-3'}
                  ${active 
                    ? 'bg-[#0C8CE9] text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon 
                  size={18} 
                  className={`flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`} 
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

      {/* Bottom Navigation Mobile - Visible uniquement sur mobile/tablette */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-14 z-[9999] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] rounded-t-[5px] select-none" style={{ touchAction: 'manipulation' }}>
        {mobileNav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.path);
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors duration-200 ${active ? 'text-[#0C8CE9]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <div className={`p-1 rounded-xl transition-all ${active ? 'bg-blue-50' : ''}`}>
                <Icon size={18} className={active ? 'text-[#0C8CE9]' : 'text-gray-400'} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight ${active ? 'text-[#0C8CE9]' : 'text-gray-500'}`}>
                {item.label}
              </span>
              <div className={`w-1.5 h-1.5 rounded-full mt-0.5 transition-all duration-300 ${active ? 'bg-[#0C8CE9] opacity-100' : 'bg-transparent opacity-0'}`}></div>
            </button>
          );
        })}
      </nav>
    </>
  );
}

import React from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import {
  Home,
  Store,
  Package,
  BookOpen,
  PieChart,
  FileText,
  Settings
} from 'lucide-react';

export interface MenuItem {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, onClick }) => (
  <div className="lg:hidden fixed left-2 top-5 z-50">
    <button
      onClick={onClick}
      className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {isOpen ? "" : <Menu className="h-6 w-6" />}
    </button> 
  </div>
);

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Home' },
  { icon: Store, label: 'Stores' },
  { icon: Package, label: 'Products', active: true },
  { icon: BookOpen, label: 'Catalogue' },
  { icon: PieChart, label: 'Promotions' },
  { icon: FileText, label: 'Reports' },
  { icon: FileText, label: 'Docs' },
  { icon: Settings, label: 'Settings' }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose}) => {
  return (
    <div
      className={`
        fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 
        transition-transform duration-200 ease-in-out bg-white shadow-sm w-64 
        ${isOpen ? 'z-50' : 'z-0'} 
        flex flex-col h-full
        ${isOpen ? 'translate-x-0 ' : '-translate-x-full'}`}
    >
      
      <div className="flex justify-between items-center p-6">
        <img
          src="https://res.cloudinary.com/dviwzny3v/image/upload/v1731089301/poehridvfrc1nkiya7hc.png"
          alt="Logo"
          className="h-8 w-auto"
        />
        {/* Close Button */}
        {isOpen && (
          <button
            onClick={onClose}
            className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium
                ${item.active
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className=" border-t">
        <div className="p-4">
          <div className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
            <img
              src="https://res.cloudinary.com/dviwzny3v/image/upload/v1731081522/zlib6bvkm7ogpcabqboz.png"
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Andy Samberg
              </p>
              <p className="text-xs text-gray-500 truncate">
                andy.samberg@gmail.com
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

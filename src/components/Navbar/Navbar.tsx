import React from 'react';
import { Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <nav className="bg-gray-800 p-4 md:ml-16">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          <h1 className="text-2xl font-bold text-red-600">StreamFlix</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-gray-700 px-4 py-2 rounded-full pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
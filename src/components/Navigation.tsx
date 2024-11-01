import React, { useState } from 'react';
import { Film, Search, Menu, X, Home, Clock, BookMarked, Heart } from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <nav className="bg-gray-800 p-4 md:ml-16">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold text-red-600">StreamFlix</h1>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700 px-4 py-2 rounded-full pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 hidden md:flex flex-col items-center py-4 space-y-6">
        <Home className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        <Clock className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        <BookMarked className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
        <Heart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-40 md:hidden">
          <div className="p-4 space-y-4">
            <button 
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X />
            </button>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-700 px-4 py-2 rounded-full text-sm"
              />
              <div className="flex flex-col space-y-2">
                <button className="text-left px-4 py-2 hover:bg-gray-800 rounded">Inicio</button>
                <button className="text-left px-4 py-2 hover:bg-gray-800 rounded">Recientes</button>
                <button className="text-left px-4 py-2 hover:bg-gray-800 rounded">Guardados</button>
                <button className="text-left px-4 py-2 hover:bg-gray-800 rounded">Favoritos</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
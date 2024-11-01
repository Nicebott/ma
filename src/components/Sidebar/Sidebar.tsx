import React from 'react';
import { Home, Clock, BookMarked, Heart } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'recent', icon: Clock, label: 'Recientes' },
    { id: 'watchlist', icon: BookMarked, label: 'Ver más tarde' },
    { id: 'favorites', icon: Heart, label: 'Favoritos' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 hidden md:flex flex-col items-center py-4 space-y-6">
      {navItems.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            activeSection === id
              ? 'text-red-600 bg-gray-700'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          title={label}
        >
          <Icon className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
import React from 'react';
import { Home, Clock, BookMarked, Heart } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-800 hidden md:flex flex-col items-center py-4 space-y-6">
      <Home className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
      <Clock className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
      <BookMarked className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
      <Heart className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
    </div>
  );
};

export default Sidebar;
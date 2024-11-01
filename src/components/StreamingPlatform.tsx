import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import MediaGrid from './MediaGrid/MediaGrid';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import { MediaItem } from '../types';
import { mediaLibrary } from '../data/mediaLibrary';

const StreamingPlatform: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('all');
    setActiveSection('search');
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setSearchQuery('');
    if (section === 'home') {
      setSelectedCategory('all');
    } else if (section === 'favorites') {
      setSelectedCategory('favorites');
    }
  };

  let filteredContent = mediaLibrary;

  if (searchQuery) {
    filteredContent = mediaLibrary.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.genres?.some(genre => 
        genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  } else {
    filteredContent = selectedCategory === 'all' 
      ? mediaLibrary 
      : selectedCategory === 'favorites'
      ? mediaLibrary.filter(item => favorites.includes(item.id))
      : mediaLibrary.filter(item => 
          selectedCategory === 'movies' ? item.type === 'movie' : item.type === 'series'
        );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigation} />
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <main className="flex-1 md:ml-16">
        <div className="container mx-auto p-4">
          <h1 className="sr-only">StreamFlix - Tu plataforma de streaming favorita</h1>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MediaGrid
            items={filteredContent}
            onPlay={setSelectedMedia}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700 py-6 md:ml-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p className="mb-2">© {new Date().getFullYear()} StreamFlix. Created by Nicebott. All rights reserved.</p>
            <nav className="mt-4">
              <ul className="flex justify-center space-x-6 text-sm">
                <li><a href="#" className="hover:text-red-500 transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Contacto</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      {selectedMedia && (
        <MediaPlayer
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
};

export default StreamingPlatform;
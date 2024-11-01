import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import CategoryFilter from './CategoryFilter/CategoryFilter';
import MediaGrid from './MediaGrid/MediaGrid';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import { MediaItem } from '../types';
import { mediaLibrary } from '../data/mediaLibrary';

const StreamingPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredContent = selectedCategory === 'all' 
    ? mediaLibrary 
    : selectedCategory === 'favorites'
    ? mediaLibrary.filter(item => favorites.includes(item.id))
    : mediaLibrary.filter(item => 
        selectedCategory === 'movies' ? item.type === 'movie' : item.type === 'series'
      );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="md:ml-16">
        <div className="container mx-auto p-4">
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
      </div>

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
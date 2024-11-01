import React, { useState } from 'react';
import Navigation from './Navigation';
import ContentGrid from './ContentGrid';
import SeriesDetails from './SeriesDetails';
import { initialContent } from '../data/content';
import type { Movie } from '../types';

const StreamingPlatform = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedContent, setSelectedContent] = useState<Movie | null>(null);
  const [content] = useState<Movie[]>(initialContent);

  const handleContentSelect = (item: Movie) => {
    setSelectedContent(item);
  };

  const handleBack = () => {
    setSelectedContent(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <main className="md:ml-16">
        {selectedContent ? (
          <SeriesDetails content={selectedContent} onBack={handleBack} />
        ) : (
          <ContentGrid
            content={content}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onContentSelect={handleContentSelect}
          />
        )}
      </main>
    </div>
  );
};

export default StreamingPlatform;
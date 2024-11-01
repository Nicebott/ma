import React, { useState, useEffect } from 'react';
import { Play, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types';

interface ContentGridProps {
  content: Movie[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onContentSelect: (content: Movie) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({
  content,
  selectedCategory,
  onCategoryChange,
  onContentSelect,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const featuredContent = content.filter(item => item.featured);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === featuredContent.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [featuredContent.length]);

  const nextSlide = () => {
    setCurrentSlide(prev => 
      prev === featuredContent.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prev => 
      prev === 0 ? featuredContent.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const filteredContent = selectedCategory === 'all'
    ? content
    : content.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      {/* Carousel */}
      <div className="relative h-96 mb-8 overflow-hidden rounded-xl">
        {featuredContent.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
              index === currentSlide ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
              <div className="absolute bottom-0 left-0 p-8">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-lg mb-6 max-w-xl">{item.description}</p>
                <div className="flex space-x-4">
                  <button 
                    className="flex items-center space-x-2 bg-red-600 px-6 py-3 rounded-full hover:bg-red-700"
                    onClick={() => onContentSelect(item)}
                  >
                    <Play className="w-5 h-5" />
                    <span>Reproducir</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 bg-gray-700 px-6 py-3 rounded-full hover:bg-gray-600"
                    onClick={() => onContentSelect(item)}
                  >
                    <Star className="w-5 h-5" />
                    <span>Más Info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto space-x-4 mb-8 pb-2 scrollbar-hide">
        {['all', 'popular', 'recent', 'classics'].map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category ? 'bg-red-600' : 'bg-gray-700'
            }`}
          >
            {category === 'all' ? 'Todo' : 
             category === 'popular' ? 'Popular' :
             category === 'recent' ? 'Recientes' : 'Clásicos'}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredContent.map((item) => (
          <div 
            key={item.id} 
            className="relative group cursor-pointer"
            onClick={() => onContentSelect(item)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4 w-full">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      {item.type === 'movie' ? 'Película' : 'Serie'}
                    </span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex items-center space-x-1 bg-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-700">
                      <Play className="h-4 w-4" />
                      <span>Reproducir</span>
                    </button>
                    <button 
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className={`p-2 rounded-full ${
                        favorites.includes(item.id) ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <Heart 
                        className="h-4 w-4" 
                        fill={favorites.includes(item.id) ? "white" : "none"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
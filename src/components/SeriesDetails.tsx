import React, { useState } from 'react';
import { ChevronLeft, Play, Star } from 'lucide-react';
import type { Movie, Episode } from '../types';

interface SeriesDetailsProps {
  content: Movie;
  onBack: () => void;
}

const SeriesDetails: React.FC<SeriesDetailsProps> = ({ content, onBack }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60">
          <div className="absolute bottom-0 left-0 p-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white mb-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Volver</span>
            </button>
            <h1 className="text-5xl font-bold mb-4">{content.title}</h1>
            <div className="flex items-center space-x-4 text-lg mb-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{content.rating}</span>
              </div>
              <span>•</span>
              <span>{content.type === 'movie' ? 'Película' : 'Serie'}</span>
              <span>•</span>
              <span>{content.category}</span>
            </div>
            <p className="text-lg max-w-2xl mb-6">{content.description}</p>
            <button className="flex items-center space-x-2 bg-red-600 px-6 py-3 rounded-full hover:bg-red-700">
              <Play className="w-5 h-5" />
              <span>Reproducir</span>
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="container mx-auto px-8 py-12">
        <div className="flex space-x-4 mb-8">
          {[1, 2, 3, 4].map((season) => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              className={`px-4 py-2 rounded-full ${
                selectedSeason === season ? 'bg-red-600' : 'bg-gray-700'
              }`}
            >
              Temporada {season}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {content.episodes?.[selectedSeason]?.map((episode, index) => (
            <div
              key={episode.id}
              className="flex items-start space-x-4 bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors"
            >
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-48 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {index + 1}. {episode.title}
                  </h3>
                  <button className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-full hover:bg-red-700">
                    <Play className="w-4 h-4" />
                    <span>Reproducir</span>
                  </button>
                </div>
                <p className="text-gray-400 mt-2">{episode.description}</p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
                  <span>{episode.duration}</span>
                  <span>•</span>
                  <span>{episode.airDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
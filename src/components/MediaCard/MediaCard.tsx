import React from 'react';
import { Play, Star, Heart } from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaCardProps {
  item: MediaItem;
  onPlay: (media: MediaItem) => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({ item, onPlay, onToggleFavorite, isFavorite }) => {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={item.coverUrl}
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
              <button 
                onClick={() => onPlay(item)}
                className="flex items-center space-x-1 bg-red-600 px-4 py-2 rounded-full text-sm"
              >
                <Play className="h-4 w-4" />
                <span>Reproducir</span>
              </button>
              <button 
                onClick={() => onToggleFavorite(item.id)}
                className={`flex items-center justify-center ${
                  isFavorite ? 'bg-red-600' : 'bg-gray-700'
                } p-2 rounded-full`}
              >
                <Heart 
                  className="h-4 w-4" 
                  fill={isFavorite ? "white" : "none"}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
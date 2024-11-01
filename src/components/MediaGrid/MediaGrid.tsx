import React from 'react';
import MediaCard from '../MediaCard/MediaCard';
import { MediaItem } from '../../types';

interface MediaGridProps {
  items: MediaItem[];
  onPlay: (media: MediaItem) => void;
  onToggleFavorite: (id: number) => void;
  favorites: number[];
}

const MediaGrid: React.FC<MediaGridProps> = ({ items, onPlay, onToggleFavorite, favorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          onPlay={onPlay}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(item.id)}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
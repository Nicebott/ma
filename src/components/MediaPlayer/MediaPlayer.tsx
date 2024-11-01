import React, { useState } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import { MediaItem } from '../../types';

interface MediaPlayerProps {
  media: MediaItem;
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ media, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const showSeasons = media.type === 'series';

  return (
    <div className="fixed inset-0 bg-black/90 flex items-start justify-center z-50 overflow-y-auto pt-10">
      <div className="bg-gray-900 rounded-lg max-w-5xl w-full mx-4 mb-10">
        <div className="relative h-[400px]">
          <img
            src={media.coverUrl}
            alt={media.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-900/50 rounded-full hover:bg-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 -mt-20 relative">
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">{media.title}</h2>
              {media.originalTitle && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="font-semibold">Título original</span>
                  <span>{media.originalTitle}</span>
                </div>
              )}
              
              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Rating</span>
                  <span>{media.rating}</span>
                </div>
                
                {media.status && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Estado</span>
                    <span>{media.status}</span>
                  </div>
                )}
                
                {media.lastAirDate && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Última fecha de emisión</span>
                    <span>{media.lastAirDate}</span>
                  </div>
                )}
              </div>

              {media.genres && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-400">Géneros</span>
                  <div className="flex gap-2">
                    {media.genres.map((genre, index) => (
                      <React.Fragment key={genre}>
                        <a href="#" className="text-teal-400 hover:underline">{genre}</a>
                        {index < media.genres!.length - 1 && <span className="text-gray-400">/</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {media.tmdbUrl && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="font-semibold">Más detalles en</span>
                  <a 
                    href={media.tmdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline flex items-center gap-1"
                  >
                    TMDB
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            {showSeasons && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Temporadas y episodios</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {media.seasons?.map((season) => (
                    <button
                      key={season.number}
                      onClick={() => setSelectedSeason(season.number)}
                      className={`px-4 py-2 rounded-full ${
                        selectedSeason === season.number 
                          ? 'bg-teal-500 text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {`Temporada ${season.number}`}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {media.seasons
                    ?.find(s => s.number === selectedSeason)
                    ?.episodes.map((episode) => (
                      <div 
                        key={episode.number}
                        className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        {episode.thumbnail && (
                          <img 
                            src={episode.thumbnail} 
                            alt={episode.title}
                            className="w-40 h-24 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              EP | {episode.number}
                            </h4>
                            <button className="px-4 py-1 bg-gray-700 rounded-full hover:bg-gray-600">
                              Episodio {episode.number}
                            </button>
                          </div>
                          <p className="text-gray-400 mt-2">{episode.title}</p>
                          {episode.airDate && (
                            <p className="text-sm text-gray-500 mt-1">{episode.airDate}</p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
import React, { useState } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import { MediaItem } from '../../types';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

interface MediaPlayerProps {
  media: MediaItem;
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ media, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  const showSeasons = media.type === 'series';

  const handlePlayEpisode = (episodeNumber: number) => {
    const episode = media.seasons?.find(s => s.number === selectedSeason)?.episodes
      .find(e => e.number === episodeNumber);
    if (episode?.videoUrl) {
      setSelectedVideoUrl(episode.videoUrl);
    }
  };

  const handlePlayMovie = () => {
    if (media.videoUrl) {
      setSelectedVideoUrl(media.videoUrl);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/90 flex items-start justify-center z-40 overflow-y-auto pt-4 sm:pt-10">
        <div className="bg-gray-900 rounded-lg max-w-5xl w-full mx-2 sm:mx-4 mb-10">
          <div className="relative h-[200px] sm:h-[300px] md:h-[400px]">
            <img
              src={media.coverUrl}
              alt={media.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-gray-900/80 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Cerrar detalles"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6 md:p-8 -mt-20 relative">
            <div className="flex flex-col gap-4">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">{media.title}</h2>
                {media.originalTitle && (
                  <div className="flex flex-wrap items-center gap-2 text-gray-400">
                    <span className="font-semibold">Título original</span>
                    <span>{media.originalTitle}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300">
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
                      <span className="font-semibold">Última emisión</span>
                      <span>{media.lastAirDate}</span>
                    </div>
                  )}
                </div>

                {media.genres && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-gray-400">Géneros</span>
                    <div className="flex flex-wrap gap-2">
                      {media.genres.map((genre, index) => (
                        <React.Fragment key={genre}>
                          <span className="text-teal-400">{genre}</span>
                          {index < media.genres!.length - 1 && <span className="text-gray-400">/</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )}

                {media.tmdbUrl && (
                  <div className="flex flex-wrap items-center gap-2 text-gray-400">
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

                {!showSeasons && (
                  <button 
                    onClick={handlePlayMovie}
                    className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 rounded-full hover:bg-red-700 flex items-center gap-2 transition-colors"
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Ver Película</span>
                  </button>
                )}
              </div>

              {showSeasons && (
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">Temporadas y episodios</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {media.seasons?.map((season) => (
                      <button
                        key={season.number}
                        onClick={() => setSelectedSeason(season.number)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-base ${
                          selectedSeason === season.number 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        } transition-colors`}
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
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          {episode.thumbnail && (
                            <img 
                              src={episode.thumbnail} 
                              alt={episode.title}
                              className="w-full sm:w-40 h-32 sm:h-24 object-cover rounded"
                            />
                          )}
                          <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <h4 className="font-semibold">
                                  EP | {episode.number}
                                </h4>
                                <p className="text-gray-400 mt-1">{episode.title}</p>
                                {episode.airDate && (
                                  <p className="text-sm text-gray-500 mt-1">{episode.airDate}</p>
                                )}
                              </div>
                              <button 
                                onClick={() => handlePlayEpisode(episode.number)}
                                className="w-full sm:w-auto px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 flex items-center justify-center gap-2 transition-colors"
                              >
                                <Play className="w-4 h-4" />
                                <span className="text-sm sm:text-base">Ver Episodio {episode.number}</span>
                              </button>
                            </div>
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

      {selectedVideoUrl && (
        <VideoPlayer 
          videoUrl={selectedVideoUrl} 
          onClose={() => setSelectedVideoUrl(null)} 
        />
      )}
    </>
  );
};

export default MediaPlayer;
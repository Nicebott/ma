import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { MediaItem } from '../types';

interface AddMediaModalProps {
  onClose: () => void;
  onSubmit: (media: MediaItem) => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'movie' | 'series'>('movie');
  const [rating, setRating] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [featured, setFeatured] = useState(false);
  const [seasons, setSeasons] = useState<{ number: number; episodes: { number: number; title: string; file: File }[] }[]>([]);
  const [currentSeason, setCurrentSeason] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !cover || !title) return;

    const newMedia: MediaItem = {
      id: Date.now(),
      title,
      description,
      type,
      rating: parseFloat(rating),
      file,
      cover,
      featured,
      seasons: type === 'series' ? seasons : undefined,
    };

    onSubmit(newMedia);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean = false) => {
    const files = e.target.files;
    if (files && files[0]) {
      if (isCover) {
        setCover(files[0]);
      } else {
        setFile(files[0]);
      }
    }
  };

  const handleAddEpisode = (seasonNumber: number, episodeFile: File) => {
    setSeasons(prev => {
      const season = prev.find(s => s.number === seasonNumber);
      if (season) {
        return prev.map(s => 
          s.number === seasonNumber 
            ? {
                ...s,
                episodes: [
                  ...s.episodes,
                  {
                    number: s.episodes.length + 1,
                    title: `Episodio ${s.episodes.length + 1}`,
                    file: episodeFile
                  }
                ]
              }
            : s
        );
      } else {
        return [
          ...prev,
          {
            number: seasonNumber,
            episodes: [{
              number: 1,
              title: 'Episodio 1',
              file: episodeFile
            }]
          }
        ];
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Agregar Contenido</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'movie' | 'series')}
              className="w-full bg-gray-700 rounded-lg p-2"
            >
              <option value="movie">Película</option>
              <option value="series">Serie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Imagen de Portada</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, true)}
              className="w-full bg-gray-700 rounded-lg p-2"
              required
            />
          </div>

          {type === 'movie' ? (
            <div>
              <label className="block text-sm font-medium mb-1">Archivo de Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileChange(e)}
                className="w-full bg-gray-700 rounded-lg p-2"
                required
              />
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-2">
                <label className="block text-sm font-medium">Temporada {currentSeason}</label>
                <button
                  type="button"
                  onClick={() => setCurrentSeason(prev => prev + 1)}
                  className="px-2 py-1 bg-gray-700 rounded-lg text-sm"
                >
                  Nueva Temporada
                </button>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    handleAddEpisode(currentSeason, files[0]);
                  }
                }}
                className="w-full bg-gray-700 rounded-lg p-2"
              />
              <div className="mt-2 text-sm text-gray-400">
                Episodios agregados: {seasons.find(s => s.number === currentSeason)?.episodes.length || 0}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="featured" className="text-sm font-medium">
              Destacado
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 rounded-lg"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMediaModal;
import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Movie } from './StreamingPlatform';

interface AddMovieModalProps {
  onClose: () => void;
  onAdd: (movie: Omit<Movie, 'id'>) => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'movie',
    rating: 5.0,
    image: '',
    category: 'recent',
    description: '',
    featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6">Agregar Nueva Película</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="movie">Película</option>
              <option value="series">Serie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Calificación</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL de la Imagen</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="recent">Recientes</option>
              <option value="popular">Popular</option>
              <option value="classics">Clásicos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 h-24"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label className="ml-2 text-sm">Destacado</label>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
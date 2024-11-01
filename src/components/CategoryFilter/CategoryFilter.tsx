import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = ['all', 'movies', 'series', 'favorites'];

  return (
    <div className="flex overflow-x-auto space-x-4 mb-8 pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selectedCategory === category ? 'bg-red-600' : 'bg-gray-700'
          }`}
        >
          {category === 'all' ? 'Todo' : 
           category === 'movies' ? 'Películas' :
           category === 'series' ? 'Series' : 'Favoritos'}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
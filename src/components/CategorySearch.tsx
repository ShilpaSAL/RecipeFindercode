
import React from 'react';
import { useParams } from 'react-router-dom';
import { recipes } from '../data/recipes';
import RecipeCard from './RecipeCard';

const CategorySearch = () => {
  const { type } = useParams<{ type: 'north-indian' | 'south-indian' }>();
  
  const filteredRecipes = recipes.filter(recipe => recipe.category === type);
  const categoryTitle = type === 'north-indian' ? 'North Indian' : 'South Indian';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {categoryTitle} Recipes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover authentic {categoryTitle.toLowerCase()} flavors with our curated collection of traditional recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} showCart={true} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No recipes found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategorySearch;

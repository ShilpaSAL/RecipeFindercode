
import React, { useState } from 'react';
import { ingredients, recipes } from '../data/recipes';
import RecipeCard from './RecipeCard';

const IngredientSearch = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState(recipes);

  const toggleIngredient = (ingredient: string) => {
    const newSelection = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient];
    
    setSelectedIngredients(newSelection);
    findMatchingRecipes(newSelection);
  };

  const findMatchingRecipes = (selectedIngs: string[]) => {
    if (selectedIngs.length === 0) {
      setSuggestedRecipes(recipes);
      return;
    }

    const matchingRecipes = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => 
        ing.toLowerCase().split(' - ')[0]
      );
      
      return selectedIngs.some(selected => 
        recipeIngredients.some(recipeIng => 
          recipeIng.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(recipeIng.toLowerCase())
        )
      );
    }).sort((a, b) => {
      // Sort by number of matching ingredients
      const aMatches = selectedIngs.filter(selected => 
        a.ingredients.some(ing => 
          ing.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ing.toLowerCase().split(' - ')[0])
        )
      ).length;
      
      const bMatches = selectedIngs.filter(selected => 
        b.ingredients.some(ing => 
          ing.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ing.toLowerCase().split(' - ')[0])
        )
      ).length;
      
      return bMatches - aMatches;
    });

    setSuggestedRecipes(matchingRecipes);
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setSuggestedRecipes(recipes);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Recipes by Ingredients
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the ingredients you have at home, and we'll suggest recipes you can make right now!
        </p>
      </div>

      {/* Ingredient Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Ingredients ({selectedIngredients.length} selected)
          </h2>
          {selectedIngredients.length > 0 && (
            <button 
              onClick={clearSelection}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ingredients.map(ingredient => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                selectedIngredients.includes(ingredient)
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
              }`}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Suggestions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recipe Suggestions ({suggestedRecipes.length} found)
        </h2>
        
        {selectedIngredients.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              <strong>Your ingredients:</strong> {selectedIngredients.join(', ')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {suggestedRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} showCart={false} />
          ))}
        </div>

        {suggestedRecipes.length === 0 && selectedIngredients.length > 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              No recipes found with your selected ingredients. Try selecting different ingredients!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientSearch;

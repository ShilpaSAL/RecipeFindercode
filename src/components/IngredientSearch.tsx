
import React, { useState } from 'react';
import { ingredients, recipes } from '../data/recipes';
import RecipeCard from './RecipeCard';

const IngredientSearch = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState<typeof recipes>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const toggleIngredient = (ingredient: string) => {
    const newSelection = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient];
    
    setSelectedIngredients(newSelection);
    // Reset search results when ingredients change
    setSuggestedRecipes([]);
    setHasSearched(false);
  };

  const findMatchingRecipes = () => {
    if (selectedIngredients.length === 0) {
      setSuggestedRecipes(recipes);
      setHasSearched(true);
      return;
    }

    const matchingRecipes = recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => 
        ing.toLowerCase().split(' - ')[0]
      );
      
      return selectedIngredients.some(selected => 
        recipeIngredients.some(recipeIng => 
          recipeIng.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(recipeIng.toLowerCase())
        )
      );
    }).sort((a, b) => {
      // Sort by number of matching ingredients
      const aMatches = selectedIngredients.filter(selected => 
        a.ingredients.some(ing => 
          ing.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ing.toLowerCase().split(' - ')[0])
        )
      ).length;
      
      const bMatches = selectedIngredients.filter(selected => 
        b.ingredients.some(ing => 
          ing.toLowerCase().includes(selected.toLowerCase()) ||
          selected.toLowerCase().includes(ing.toLowerCase().split(' - ')[0])
        )
      ).length;
      
      return bMatches - aMatches;
    });

    setSuggestedRecipes(matchingRecipes);
    setHasSearched(true);
  };

  const clearSelection = () => {
    setSelectedIngredients([]);
    setSuggestedRecipes([]);
    setHasSearched(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find Recipes by Ingredients
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select the ingredients you have at home, then click search to find recipes you can make right now!
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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
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

        {/* Search Button - Always Visible */}
        <div className="text-center">
          <button
            onClick={findMatchingRecipes}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 ${
              selectedIngredients.length === 0
                ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            🔍 Search Recipes
          </button>
          {selectedIngredients.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Click to see all recipes, or select ingredients for filtered results
            </p>
          )}
          {selectedIngredients.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {selectedIngredients.length} ingredient(s) selected - click to search
            </p>
          )}
        </div>
      </div>

      {/* Recipe Suggestions - Only shown after search */}
      {hasSearched && (
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
      )}

      {/* Initial State - No recipes shown until search */}
      {!hasSearched && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to Find Recipes?
            </h2>
            <p className="text-gray-600 mb-6">
              Select ingredients above and click the search button to discover recipes you can make with what you have!
            </p>
            <div className="text-sm text-gray-500">
              💡 Tip: You can search without selecting any ingredients to see all available recipes
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSearch;

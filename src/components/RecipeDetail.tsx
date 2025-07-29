
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUp, ShoppingCart, Save, Youtube } from 'lucide-react';
import { recipes } from '../data/recipes';
import { useCart } from '../context/CartContext';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, isInCart } = useCart();
  
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Recipe not found</h1>
        <Link to="/" className="text-orange-600 hover:text-orange-700 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(recipe);
  };

  const openYouTube = () => {
    window.open(recipe.youtubeUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to={`/category/${recipe.category}`}
            className="text-orange-600 hover:text-orange-700 flex items-center"
          >
            <ArrowUp className="mr-2 rotate-[-90deg]" size={20} />
            Back to {recipe.category === 'north-indian' ? 'North Indian' : 'South Indian'} Recipes
          </Link>
          
          <div className="flex space-x-3">
            <button 
              onClick={openYouTube}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Youtube className="mr-2" size={18} />
              Watch Video
            </button>
            
            <button 
              onClick={handleAddToCart}
              disabled={isInCart(recipe.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                isInCart(recipe.id) 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {isInCart(recipe.id) ? (
                <>
                  <Save className="mr-2" size={18} />
                  Saved
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2" size={18} />
                  Save Recipe
                </>
              )}
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{recipe.description}</p>

        <div className="flex items-center space-x-6 text-gray-600">
          <span className="flex items-center">
            ⏱️ {recipe.cookingTime}
          </span>
          <span className="flex items-center">
            📈 {recipe.difficulty}
          </span>
          <span className="flex items-center">
            🍽️ {recipe.ingredients.length} ingredients
          </span>
        </div>
      </div>

      {/* Recipe Image */}
      <div className="mb-8">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-600 mr-3 mt-1">•</span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* YouTube Video Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Cooking Video</h2>
        <p className="text-gray-600 mb-4">
          Watch a step-by-step video tutorial to master this recipe perfectly.
        </p>
        <button 
          onClick={openYouTube}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center text-lg"
        >
          <Youtube className="mr-3" size={24} />
          Watch on YouTube
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;

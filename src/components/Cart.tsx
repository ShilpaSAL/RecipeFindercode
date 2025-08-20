
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import RecipeCard from './RecipeCard';

const Favorites = () => {
  const { cartItems, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link 
            to="/"
            className="text-orange-600 hover:text-orange-700 flex items-center mb-4"
          >
            <ArrowUp className="mr-2 rotate-[-90deg]" size={20} />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">
            My Favorite Recipes ({cartItems.length})
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Your collection of favorite recipes for quick access.
          </p>
        </div>
        
        {cartItems.length > 0 && (
          <button 
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Favorites
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="text-4xl text-gray-400" size={48} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">No favorite recipes yet</h2>
          <p className="text-gray-500 mb-8">
            Start exploring recipes and heart your favorites to access them quickly later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/category/north-indian"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Browse North Indian Recipes
            </Link>
            <Link 
              to="/category/south-indian"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Browse South Indian Recipes
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} showCart={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
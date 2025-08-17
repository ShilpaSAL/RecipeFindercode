
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Recipe } from '../context/CartContext';
import { useCart } from '../context/CartContext';

interface RecipeCardProps {
  recipe: Recipe;
  showCart?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, showCart = false }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCart(recipe.id)) {
      removeFromCart(recipe.id);
    } else {
      addToCart(recipe);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>⏱️ {recipe.cookingTime}</span>
          <span>🍽️ {recipe.ingredients.length} ingredients</span>
        </div>

        <div className="flex items-center justify-between">
          <Link 
            to={`/recipe/${recipe.id}`}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            View Recipe
          </Link>
          
          {showCart && (
            <button 
              onClick={handleToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isInCart(recipe.id) 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
              }`}
              title={isInCart(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                size={20} 
                className={isInCart(recipe.id) ? 'fill-current' : ''}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

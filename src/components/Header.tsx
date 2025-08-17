
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            🍛  Recipe Finder
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                location.pathname === '/' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/category/north-indian" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                location.pathname.includes('/category/north-indian') ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              North Indian
            </Link>
            <Link 
              to="/category/south-indian" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                location.pathname.includes('/category/south-indian') ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              South Indian
            </Link>
            <Link 
              to="/ingredient-search" 
              className={`text-gray-700 hover:text-orange-600 transition-colors ${
                location.pathname === '/ingredient-search' ? 'text-orange-600 font-semibold' : ''
              }`}
            >
              Ingredient Search
            </Link>
          </nav>

          <Link 
            to="/favorites" 
            className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            <Heart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

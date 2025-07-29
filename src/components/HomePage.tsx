
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Discover Your Next
            <span className="text-orange-600"> Favorite Recipe</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Find authentic Indian recipes by category or discover what you can cook with ingredients you already have at home.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <Link 
              to="/category/north-indian"
              className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Browse by Category
              <ArrowDown className="inline ml-2 group-hover:translate-y-1 transition-transform" size={20} />
            </Link>
            
            <Link 
              to="/ingredient-search"
              className="group bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Find by Ingredients
              <ArrowDown className="inline ml-2 group-hover:translate-y-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Category Search */}
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🍛</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Category Search</h3>
              <p className="text-gray-600 mb-6">
                Explore authentic North Indian and South Indian recipes. Browse through our curated collection, 
                save your favorites to your cart, and watch step-by-step cooking videos.
              </p>
              <Link 
                to="/category/north-indian" 
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Start Browsing
              </Link>
            </div>

            {/* Ingredient Search */}
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🥬</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ingredient Matching</h3>
              <p className="text-gray-600 mb-6">
                Select the ingredients you have at home, and we'll suggest delicious recipes you can make right now. 
                Perfect for using up what's in your pantry!
              </p>
              <Link 
                to="/ingredient-search" 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Find Recipes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

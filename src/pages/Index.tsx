
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import CategorySearch from '../components/CategorySearch';
import IngredientSearch from '../components/IngredientSearch';
import RecipeDetail from '../components/RecipeDetail';
import Favorites from '../components/Cart';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { CartProvider } from '../context/CartContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:type" element={<CategorySearch />} />
          <Route path="/ingredient-search" element={<IngredientSearch />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import CategorySearch from '../components/CategorySearch';
import IngredientSearch from '../components/IngredientSearch';
import RecipeDetail from '../components/RecipeDetail';
import Cart from '../components/Cart';
import Login from '../components/Login';
import { CartProvider } from '../context/CartContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
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
          <Route path="/cart" element={<Cart />} />
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

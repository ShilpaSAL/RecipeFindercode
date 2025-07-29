
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Recipe {
  id: string;
  name: string;
  category: 'north-indian' | 'south-indian';
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  youtubeUrl: string;
  image: string;
  description: string;
}

interface CartContextType {
  cartItems: Recipe[];
  addToCart: (recipe: Recipe) => void;
  removeFromCart: (recipeId: string) => void;
  clearCart: () => void;
  isInCart: (recipeId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Recipe[]>([]);

  const addToCart = (recipe: Recipe) => {
    setCartItems(prev => {
      if (prev.find(item => item.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const removeFromCart = (recipeId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== recipeId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (recipeId: string) => {
    return cartItems.some(item => item.id === recipeId);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

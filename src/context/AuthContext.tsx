
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Password validation function for signup
const validatePassword = (password: string): boolean => {
  const minLength = password.length >= 6;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return minLength && hasSpecialChar && hasCapitalLetter && hasNumber;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation - in real app, this would be API call
    if (email && password && email.includes('@gmail.com')) {
      const userData = { email };
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    // Validate email format
    if (!email || !email.includes('@gmail.com')) {
      return false;
    }
    
    // Validate password requirements
    if (!validatePassword(password)) {
      return false;
    }
    
    // In a real app, this would create a new user account
    const userData = { email };
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

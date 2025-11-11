import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    if (authAPI.isAuthenticated()) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  async function loadUser() {
    try {
      const userData = await authAPI.getCurrentUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('Failed to load user:', err);
      setUser(null);
      // Don't set error here, just silently fail
    } finally {
      setLoading(false);
    }
  }

  async function register(email, password, fullName) {
    setLoading(true);
    setError(null);
    try {
      await authAPI.register(email, password, fullName);
      await loadUser();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    setLoading(true);
    setError(null);
    try {
      await authAPI.login(email, password);
      await loadUser();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * API service for backend communication
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Make an API request with automatic token handling
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('access_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token && !options.skipAuth) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && !options.skipRefresh) {
    // Try to refresh token
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      // Retry the request with new token
      return apiRequest(endpoint, { ...options, skipRefresh: true });
    } else {
      // Refresh failed, redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

/**
 * Refresh access token using refresh token
 */
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return true;
  } catch (error) {
    return false;
  }
}

// Authentication API calls
export const authAPI = {
  async register(email, password, fullName) {
    const data = await apiRequest('/api/v1/auth/register', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    });

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  },

  async login(email, password) {
    const data = await apiRequest('/api/v1/auth/login', {
      method: 'POST',
      skipAuth: true,
      body: JSON.stringify({ email, password }),
    });

    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return data;
  },

  async logout() {
    try {
      await apiRequest('/api/v1/auth/logout', {
        method: 'POST',
      });
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async getCurrentUser() {
    return apiRequest('/api/v1/auth/me');
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};

// Progress API (for future use)
export const progressAPI = {
  async updateProgress(xpGained, mistakes = []) {
    return apiRequest('/api/v1/progress', {
      method: 'POST',
      body: JSON.stringify({ xp_gained: xpGained, mistakes }),
    });
  },

  async getProgress() {
    return apiRequest('/api/v1/progress');
  },
};

export { apiRequest };

// Content API (R2-based)
export const contentAPI = {
  async getVocabulary() {
    return apiRequest('/api/v1/content/vocabulary');
  },

  async getVocabularyCategory(category) {
    return apiRequest(`/api/v1/content/vocabulary/${category}`);
  },

  async getGrammar() {
    return apiRequest('/api/v1/content/grammar');
  },

  async getGrammarLesson(lesson) {
    return apiRequest(`/api/v1/content/grammar/${lesson}`);
  },

  async getUserProgress() {
    return apiRequest('/api/v1/content/progress');
  },

  async updateUserProgress(progressData) {
    return apiRequest('/api/v1/content/progress', {
      method: 'POST',
      body: JSON.stringify(progressData),
    });
  },

  async getAudioUrl(word) {
    return apiRequest(`/api/v1/content/audio/${word}`);
  },
};

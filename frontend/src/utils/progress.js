// Progress tracking utilities with backend sync
import { contentAPI } from '../services/api';

const STORAGE_KEY = 'dutchLearningStats';
const MISTAKE_KEY = 'dutchLearningMistakes';
const LAST_STUDY_KEY = 'dutchLastStudyDate';
const SYNC_PENDING_KEY = 'dutchSyncPending';

// Check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

// Sync progress to backend
const syncToBackend = async (stats) => {
  if (!isAuthenticated()) return;

  try {
    await contentAPI.updateUserProgress(stats);
    localStorage.removeItem(SYNC_PENDING_KEY);
  } catch (error) {
    console.error('Error syncing progress to backend:', error);
    // Mark as pending sync for later
    localStorage.setItem(SYNC_PENDING_KEY, 'true');
  }
};

// Get progress from backend or local storage
export const getProgress = async () => {
  // Try to get from backend if authenticated
  if (isAuthenticated()) {
    try {
      const data = await contentAPI.getUserProgress();

      // If backend returns presigned URL, fetch from there
      if (data.presigned_url) {
        const response = await fetch(data.presigned_url);
        if (response.ok) {
          const backendProgress = await response.json();
          // Save to local storage as cache
          localStorage.setItem(STORAGE_KEY, JSON.stringify(backendProgress));
          return backendProgress;
        }
      } else if (data.level !== undefined) {
        // Backend returned progress directly
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return data;
      }
    } catch (error) {
      console.error('Error loading progress from backend:', error);
      // Fall through to local storage
    }
  }

  // Fallback to local storage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading progress from local storage:', error);
  }

  return {
    wordsLearned: 0,
    lessonsCompleted: 0,
    quizzesTaken: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    studyStreak: 0,
    totalXP: 0,
    level: 1,
    categoriesCompleted: [],
    achievements: [],
    mistakes: []
  };
};

export const saveProgress = (stats) => {
  try {
    // Save to local storage immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));

    // Sync to backend asynchronously
    syncToBackend(stats);
  } catch (error) {
    console.error('Error saving progress:', error);
  }
};

export const updateQuizProgress = (questionsCount, correctCount, category) => {
  const stats = getProgress();

  stats.quizzesTaken += 1;
  stats.totalQuestions += questionsCount;
  stats.correctAnswers += correctCount;
  stats.accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
  stats.totalXP += correctCount * 10;

  // Update level based on XP (every 100 XP = 1 level)
  stats.level = Math.floor(stats.totalXP / 100) + 1;

  // Track category completion
  if (correctCount / questionsCount >= 0.8 && !stats.categoriesCompleted.includes(category)) {
    stats.categoriesCompleted.push(category);
  }

  // Update streak
  updateStreak();

  saveProgress(stats);
  return stats;
};

export const updateWordsLearned = (count) => {
  const stats = getProgress();
  stats.wordsLearned += count;
  stats.totalXP += count * 5;
  stats.level = Math.floor(stats.totalXP / 100) + 1;
  saveProgress(stats);
  return stats;
};

export const updateLessonCompleted = () => {
  const stats = getProgress();
  stats.lessonsCompleted += 1;
  stats.totalXP += 20;
  stats.level = Math.floor(stats.totalXP / 100) + 1;
  saveProgress(stats);
  return stats;
};

export const updateStreak = () => {
  const stats = getProgress();
  const today = new Date().toDateString();
  const lastStudy = localStorage.getItem(LAST_STUDY_KEY);

  if (lastStudy) {
    const lastDate = new Date(lastStudy);
    const todayDate = new Date(today);
    const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, no change
      return stats.studyStreak;
    } else if (diffDays === 1) {
      // Consecutive day
      stats.studyStreak += 1;
    } else {
      // Streak broken
      stats.studyStreak = 1;
    }
  } else {
    stats.studyStreak = 1;
  }

  localStorage.setItem(LAST_STUDY_KEY, today);
  saveProgress(stats);
  return stats.studyStreak;
};

export const resetProgress = () => {
  const emptyStats = {
    wordsLearned: 0,
    lessonsCompleted: 0,
    quizzesTaken: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    studyStreak: 0,
    totalXP: 0,
    level: 1,
    categoriesCompleted: [],
    achievements: [],
    mistakes: []
  };
  saveProgress(emptyStats);
  localStorage.removeItem(LAST_STUDY_KEY);
  return emptyStats;
};

// Mistake tracking
export const getMistakes = () => {
  try {
    const saved = localStorage.getItem(MISTAKE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading mistakes:', error);
  }
  return [];
};

export const addMistake = (word, category, userAnswer, correctAnswer) => {
  const mistakes = getMistakes();
  const stats = getProgress();

  const mistake = {
    word,
    category,
    userAnswer,
    correctAnswer,
    timestamp: new Date().toISOString(),
    reviewed: false
  };

  mistakes.unshift(mistake);

  // Keep only last 100 mistakes
  if (mistakes.length > 100) {
    mistakes.pop();
  }

  localStorage.setItem(MISTAKE_KEY, JSON.stringify(mistakes));

  // Also update in progress stats
  stats.mistakes = mistakes;
  saveProgress(stats);

  return mistakes;
};

export const markMistakeReviewed = (index) => {
  const mistakes = getMistakes();
  if (mistakes[index]) {
    mistakes[index].reviewed = true;
    localStorage.setItem(MISTAKE_KEY, JSON.stringify(mistakes));

    // Update in progress stats
    const stats = getProgress();
    stats.mistakes = mistakes;
    saveProgress(stats);
  }
  return mistakes;
};

export const clearMistakes = () => {
  localStorage.setItem(MISTAKE_KEY, JSON.stringify([]));
  const stats = getProgress();
  stats.mistakes = [];
  saveProgress(stats);
  return [];
};

// Retry pending sync
export const retryPendingSync = async () => {
  if (localStorage.getItem(SYNC_PENDING_KEY) && isAuthenticated()) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const stats = JSON.parse(saved);
        await syncToBackend(stats);
      }
    } catch (error) {
      console.error('Error retrying sync:', error);
    }
  }
};

// Progress tracking utilities
const STORAGE_KEY = 'dutchLearningStats';
const MISTAKE_KEY = 'dutchLearningMistakes';
const LAST_STUDY_KEY = 'dutchLastStudyDate';

export const getProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
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
    achievements: []
  };
};

export const saveProgress = (stats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
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
    achievements: []
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
  return mistakes;
};

export const markMistakeReviewed = (index) => {
  const mistakes = getMistakes();
  if (mistakes[index]) {
    mistakes[index].reviewed = true;
    localStorage.setItem(MISTAKE_KEY, JSON.stringify(mistakes));
  }
  return mistakes;
};

export const clearMistakes = () => {
  localStorage.setItem(MISTAKE_KEY, JSON.stringify([]));
  return [];
};

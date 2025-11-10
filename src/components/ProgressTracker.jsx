import { useState, useEffect } from 'react';

export default function ProgressTracker({ onBack }) {
  const [stats, setStats] = useState({
    wordsLearned: 0,
    lessonsCompleted: 0,
    quizzesTaken: 0,
    accuracy: 0,
    studyStreak: 0
  });

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('dutchLearningStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const emptyStats = {
        wordsLearned: 0,
        lessonsCompleted: 0,
        quizzesTaken: 0,
        accuracy: 0,
        studyStreak: 0
      };
      setStats(emptyStats);
      localStorage.setItem('dutchLearningStats', JSON.stringify(emptyStats));
    }
  };

  return (
    <div>
      <button onClick={onBack} className="back-button secondary">
        ← Back to Main Menu
      </button>

      <div className="card">
        <h2>Your Progress</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>
          Track your Dutch learning journey
        </p>

        <div className="stats">
          <div className="stat-card">
            <div className="number">{stats.wordsLearned}</div>
            <div className="label">Words Learned</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.lessonsCompleted}</div>
            <div className="label">Lessons Completed</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.quizzesTaken}</div>
            <div className="label">Quizzes Taken</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.accuracy}%</div>
            <div className="label">Average Accuracy</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.studyStreak}</div>
            <div className="label">Day Streak</div>
          </div>
        </div>

        <div style={{ marginTop: '32px', padding: '24px', background: '#f7fafc', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '16px' }}>Learning Tips</h3>
          <ul style={{ lineHeight: '1.8', color: '#4a5568' }}>
            <li>Practice every day to maintain your streak</li>
            <li>Focus on one category at a time</li>
            <li>Review flashcards before taking quizzes</li>
            <li>Try to use new words in sentences</li>
            <li>Don't worry about mistakes - they're part of learning!</li>
          </ul>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button onClick={resetProgress} className="danger">
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

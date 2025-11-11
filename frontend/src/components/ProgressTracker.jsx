import { useState, useEffect } from 'react';
import { getProgress, resetProgress as resetProgressUtil, getMistakes } from '../utils/progress';

export default function ProgressTracker({ onBack }) {
  const [stats, setStats] = useState(getProgress());
  const [mistakes, setMistakes] = useState([]);

  useEffect(() => {
    setStats(getProgress());
    setMistakes(getMistakes());
  }, []);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const emptyStats = resetProgressUtil();
      setStats(emptyStats);
      setMistakes([]);
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
            <div className="number">{stats.level}</div>
            <div className="label">Level</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.totalXP}</div>
            <div className="label">Total XP</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.studyStreak}🔥</div>
            <div className="label">Day Streak</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.quizzesTaken}</div>
            <div className="label">Quizzes Taken</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.accuracy}%</div>
            <div className="label">Accuracy</div>
          </div>

          <div className="stat-card">
            <div className="number">{stats.categoriesCompleted.length}</div>
            <div className="label">Categories Mastered</div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <div className="progress-bar" style={{ height: '32px' }}>
            <div
              className="progress-fill"
              style={{ width: `${((stats.totalXP % 100) / 100) * 100}%` }}
            >
              {stats.totalXP % 100}/100 XP to Level {stats.level + 1}
            </div>
          </div>
        </div>

        {mistakes.length > 0 && (
          <div style={{ marginTop: '32px', padding: '24px', background: '#fff3cd', borderRadius: '12px', border: '2px solid #ffc107' }}>
            <h3 style={{ marginBottom: '16px', color: '#856404' }}>Recent Mistakes (Review These!)</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {mistakes.slice(0, 10).map((mistake, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px',
                    background: 'white',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    borderLeft: '4px solid #dc3545'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{mistake.word}</div>
                  <div style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '4px' }}>
                    You answered: {mistake.userAnswer}
                  </div>
                  <div style={{ color: '#28a745', fontSize: '0.9rem' }}>
                    Correct answer: {mistake.correctAnswer}
                  </div>
                  <div style={{ color: '#718096', fontSize: '0.8rem', marginTop: '4px' }}>
                    {mistake.category} • {new Date(mistake.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
          <button onClick={handleReset} className="danger">
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

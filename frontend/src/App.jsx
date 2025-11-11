import { useState, useEffect } from 'react';
import { allVocabulary as vocabulary, getRandomWords } from './data/vocabulary';
import CategoryView from './components/CategoryView';
import GrammarView from './components/GrammarView';
import ProgressTracker from './components/ProgressTracker';
import ConversationPartner from './components/ConversationPartner';
import Quiz from './components/Quiz';
import { getProgress } from './utils/progress';
import { initAudio } from './utils/audio';

function App() {
  const [view, setView] = useState('home'); // home, category, grammar, progress, conversation, quickquiz
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [stats, setStats] = useState(getProgress());

  useEffect(() => {
    initAudio();
    setStats(getProgress());
  }, [view]); // Refresh stats when view changes

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(vocabulary[categoryKey]);
    setView('category');
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedCategory(null);
  };

  // Category view
  if (view === 'category' && selectedCategory) {
    return (
      <div className="container">
        <h1>MyDutch 🇳🇱</h1>
        <CategoryView category={selectedCategory} onBack={handleBackToHome} />
      </div>
    );
  }

  // Grammar view
  if (view === 'grammar') {
    return (
      <div className="container">
        <h1>MyDutch 🇳🇱</h1>
        <GrammarView onBack={handleBackToHome} />
      </div>
    );
  }

  // Progress view
  if (view === 'progress') {
    return (
      <div className="container">
        <h1>MyDutch 🇳🇱</h1>
        <ProgressTracker onBack={handleBackToHome} />
      </div>
    );
  }

  // Conversation partner view
  if (view === 'conversation') {
    return (
      <div className="container">
        <h1>MyDutch 🇳🇱</h1>
        <ConversationPartner onBack={handleBackToHome} />
      </div>
    );
  }

  // Quick quiz view
  if (view === 'quickquiz') {
    const randomWords = getRandomWords(10);
    return (
      <div className="container">
        <h1>MyDutch 🇳🇱</h1>
        <button onClick={handleBackToHome} className="back-button secondary">
          ← Back to Main Menu
        </button>
        <Quiz words={randomWords} onComplete={handleBackToHome} category="Quick Quiz" />
      </div>
    );
  }

  // Home view
  return (
    <div className="container">
      <h1>MyDutch 🇳🇱</h1>

      <div className="card" style={{ textAlign: 'center', marginBottom: '32px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h2 style={{ color: 'white' }}>Welkom bij MyDutch! 🇳🇱</h2>
        <p style={{ fontSize: '1.2rem', marginTop: '12px', opacity: 0.95 }}>
          A2 Inburgering Preparation
        </p>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Level {stats.level}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Your Level</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.studyStreak}🔥</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Day Streak</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalXP}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>Total XP</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="nav">
        <button onClick={() => setView('quickquiz')} style={{ background: '#28a745' }}>
          ⚡ Quick Quiz
        </button>
        <button onClick={() => setView('conversation')}>
          💬 Chat Partner
        </button>
        <button onClick={() => setView('grammar')}>
          📖 Grammar
        </button>
        <button onClick={() => setView('progress')} className="secondary">
          📊 Progress
        </button>
      </div>

      {/* Stats Overview */}
      <div className="stats">
        <div className="stat-card">
          <div className="number">{Object.keys(vocabulary).length}</div>
          <div className="label">Categories</div>
        </div>
        <div className="stat-card">
          <div className="number">
            {Object.values(vocabulary).reduce((sum, cat) => sum + cat.words.length, 0)}
          </div>
          <div className="label">Total Words</div>
        </div>
        <div className="stat-card">
          <div className="number">8</div>
          <div className="label">Grammar Lessons</div>
        </div>
      </div>

      {/* Categories Grid */}
      <h2 style={{ color: 'white', marginTop: '32px', marginBottom: '20px' }}>
        Choose a Category
      </h2>

      <div className="grid">
        {Object.entries(vocabulary).map(([key, category]) => (
          <div
            key={key}
            className="category-card"
            onClick={() => handleCategorySelect(key)}
          >
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <div style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.8 }}>
              {category.words.length} words
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="card" style={{ marginTop: '48px', textAlign: 'center', background: 'rgba(255,255,255,0.95)' }}>
        <h3>How to Use MyDutch</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px', textAlign: 'left' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📇</div>
            <strong>Flashcards</strong>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '4px' }}>
              Study words with interactive flashcards
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✏️</div>
            <strong>Quizzes</strong>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '4px' }}>
              Test your knowledge with fun quizzes
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📖</div>
            <strong>Grammar</strong>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '4px' }}>
              Learn essential grammar rules
            </p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📊</div>
            <strong>Track Progress</strong>
            <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '4px' }}>
              Monitor your learning journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

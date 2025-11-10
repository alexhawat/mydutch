import { useState } from 'react';
import Flashcard from './Flashcard';
import Quiz from './Quiz';

export default function CategoryView({ category, onBack }) {
  const [mode, setMode] = useState('menu'); // menu, flashcards, quiz, vocabulary
  const [currentCard, setCurrentCard] = useState(0);

  const handleNext = () => {
    if (currentCard < category.words.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleBackToMenu = () => {
    setMode('menu');
    setCurrentCard(0);
  };

  if (mode === 'flashcards') {
    return (
      <div>
        <button onClick={handleBackToMenu} className="back-button secondary">
          ← Back to {category.title}
        </button>
        <Flashcard
          word={category.words[currentCard]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentIndex={currentCard}
          total={category.words.length}
        />
      </div>
    );
  }

  if (mode === 'quiz') {
    return (
      <div>
        <button onClick={handleBackToMenu} className="back-button secondary">
          ← Back to {category.title}
        </button>
        <Quiz words={category.words} onComplete={handleBackToMenu} />
      </div>
    );
  }

  if (mode === 'vocabulary') {
    return (
      <div>
        <button onClick={handleBackToMenu} className="back-button secondary">
          ← Back to {category.title}
        </button>
        <div className="card">
          <h2>{category.title} - All Words</h2>
          <div style={{ marginTop: '24px' }}>
            {category.words.map((word, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2d3748' }}>
                    {word.dutch}
                  </div>
                  {word.pronunciation && (
                    <div style={{ color: '#718096', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      [{word.pronunciation}]
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', color: '#667eea' }}>
                    {word.english}
                  </div>
                  {word.example && (
                    <div style={{ color: '#718096', fontSize: '0.9rem', marginTop: '4px', fontStyle: 'italic' }}>
                      "{word.example}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="back-button secondary">
        ← Back to Categories
      </button>

      <div className="card">
        <h2>{category.title}</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>{category.description}</p>

        <div className="stat-card">
          <div className="number">{category.words.length}</div>
          <div className="label">Words in this category</div>
        </div>

        <div style={{ display: 'grid', gap: '12px', marginTop: '32px' }}>
          <button onClick={() => setMode('flashcards')}>
            📇 Study with Flashcards
          </button>
          <button onClick={() => setMode('quiz')} className="success">
            ✏️ Take a Quiz
          </button>
          <button onClick={() => setMode('vocabulary')} className="secondary">
            📚 View All Words
          </button>
        </div>
      </div>
    </div>
  );
}

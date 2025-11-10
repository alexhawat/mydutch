import { useState } from 'react';

export default function Flashcard({ word, onNext, onPrevious, currentIndex, total }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handleNext = () => {
    setFlipped(false);
    onNext();
  };

  const handlePrevious = () => {
    setFlipped(false);
    onPrevious();
  };

  return (
    <div className="card">
      <div className="flashcard" onClick={handleFlip}>
        {!flipped ? (
          <div className="flashcard-content">
            <div className="word">{word.dutch}</div>
            <p style={{ color: '#718096', marginTop: '16px' }}>Click to reveal</p>
          </div>
        ) : (
          <div className="flashcard-content">
            <div className="translation">{word.english}</div>
            {word.pronunciation && (
              <div className="pronunciation">[{word.pronunciation}]</div>
            )}
            {word.example && (
              <p style={{ marginTop: '24px', fontSize: '1.1rem', fontStyle: 'italic', color: '#4a5568' }}>
                "{word.example}"
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', color: '#718096' }}>
        Card {currentIndex + 1} of {total}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'center' }}>
        <button onClick={handlePrevious} disabled={currentIndex === 0} className="secondary">
          ← Previous
        </button>
        <button onClick={handleNext} disabled={currentIndex === total - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

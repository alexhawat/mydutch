import { useState } from 'react';
import { speak } from '../utils/audio';

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

  const playAudio = (text, e) => {
    e.stopPropagation();
    speak(text);
  };

  return (
    <div className="card">
      <div className="flashcard" onClick={handleFlip}>
        {!flipped ? (
          <div className="flashcard-content">
            <div className="word">{word.dutch}</div>
            <button
              onClick={(e) => playAudio(word.dutch, e)}
              className="audio-button"
              style={{ marginTop: '16px', fontSize: '2rem', background: 'transparent', padding: '8px' }}
              title="Play audio"
            >
              🔊
            </button>
            <p style={{ color: '#718096', marginTop: '16px' }}>Click to reveal</p>
          </div>
        ) : (
          <div className="flashcard-content">
            <div className="translation">{word.english}</div>
            {word.pronunciation && (
              <div className="pronunciation">[{word.pronunciation}]</div>
            )}
            {word.example && (
              <div style={{ marginTop: '24px' }}>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#4a5568' }}>
                  "{word.example}"
                </p>
                <button
                  onClick={(e) => playAudio(word.example, e)}
                  className="audio-button"
                  style={{ marginTop: '12px', fontSize: '1.5rem', background: 'transparent', padding: '4px' }}
                  title="Play example"
                >
                  🔊
                </button>
              </div>
            )}
            <button
              onClick={(e) => playAudio(word.dutch, e)}
              className="audio-button"
              style={{ marginTop: '16px', fontSize: '1.5rem', background: 'transparent', padding: '8px' }}
              title="Play word"
            >
              🔊 Play again
            </button>
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

import { useState, useEffect } from 'react';
import { speak } from '../utils/audio';
import { updateQuizProgress, addMistake } from '../utils/progress';

export default function ListeningQuiz({ words, onComplete, category = 'General' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizWords, setQuizWords] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);

  useEffect(() => {
    const quiz = words.slice(0, 10).map(word => {
      const wrongAnswers = words
        .filter(w => w.dutch !== word.dutch)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.dutch);

      const options = [...wrongAnswers, word.dutch].sort(() => Math.random() - 0.5);

      return {
        ...word,
        options,
        correctAnswer: word.dutch
      };
    });

    setQuizWords(quiz);
  }, [words]);

  useEffect(() => {
    // Auto-play audio when question loads
    if (quizWords.length > 0 && !hasPlayedAudio) {
      setTimeout(() => {
        playAudio();
        setHasPlayedAudio(true);
      }, 500);
    }
  }, [currentQuestion, quizWords]);

  const playAudio = () => {
    if (quizWords[currentQuestion]) {
      speak(quizWords[currentQuestion].dutch);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const currentWord = quizWords[currentQuestion];
    const isCorrect = answer === currentWord.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      addMistake(currentWord.dutch, category, answer, currentWord.correctAnswer);
    }

    setTimeout(() => {
      if (currentQuestion < quizWords.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setHasPlayedAudio(false);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        updateQuizProgress(quizWords.length, finalScore, category);
        setXpEarned(finalScore * 15); // More XP for listening
        setShowResult(true);
      }
    }, 1500);
  };

  if (quizWords.length === 0) {
    return <div className="card">Loading quiz...</div>;
  }

  if (showResult) {
    const percentage = Math.round((score / quizWords.length) * 100);
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Listening Quiz Complete! 🎧</h2>
        <div style={{ fontSize: '4rem', margin: '24px 0' }}>
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', margin: '24px 0' }}>
          <div className="stat-card">
            <div className="number">{score}/{quizWords.length}</div>
            <div className="label">Correct Answers</div>
          </div>
          <div className="stat-card">
            <div className="number">+{xpEarned}</div>
            <div className="label">XP Earned</div>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}>
            {percentage}%
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <p style={{ color: '#667eea', marginBottom: '16px' }}>
            Great work on your listening skills! 👂
          </p>
        </div>

        <button onClick={onComplete} style={{ marginTop: '24px' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const question = quizWords[currentQuestion];

  return (
    <div className="card">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#718096', marginBottom: '8px' }}>
          Question {currentQuestion + 1} of {quizWords.length}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentQuestion / quizWords.length) * 100}%` }}
          />
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '48px',
        borderRadius: '16px',
        textAlign: 'center',
        marginBottom: '32px',
        color: 'white'
      }}>
        <h3 style={{ color: 'white', marginBottom: '24px' }}>🎧 Listen and Choose</h3>
        <button
          onClick={playAudio}
          style={{
            fontSize: '4rem',
            background: 'rgba(255,255,255,0.2)',
            padding: '24px',
            borderRadius: '50%',
            border: '4px solid white',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Play audio"
        >
          🔊
        </button>
        <p style={{ marginTop: '16px', fontSize: '1.1rem', opacity: 0.9 }}>
          Click to play audio
        </p>
      </div>

      <p style={{ textAlign: 'center', color: '#667eea', marginBottom: '24px', fontWeight: '600', fontSize: '1.1rem' }}>
        What did you hear?
      </p>

      <div style={{ display: 'grid', gap: '12px' }}>
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`quiz-option ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
            }`}
            onClick={() => !selectedAnswer && handleAnswer(option)}
            style={{
              cursor: selectedAnswer ? 'default' : 'pointer',
              fontSize: '1.3rem',
              fontWeight: '500',
              textAlign: 'center',
              padding: '20px'
            }}
          >
            {option}
            {selectedAnswer === option && option === question.correctAnswer && ' ✓'}
            {selectedAnswer === option && option !== question.correctAnswer && ' ✗'}
          </div>
        ))}
      </div>

      {selectedAnswer && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: selectedAnswer === question.correctAnswer ? '#d4edda' : '#f8d7da',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            English: {question.english}
          </p>
          {question.example && (
            <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#4a5568' }}>
              Example: "{question.example}"
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: '24px', textAlign: 'center', color: '#667eea', fontWeight: '600' }}>
        Score: {score}/{currentQuestion + (selectedAnswer ? 1 : 0)}
      </div>
    </div>
  );
}

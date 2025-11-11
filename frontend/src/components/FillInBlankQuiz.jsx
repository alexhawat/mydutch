import { useState, useEffect } from 'react';
import { speak } from '../utils/audio';
import { updateQuizProgress, addMistake } from '../utils/progress';

export default function FillInBlankQuiz({ words, onComplete, category = 'General' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    // Create fill-in-the-blank questions from examples
    const questions = words
      .filter(w => w.example && w.example.includes(w.dutch))
      .slice(0, 10)
      .map(word => {
        // Create sentence with blank
        const sentence = word.example.replace(word.dutch, '____');

        // Get wrong options (other Dutch words)
        const wrongOptions = words
          .filter(w => w.dutch !== word.dutch && w.english !== word.english)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.dutch);

        const options = [...wrongOptions, word.dutch].sort(() => Math.random() - 0.5);

        return {
          sentence,
          correctAnswer: word.dutch,
          englishTranslation: word.example,
          options,
          hint: word.english
        };
      });

    setQuizQuestions(questions);
  }, [words]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizQuestions[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    } else {
      addMistake(
        quizQuestions[currentQuestion].sentence,
        category,
        answer,
        quizQuestions[currentQuestion].correctAnswer
      );
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = score + (isCorrect ? 1 : 0);
        updateQuizProgress(quizQuestions.length, finalScore, category);
        setXpEarned(finalScore * 10);
        setShowResult(true);
      }
    }, 1500);
  };

  const playAudio = () => {
    const completeSentence = quizQuestions[currentQuestion].englishTranslation;
    speak(completeSentence);
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="card">
        <p>Loading quiz...</p>
        <p style={{ color: '#718096', marginTop: '8px', fontSize: '0.9rem' }}>
          Note: This quiz requires words with example sentences.
        </p>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h2>Quiz Complete! 🎯</h2>
        <div style={{ fontSize: '4rem', margin: '24px 0' }}>
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', margin: '24px 0' }}>
          <div className="stat-card">
            <div className="number">{score}/{quizQuestions.length}</div>
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

        <button onClick={onComplete} style={{ marginTop: '24px' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="card">
      <div style={{ marginBottom: '24px' }}>
        <div style={{ color: '#718096', marginBottom: '8px' }}>
          Question {currentQuestion + 1} of {quizQuestions.length}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(currentQuestion / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 style={{ color: '#667eea', marginBottom: '16px' }}>Fill in the blank:</h3>

      <div style={{
        background: '#f7fafc',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        border: '2px solid #e2e8f0'
      }}>
        <p style={{ fontSize: '1.4rem', lineHeight: '1.8', color: '#2d3748', textAlign: 'center' }}>
          {question.sentence.split('____').map((part, index) => (
            <span key={index}>
              {part}
              {index < question.sentence.split('____').length - 1 && (
                <span style={{
                  display: 'inline-block',
                  minWidth: '120px',
                  borderBottom: '3px solid #667eea',
                  margin: '0 8px',
                  textAlign: 'center'
                }}>
                  {selectedAnswer ? (
                    <span style={{
                      color: selectedAnswer === question.correctAnswer ? '#28a745' : '#dc3545',
                      fontWeight: 'bold'
                    }}>
                      {selectedAnswer}
                    </span>
                  ) : '____'}
                </span>
              )}
            </span>
          ))}
        </p>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <button
            onClick={playAudio}
            style={{ fontSize: '1.5rem', background: 'transparent', padding: '8px' }}
            title="Play complete sentence"
          >
            🔊
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '8px', fontSize: '0.9rem' }}>
        Hint: {question.hint}
      </p>

      <p style={{ textAlign: 'center', color: '#667eea', marginBottom: '24px', fontWeight: '600' }}>
        Choose the correct word:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
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
              fontSize: '1.1rem',
              fontWeight: '500',
              textAlign: 'center'
            }}
          >
            {option}
            {selectedAnswer === option && option === question.correctAnswer && ' ✓'}
            {selectedAnswer === option && option !== question.correctAnswer && ' ✗'}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', color: '#667eea', fontWeight: '600' }}>
        Score: {score}/{currentQuestion + (selectedAnswer ? 1 : 0)}
      </div>
    </div>
  );
}

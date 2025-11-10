import { useState, useEffect } from 'react';

export default function Quiz({ words, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizWords, setQuizWords] = useState([]);

  useEffect(() => {
    // Prepare quiz questions
    const quiz = words.slice(0, 10).map(word => {
      // Get 3 random wrong answers
      const wrongAnswers = words
        .filter(w => w.english !== word.english)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.english);

      // Combine with correct answer and shuffle
      const options = [...wrongAnswers, word.english].sort(() => Math.random() - 0.5);

      return {
        ...word,
        options,
        correctAnswer: word.english
      };
    });

    setQuizWords(quiz);
  }, [words]);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === quizWords[currentQuestion].correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizWords.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
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
        <h2>Quiz Complete!</h2>
        <div style={{ fontSize: '4rem', margin: '24px 0' }}>
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
        </div>
        <div className="stat-card" style={{ maxWidth: '300px', margin: '24px auto' }}>
          <div className="number">{score}/{quizWords.length}</div>
          <div className="label">Correct Answers</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}>
            {percentage}%
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          {percentage >= 80 && <p style={{ fontSize: '1.2rem', color: '#28a745' }}>Excellent work! 🌟</p>}
          {percentage >= 60 && percentage < 80 && <p style={{ fontSize: '1.2rem', color: '#667eea' }}>Good job! Keep practicing! 📚</p>}
          {percentage < 60 && <p style={{ fontSize: '1.2rem', color: '#dc3545' }}>Keep studying! You'll get there! 💪</p>}
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
            style={{ width: `${((currentQuestion) / quizWords.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', margin: '32px 0' }}>
        {question.dutch}
      </h2>

      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '32px' }}>
        What does this mean in English?
      </p>

      <div>
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
              fontSize: '1.2rem',
              fontWeight: '500'
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

import { useState } from 'react';
import { grammarLessons } from '../data/grammar';

export default function GrammarView({ onBack }) {
  const [selectedLesson, setSelectedLesson] = useState(null);

  if (selectedLesson) {
    return (
      <div>
        <button onClick={() => setSelectedLesson(null)} className="back-button secondary">
          ← Back to Grammar Lessons
        </button>

        <div className="card">
          <div style={{ marginBottom: '16px' }}>
            <span
              style={{
                background: selectedLesson.level === 'Beginner' ? '#28a745' : '#667eea',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
            >
              {selectedLesson.level}
            </span>
          </div>

          <h2>{selectedLesson.title}</h2>

          <div
            style={{
              marginTop: '24px',
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}
          >
            {selectedLesson.content.split('\n').map((line, index) => {
              // Handle headers
              if (line.startsWith('## ')) {
                return (
                  <h3 key={index} style={{ marginTop: '24px', marginBottom: '12px' }}>
                    {line.replace('## ', '')}
                  </h3>
                );
              }
              // Handle bold
              if (line.startsWith('### ')) {
                return (
                  <h4 key={index} style={{ marginTop: '16px', marginBottom: '8px', fontSize: '1.1rem' }}>
                    {line.replace('### ', '')}
                  </h4>
                );
              }
              // Handle list items
              if (line.startsWith('- ')) {
                return (
                  <li key={index} style={{ marginLeft: '24px', marginBottom: '8px' }}>
                    {line.replace('- ', '').split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </li>
                );
              }
              // Handle table rows
              if (line.startsWith('|')) {
                return null; // Tables handled separately
              }
              // Regular paragraphs
              if (line.trim()) {
                return (
                  <p key={index} style={{ marginBottom: '12px' }}>
                    {line.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                    )}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {selectedLesson.examples && selectedLesson.examples.length > 0 && (
            <div style={{ marginTop: '32px', padding: '20px', background: '#f7fafc', borderRadius: '8px' }}>
              <h3 style={{ marginBottom: '16px' }}>Examples</h3>
              {selectedLesson.examples.map((example, index) => (
                <div key={index} style={{ marginBottom: '12px', padding: '12px', background: 'white', borderRadius: '6px' }}>
                  <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                    {example.dutch}
                  </div>
                  {example.english && (
                    <div style={{ color: '#667eea', marginTop: '4px' }}>
                      → {example.english}
                    </div>
                  )}
                  {example.breakdown && (
                    <div style={{ color: '#718096', fontSize: '0.9rem', marginTop: '4px', fontStyle: 'italic' }}>
                      [{example.breakdown}]
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack} className="back-button secondary">
        ← Back to Main Menu
      </button>

      <div className="card">
        <h2>Grammar Lessons</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>
          Learn essential Dutch grammar rules and structures
        </p>

        <div style={{ display: 'grid', gap: '16px' }}>
          {grammarLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              style={{
                padding: '20px',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = '#f7fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <span
                  style={{
                    background: lesson.level === 'Beginner' ? '#28a745' : '#667eea',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}
                >
                  {lesson.level}
                </span>
              </div>
              <h3 style={{ marginBottom: '8px' }}>{lesson.title}</h3>
              <div style={{ color: '#718096', fontSize: '0.95rem' }}>
                Click to view lesson →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

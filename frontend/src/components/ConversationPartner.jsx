import { useState } from 'react';

export default function ConversationPartner({ onBack }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hallo! Ik ben je Nederlandse gesprekpartner. Laten we oefenen! Hoe gaat het met je?', translation: 'Hello! I\'m your Dutch conversation partner. Let\'s practice! How are you?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [showTranslation, setShowTranslation] = useState(true);

  const commonMistakes = {
    'ben': { correct: 'ben', rule: 'Use "ben" with "ik" (I am)' },
    'bent': { correct: 'bent', rule: 'Use "bent" with "jij/u" (you are)' },
    'is': { correct: 'is', rule: 'Use "is" with "hij/zij/het" (he/she/it is)' },
    'zijn': { correct: 'zijn', rule: 'Use "zijn" with "wij/jullie/zij" (we/you/they are)' },
  };

  const botResponses = [
    {
      trigger: ['hallo', 'hoi', 'dag'],
      response: 'Hallo! Leuk je te spreken. Wat heb je vandaag gedaan?',
      translation: 'Hello! Nice to talk to you. What did you do today?'
    },
    {
      trigger: ['goed', 'prima', 'uitstekend'],
      response: 'Dat is fijn om te horen! Wat ga je dit weekend doen?',
      translation: 'That\'s nice to hear! What are you going to do this weekend?'
    },
    {
      trigger: ['werk', 'werken', 'baan'],
      response: 'Interessant! Wat voor werk doe je? Vind je het leuk?',
      translation: 'Interesting! What kind of work do you do? Do you like it?'
    },
    {
      trigger: ['school', 'studeren', 'leren'],
      response: 'Wat studeer je? Welke vakken vind je het leukst?',
      translation: 'What are you studying? Which subjects do you like the most?'
    },
    {
      trigger: ['nederland', 'amsterdam', 'rotterdam'],
      response: 'Nederland is een mooi land! Waar woon je precies? Ben je hier geboren?',
      translation: 'The Netherlands is a beautiful country! Where exactly do you live? Were you born here?'
    }
  ];

  const analyzeDutch = (text) => {
    const corrections = [];
    const words = text.toLowerCase().split(' ');

    // Check for common verb mistakes
    if (words.includes('ik') && words.includes('bent')) {
      corrections.push('Let op: met "ik" gebruik je "ben", niet "bent". Bijvoorbeeld: "Ik ben blij"');
    }
    if ((words.includes('jij') || words.includes('je')) && words.includes('ben')) {
      corrections.push('Let op: met "jij/je" gebruik je "bent", niet "ben". Bijvoorbeeld: "Jij bent aardig"');
    }

    // Check word order (simplified)
    if (text.startsWith('Ik ga niet')) {
      corrections.push('Goed! Je gebruikt de juiste woordvolgorde: onderwerp + werkwoord + niet');
    }

    return corrections;
  };

  const getBotResponse = (userText) => {
    const lowerText = userText.toLowerCase();

    for (const response of botResponses) {
      if (response.trigger.some(trigger => lowerText.includes(trigger))) {
        return { text: response.response, translation: response.translation };
      }
    }

    // Default responses
    const defaultResponses = [
      { text: 'Interessant! Kun je daar meer over vertellen?', translation: 'Interesting! Can you tell more about that?' },
      { text: 'Dat begrijp ik. Wat denk je daarvan?', translation: 'I understand. What do you think about it?' },
      { text: 'Kun je dat in andere woorden uitleggen?', translation: 'Can you explain that in other words?' },
      { text: 'Goed bezig! Blijf oefenen met Nederlands spreken.', translation: 'Good job! Keep practicing speaking Dutch.' }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: inputText };
    const corrections = analyzeDutch(inputText);

    setMessages(prev => [...prev, userMessage]);

    // Add corrections if any
    if (corrections.length > 0) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          sender: 'correction',
          text: corrections.join(' '),
          isCorrection: true
        }]);
      }, 500);
    }

    // Get bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botResponse.text,
        translation: botResponse.translation
      }]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div>
      <button onClick={onBack} className="back-button secondary">
        ← Back to Main Menu
      </button>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2>Conversatie Partner 💬</h2>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={showTranslation}
              onChange={(e) => setShowTranslation(e.target.checked)}
            />
            Show translations
          </label>
        </div>

        <p style={{ color: '#718096', marginBottom: '24px' }}>
          Practice conversations in Dutch. I'll help correct your mistakes!
        </p>

        <div style={{
          background: '#f7fafc',
          borderRadius: '12px',
          padding: '16px',
          height: '400px',
          overflowY: 'auto',
          marginBottom: '16px',
          border: '2px solid #e2e8f0'
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                marginBottom: '16px',
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: '12px',
                background: msg.isCorrection ? '#fff3cd' : msg.sender === 'user' ? '#667eea' : 'white',
                color: msg.sender === 'user' ? 'white' : '#2d3748',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: msg.isCorrection ? '2px solid #ffc107' : 'none'
              }}>
                <div style={{ fontWeight: msg.isCorrection ? 'bold' : 'normal' }}>
                  {msg.isCorrection && '⚠️ '}{msg.text}
                </div>
                {msg.translation && showTranslation && !msg.isCorrection && (
                  <div style={{
                    fontSize: '0.85rem',
                    marginTop: '8px',
                    opacity: 0.8,
                    fontStyle: 'italic',
                    color: msg.sender === 'user' ? 'white' : '#718096'
                  }}>
                    {msg.translation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type je bericht in het Nederlands..."
            style={{ flex: 1, marginBottom: 0 }}
          />
          <button onClick={handleSend} disabled={!inputText.trim()}>
            Verstuur
          </button>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#e6f3ff', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '8px', color: '#2d3748' }}>💡 Tips voor gesprekken:</h4>
          <ul style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.6' }}>
            <li>Begin met "Hallo" of "Goedemorgen"</li>
            <li>Gebruik "Ik ben..." om over jezelf te vertellen</li>
            <li>Vraag "Hoe gaat het?" om een gesprek te beginnen</li>
            <li>Let op woordvolgorde: onderwerp + werkwoord</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

# MyDutch 🇳🇱

An interactive **A2-level Dutch language learning application** specifically designed for **inburgering exam preparation**. Built with React and Vite.

## 🎯 Inburgering Focused

This app is tailored for the Dutch civic integration (inburgering) exam at A2 CEFR level, covering all essential topics and skills needed to pass.

## Features

### 📚 Extensive A2-Level Vocabulary
- **16+ Categories**: Basics, Numbers, Food & Drinks, Family, Colors, Weather, Time, Common Verbs, Places, Question Words, **Housing & Living, Healthcare & Medical, Work & Employment, Education & School, Transport & Travel, Shopping & Services, Government & Society**
- **600+ Words**: Each with English translation, pronunciation guide, and practical example sentences
- Focus on real-world situations you'll encounter in the Netherlands
- Organized by topic for systematic learning

### 📇 Interactive Flashcards with Audio
- Click to flip between Dutch and English
- **🔊 Audio playback** for every word and example sentence (text-to-speech)
- Pronunciation guides in IPA-style notation
- Context-rich example sentences
- Navigate through cards at your own pace

### ✏️ Multiple Quiz Types
- **Multiple Choice Quiz**: Test vocabulary recognition with 4 options
- **📝 Fill in the Blank Quiz**: Complete sentences with correct Dutch words
- **🎧 Listening Quiz**: Audio-based comprehension (listen and identify)
- Instant feedback with visual indicators
- **XP Rewards**: Earn 10-15 XP per correct answer
- Randomized questions for effective learning

### 💬 Conversation Partner
- **AI-powered Dutch chat partner** for conversation practice
- Real-time corrections on grammar and sentence structure
- Common topics: greetings, work, daily activities, weather
- Toggle translations on/off to adjust difficulty
- Learn natural conversation patterns used by native speakers

### 📖 Grammar Lessons
- 8 comprehensive grammar lessons covering:
  - Dutch Pronunciation Guide
  - Personal Pronouns
  - Present Tense Verbs
  - Word Order (critical for A2!)
  - Articles (De & Het)
  - Common Conversation Phrases
  - Plural Nouns
  - Separable Verbs
- Clear examples and practical usage tips
- Progressive difficulty (Beginner to Intermediate)

### 📊 Advanced Progress Tracking
- **Level System**: Level up every 100 XP earned
- **XP Tracking**: Earn points for completing quizzes and activities
- **Study Streak**: Track consecutive days of practice 🔥
- **Mistake Tracker**: Review your 10 most recent errors
- **Accuracy Percentage**: Monitor your overall performance
- **Categories Mastered**: Track which topics you've completed (80%+ accuracy)
- Visual progress bars showing advancement to next level
- Personalized learning tips

### 🔊 Comprehensive Audio Features
- Text-to-speech for all Dutch words and sentences
- Listening comprehension exercises
- Practice pronunciation with native-like audio
- Audio available in flashcards, quizzes, and conversation partner

### 🎮 Gamification Elements
- **Level System**: Start at Level 1, advance as you learn
- **XP System**:
  - 10 XP per correct multiple choice answer
  - 10 XP per fill-in-blank answer
  - 15 XP per listening quiz answer (bonus for harder tasks)
- **Daily Streaks**: Maintain consistency with streak tracking
- **Achievement System**: Master categories by scoring 80%+
- Visual feedback and celebratory animations

### ⚡ Quick Access Features
- **Quick Quiz Button**: Instant random quiz from all categories
- **Shortcuts on Home Page**: One-click access to key features
- **Live Stats Display**: See your level, XP, and streak on the home screen

### 🎨 Beautiful, Modern UI
- Gradient design with purple/blue theme matching Dutch flag colors
- Smooth animations and transitions
- Fully responsive (desktop, tablet, mobile)
- Intuitive navigation
- Accessible design patterns

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- Modern web browser with Web Speech API support (Chrome, Edge, Safari)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexhawat/mydutch
cd mydutch
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## How to Use - Inburgering Study Path

### Recommended Learning Sequence

1. **Start with Basics** (Week 1)
   - Master greetings, common phrases, and basic conversation
   - Use flashcards with audio to learn pronunciation
   - Take the multiple choice quiz until 80%+ accuracy

2. **Essential Categories** (Weeks 2-4)
   - **Housing**: Learn rental, address, and living situation vocabulary
   - **Healthcare**: Medical terms, appointments, insurance
   - **Work**: Job applications, contracts, workplace vocabulary
   - Use all three quiz types for each category

3. **Daily Life Categories** (Weeks 5-6)
   - **Transport**: Public transport, travel, directions
   - **Shopping**: Purchases, prices, services
   - **Education**: If you have children or plan to study

4. **Government & Society** (Week 7)
   - Essential for KNS (Knowledge of Dutch Society)
   - Municipality vocabulary, rights, responsibilities
   - Laws and regulations

5. **Practice & Review** (Week 8+)
   - Use Quick Quiz daily for mixed practice
   - Chat with Conversation Partner regularly
   - Review Mistake Tracker and focus on weak areas
   - Maintain your streak!

### Study Tips for A2 Inburgering Success

#### Daily Routine
- **15-30 minutes minimum** to maintain streak
- Use Quick Quiz for warm-up
- Study 1-2 categories thoroughly
- Practice conversation for 5-10 minutes
- Review mistakes before ending session

#### Effective Learning Strategies
- **Listen Actively**: Use audio features extensively - listening is 40% of the exam!
- **Speak Out Loud**: Repeat words after audio playback
- **Write Sentences**: Practice fill-in-blank to improve writing
- **Real-World Application**: Use new words when shopping, at doctor, etc.
- **Consistency Over Intensity**: Daily practice beats weekend marathons
- **Review Mistakes**: Your error log shows exactly what to study
- **Track Progress**: Aim for 80%+ accuracy before moving to next category
- **Set XP Goals**: Try to gain 100+ XP daily (10-15 correct answers)

#### Exam-Specific Prep
- **Simulate Exam Conditions**: Use listening quiz without translations
- **Time Yourself**: Practice completing quizzes quickly
- **Focus on Weak Categories**: Check your mistake tracker patterns
- **Practice All Skills**: Reading (flashcards), listening (audio quiz), speaking (conversation partner), writing (fill-in-blank)

## Project Structure

```
mydutch/
├── src/
│   ├── components/
│   │   ├── Flashcard.jsx          # Flashcard component with audio
│   │   ├── Quiz.jsx               # Multiple choice quiz with XP
│   │   ├── FillInBlankQuiz.jsx    # Sentence completion quiz
│   │   ├── ListeningQuiz.jsx      # Audio comprehension quiz
│   │   ├── ConversationPartner.jsx # AI chat partner with corrections
│   │   ├── CategoryView.jsx       # Category navigation and modes
│   │   ├── GrammarView.jsx        # Grammar lessons viewer
│   │   └── ProgressTracker.jsx    # XP, levels, streaks, mistakes
│   ├── data/
│   │   ├── vocabulary.js          # Core vocabulary (10 categories)
│   │   ├── vocabularyA2Extended.js # A2-level vocabulary (6 categories)
│   │   └── grammar.js             # 8 grammar lessons
│   ├── utils/
│   │   ├── audio.js               # Text-to-speech engine
│   │   └── progress.js            # XP system, streaks, mistake tracking
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── package.json                   # Dependencies
└── vite.config.js                # Build configuration
```

## Technologies Used

- **React 18**: Modern React with hooks for state management
- **Vite**: Lightning-fast build tool and dev server
- **CSS3**: Custom styling with gradients and animations
- **Web Speech API**: Browser-based text-to-speech for audio
- **LocalStorage**: Persistent progress, XP, streaks, and mistakes

## Inburgering Exam Coverage

### Knowledge of Dutch Society (KNS)
✅ Government and Society vocabulary
✅ Dutch laws and civic responsibilities
✅ Rights and obligations

### Reading Comprehension
✅ Housing contracts and rental terms
✅ Healthcare and medical information
✅ Work contracts and employment
✅ Government communications
✅ Daily life situations

### Listening Comprehension
✅ Listening quiz with audio playback
✅ Conversation partner practice
✅ Audio for all 600+ words
✅ Example sentences with native pronunciation

### Speaking Skills
✅ Conversation partner for dialogue practice
✅ Example sentences for common scenarios
✅ Pronunciation guides for all words
✅ Audio to model correct pronunciation

### Writing Skills
✅ Fill-in-blank exercises for sentence construction
✅ Grammar lessons for correct structure
✅ Example sentences showing proper usage

## Customization

### Adding New Words

Edit `src/data/vocabularyA2Extended.js`:

```javascript
{
  dutch: "Nieuw woord",
  english: "New word",
  pronunciation: "NEW vort",
  example: "Dit is een nieuw woord in een zin."
}
```

### Adding Grammar Lessons

Edit `src/data/grammar.js`:

```javascript
{
  id: 9,
  title: "Your Lesson Title",
  level: "Beginner",
  content: `## Your Content Here`,
  examples: [
    { dutch: "Example", english: "Translation" }
  ]
}
```

## Tips for Exam Success

### Before the Exam
1. Complete all 16 categories with 80%+ accuracy
2. Maintain a 7-day streak leading up to exam
3. Reach at least Level 5 (500 XP)
4. Review all mistakes in tracker
5. Practice conversation partner daily for a week

### During the Exam
1. Read/listen to questions carefully
2. Eliminate obviously wrong answers first
3. Use context clues in sentences
4. Manage your time (don't spend too long on one question)
5. Stay calm - you've practiced!

### After Each Practice Session
1. Check your XP progress
2. Review new mistakes added to tracker
3. Note categories needing more work
4. Celebrate your streak!

## Contributing

This is an open-source project. Contributions welcome! Ideas for enhancement:

- Additional A2-level vocabulary categories
- Video pronunciation guides
- Typing speed exercises
- Spaced repetition system (SRS)
- Social features (leaderboards, study groups)
- Mock inburgering exams
- Pronunciation scoring with speech recognition
- More grammar lessons (past tense, future tense)
- Cultural notes about the Netherlands

## License

Open source - available for personal and educational use.

## Acknowledgments

- Vocabulary curated from A2 CEFR standards and inburgering requirements
- Grammar content adapted from standard Dutch language pedagogy
- Pronunciation guides based on standard Dutch phonetics
- Built with ❤️ for Dutch language learners and immigrants to the Netherlands

## Support

If you encounter issues or have questions:
- Check browser console for errors
- Ensure JavaScript is enabled
- Try a modern browser (Chrome, Edge, Safari)
- Clear browser cache and reload

---

## 🎓 Good Luck with Your Inburgering Exam!

**Veel succes met je inburgeringsexamen!**

Remember: Consistency is key. Study a little every day, use all the features, and track your progress. You've got this! 💪

---

**Current Status**: Ready for A2-level inburgering preparation with 600+ words, multiple quiz types, conversation practice, and comprehensive progress tracking.

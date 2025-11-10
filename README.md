# MyDutch 🇳🇱

An interactive Dutch language learning application built with React and Vite.

## Features

### 📚 Comprehensive Vocabulary
- **10 Categories**: Basics, Numbers, Food & Drinks, Family, Colors, Weather, Time, Common Verbs, Places, and Question Words
- **200+ Words**: Each with English translation, pronunciation guide, and example sentences
- Organized by topic for easier learning

### 📇 Interactive Flashcards
- Click to flip between Dutch and English
- Includes pronunciation guides in IPA-style notation
- Example sentences for context
- Navigate through cards at your own pace

### ✏️ Practice Quizzes
- Multiple choice quizzes for each category
- Instant feedback on answers
- Score tracking and performance metrics
- Randomized questions for better learning

### 📖 Grammar Lessons
- 8 comprehensive grammar lessons covering:
  - Dutch Pronunciation Guide
  - Personal Pronouns
  - Present Tense Verbs
  - Word Order
  - Articles (De & Het)
  - Common Phrases for Conversation
  - Plural Nouns
  - Separable Verbs
- Examples and practical usage tips
- Progressive difficulty (Beginner to Intermediate)

### 📊 Progress Tracking
- Monitor words learned
- Track quizzes taken and accuracy
- Study streak counter
- Personalized learning tips

### 🎨 Beautiful UI
- Modern, gradient-based design
- Smooth animations and transitions
- Fully responsive (works on desktop, tablet, and mobile)
- Intuitive navigation

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
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

## How to Use

### Learning Path

1. **Start with Basics**: Begin with the "Basics" category to learn essential greetings and common phrases
2. **Use Flashcards**: Study new words using the flashcard feature - click to flip and reveal translations
3. **Review Vocabulary**: Browse the full word list in each category to see all words at once
4. **Take Quizzes**: Test your knowledge with interactive quizzes
5. **Learn Grammar**: Study grammar lessons to understand sentence structure and rules
6. **Track Progress**: Monitor your learning journey in the Progress section

### Study Tips

- **Daily Practice**: Try to study at least 10-15 minutes every day
- **Focus on One Category**: Master one category before moving to the next
- **Use Example Sentences**: Pay attention to example sentences to understand context
- **Practice Pronunciation**: Use the pronunciation guides to speak words out loud
- **Repeat Quizzes**: Take quizzes multiple times to reinforce learning
- **Apply Grammar**: After learning grammar rules, identify them in vocabulary examples

## Project Structure

```
mydutch/
├── src/
│   ├── components/
│   │   ├── Flashcard.jsx       # Flashcard component
│   │   ├── Quiz.jsx            # Quiz component
│   │   ├── CategoryView.jsx    # Category navigation
│   │   ├── GrammarView.jsx     # Grammar lessons viewer
│   │   └── ProgressTracker.jsx # Progress tracking
│   ├── data/
│   │   ├── vocabulary.js       # All vocabulary data
│   │   └── grammar.js          # Grammar lessons data
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── index.html                  # HTML template
├── package.json               # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with gradients and animations
- **LocalStorage**: For progress tracking persistence

## Customization

### Adding New Words

Edit `src/data/vocabulary.js` and add words to existing categories or create new ones:

```javascript
{
  dutch: "Word",
  english: "Translation",
  pronunciation: "pro-nun-see-AY-shun",
  example: "Example sentence in Dutch"
}
```

### Adding Grammar Lessons

Edit `src/data/grammar.js` to add new lessons:

```javascript
{
  id: 9,
  title: "Your Lesson Title",
  level: "Beginner", // or "Intermediate"
  content: `Markdown formatted content`,
  examples: [...]
}
```

## Contributing

Feel free to fork this project and customize it for your own learning needs! Suggestions for improvements:

- Add audio pronunciation files
- Include more advanced grammar topics
- Add typing exercises
- Implement spaced repetition algorithm
- Add social features (share progress, compete with friends)

## License

This project is open source and available for personal and educational use.

## Acknowledgments

- Vocabulary and grammar content compiled from various Dutch language learning resources
- Pronunciation guides adapted from standard Dutch phonetics
- Built with ❤️ for Dutch language learners

---

**Veel succes met je Nederlands leren!** (Good luck with learning Dutch!)

# Changelog

All notable changes to MyDutch will be documented in this file.

## [0.2.0] - 2025-11-11

### Added
- **Full-stack architecture** with FastAPI backend and React frontend
- **User authentication** with JWT and refresh tokens
- **Cloudflare R2 integration** for content and user data storage
- **Cloudflare Workers AI** for Dutch conversation partner
- **Cross-device progress sync** via R2 storage
- **CI/CD pipeline** with GitHub Actions
- **Comprehensive API documentation** at /docs endpoint
- **Database migrations** with Alembic
- **Docker Compose** development environment
- **Backend tests** with Pytest
- **OAuth preparation** for Google and GitHub login

### Changed
- **Migrated from single-page app to full-stack** architecture
- **Progress tracking now syncs to backend** instead of local-only storage
- **Conversation partner now uses real AI** instead of mock responses
- **Project structure reorganized** with backend/ and frontend/ directories

### Technical
- **Backend**: Python 3.11, FastAPI, UV package manager, PostgreSQL
- **Frontend**: React 18, React Router, Context API
- **Storage**: Cloudflare R2 with presigned URLs
- **AI**: Cloudflare Workers AI with Dutch language support
- **DevOps**: Docker, GitHub Actions, automated testing

## [0.1.0] - 2024-11-10

### Added
- Initial release with frontend-only React application
- 16+ vocabulary categories with 600+ words
- 8 comprehensive grammar lessons
- Interactive flashcards with audio playback (Web Speech API)
- Multiple quiz types (multiple choice, fill-in-blank, listening)
- Mock conversation partner
- Local progress tracking (XP, levels, streaks)
- Mistake logging and review
- GitHub Pages deployment

### Features
- A2-level Dutch vocabulary and grammar
- Text-to-speech audio for all words and sentences
- Gamification with XP and levels
- Study streak tracking
- Responsive design with gradient theme
- Mobile-friendly interface

---

## Roadmap

### Upcoming Features
- OAuth implementation (Google, GitHub)
- Extended vocabulary (5000+ words target)
- 100+ categories
- Advanced quiz types
- Speaking practice with voice recognition
- Personalized learning recommendations
- Social features (leaderboards, achievements)
- Mobile app (React Native)
- Offline mode with service workers
- Advanced grammar explanations
- Cultural lessons about the Netherlands

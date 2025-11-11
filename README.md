# MyDutch 🇳🇱

A **full-stack Dutch language learning application** for A2 inburgering exam preparation. Built with React, FastAPI, Cloudflare R2, and Cloudflare Workers AI.

## 🎯 Features

### 🔐 User Authentication
- Email/password registration and login
- JWT-based authentication with refresh tokens
- OAuth integration ready (Google, GitHub)
- Protected routes and secure sessions

### 📚 Comprehensive Learning Content
- **16+ vocabulary categories** with 600+ words
- **8 grammar lessons** covering A2-level Dutch
- Interactive flashcards with audio playback
- Multiple quiz types (multiple choice, fill-in-blank, listening)
- Real-world example sentences

### 💬 AI Conversation Partner
- Powered by Cloudflare Workers AI
- Dutch conversation practice with real-time corrections
- Grammar explanations and tips
- Context-aware responses
- Mistake highlighting

### 📊 Progress Tracking
- Cross-device sync via Cloudflare R2
- XP and leveling system
- Study streak tracking
- Mistake logging and review
- Category mastery tracking

### 🔊 Audio Features
- Text-to-speech for all vocabulary
- Listening comprehension exercises
- Pronunciation practice

## 🏗️ Architecture

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **Web Speech API** - Text-to-speech

### Backend
- **Python 3.11** - Programming language
- **UV** - Fast Python package manager
- **FastAPI** - Web framework
- **PostgreSQL 16** - User account database
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations

### Storage & AI
- **Cloudflare R2** - Object storage (S3-compatible)
  - Public bucket: Learning content (vocabulary, grammar)
  - Private bucket: User progress and chat history
- **Cloudflare Workers AI** - Chat conversation partner
- **Presigned URLs** - Secure private file access

### DevOps
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Frontend deployment
- **Pytest** - Backend testing

## 🚀 Quick Start

### Prerequisites
- **Docker & Docker Compose** (recommended)
- OR: Python 3.11+, Node.js 20+, PostgreSQL 16

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/alexhawat/mydutch.git
cd mydutch

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration
nano backend/.env

# Start all services
make dev

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Install UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install dependencies
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
uv pip install -e .

# Set up database (PostgreSQL must be running)
alembic upgrade head

# Run development server
uvicorn app.main:app --reload
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 📝 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://mydutch:mydutch@localhost:5432/mydutch

# JWT
JWT_SECRET_KEY=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com
R2_CONTENT_BUCKET=mydutch-content
R2_USER_DATA_BUCKET=mydutch-user-data

# Cloudflare Workers AI
CF_ACCOUNT_ID=your-account-id
CF_API_TOKEN=your-api-token
CF_AI_MODEL=@cf/meta/llama-2-7b-chat-int8

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
VITE_R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

## 🛠️ Development

### Available Commands (Makefile)

```bash
make help          # Show all available commands
make setup         # Initial project setup
make dev           # Start development environment
make build         # Build all Docker images
make test-backend  # Run backend tests
make test-frontend # Run frontend tests
make migrate       # Run database migrations
make logs          # View all service logs
make clean         # Stop and remove all containers
```

### Running Tests

```bash
# Backend tests
cd backend
source .venv/bin/activate
pytest -v

# Frontend build test
cd frontend
npm run build
```

### Code Quality

```bash
# Backend linting
cd backend
source .venv/bin/activate
black app/
ruff check app/
mypy app/
```

## 📚 API Documentation

Once the backend is running, visit:
- **Interactive API docs**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

### Key Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET /api/v1/auth/me` - Get current user

#### Content
- `GET /api/v1/content/vocabulary` - Get all vocabulary
- `GET /api/v1/content/grammar` - Get grammar lessons
- `GET /api/v1/content/progress` - Get user progress
- `POST /api/v1/content/progress` - Update progress

#### Chat
- `POST /api/v1/chat/conversation` - Chat with AI partner
- `POST /api/v1/chat/grammar` - Get grammar explanation
- `GET /api/v1/chat/history` - Get chat history

## 🗂️ Project Structure

```
mydutch/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── routers/        # API endpoints
│   │   ├── models.py       # Database models
│   │   ├── schemas.py      # Pydantic schemas
│   │   ├── auth.py         # JWT utilities
│   │   ├── r2.py           # R2 storage service
│   │   ├── ai.py           # Cloudflare AI service
│   │   └── main.py         # FastAPI app
│   ├── alembic/            # Database migrations
│   ├── tests/              # Pytest tests
│   └── pyproject.toml      # UV dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── services/       # API services
│   │   ├── utils/          # Utilities
│   │   └── data/           # Static data
│   └── package.json        # npm dependencies
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── .github/workflows/      # CI/CD pipelines
└── docker-compose.yml      # Docker orchestration
```

## 🚢 Deployment

### Frontend (GitHub Pages)
Automatically deployed on push to `main` branch via GitHub Actions.

### Backend
Configure your preferred hosting:
- Railway
- Fly.io
- Render
- Cloudflare Workers
- Any Docker-compatible platform

## 📖 Learning Resources

- [Official Inburgering Website](https://www.inburgeren.nl/)
- [A2 Dutch CEFR Level](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions)
- [Dutch Grammar Guide](https://www.dutchgrammar.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ for Dutch language learners
- Powered by Cloudflare's edge platform
- Designed for inburgering exam success

---

**Good luck with your Dutch learning journey! Veel succes! 🇳🇱**

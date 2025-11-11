# MyDutch - Development Guide

## Phase 1: Foundation - COMPLETED ✅

This document describes the foundational setup for the MyDutch full-stack application.

## Architecture Overview

```
mydutch/
├── frontend/          # React + Vite application
├── backend/           # FastAPI + PostgreSQL + UV
├── docs/              # Documentation
├── scripts/           # Utility scripts
├── .github/workflows/ # CI/CD pipelines
└── docker-compose.yml # Local development environment
```

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Context API** - State management

### Backend
- **Python 3.11** - Programming language
- **UV** - Fast Python package manager
- **FastAPI** - Web framework
- **PostgreSQL 16** - Database
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **Boto3** - AWS S3/R2 client

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **GitHub Actions** - CI/CD
- **Cloudflare R2** - Object storage
- **Cloudflare Pages** - Frontend hosting

## Prerequisites

- **Docker** & **Docker Compose** (20.10+)
- **Make** (optional but recommended)
- **Git**

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/alexhawat/mydutch.git
cd mydutch
```

### 2. Initial Setup

```bash
make setup
```

This command will:
- Copy environment example files
- Build Docker images
- Start all services
- Run database migrations

### 3. Access Applications

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432

## Development Workflow

### Start Development Environment

```bash
make dev
# or
docker-compose up
```

### View Logs

```bash
make logs              # All services
make logs-backend      # Backend only
make logs-frontend     # Frontend only
make logs-db          # Database only
```

### Run Tests

```bash
make test-backend     # Backend tests
make test-frontend    # Frontend tests
```

### Database Management

```bash
make migrate                        # Run migrations
make migrate-create name="add_users"  # Create new migration
make migrate-down                   # Rollback one migration
make db-shell                       # Open PostgreSQL shell
```

### Code Quality

```bash
make format-backend    # Format Python code
make lint-backend      # Lint Python code
make lint-frontend     # Lint JavaScript code
```

### Container Management

```bash
make up                # Start in background
make down              # Stop all services
make clean             # Remove everything
make backend-shell     # Open backend shell
make frontend-shell    # Open frontend shell
```

## Project Structure

### Backend Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py           # FastAPI application
│   ├── config.py         # Settings management
│   ├── database.py       # Database connection
│   ├── models.py         # SQLAlchemy models
│   ├── routers/          # API endpoints (Phase 2)
│   ├── services/         # Business logic (Phase 2)
│   └── utils/            # Helper functions (Phase 2)
├── alembic/
│   ├── versions/         # Migration files
│   └── env.py            # Alembic configuration
├── tests/                # Test files
├── Dockerfile            # Production image
├── Dockerfile.dev        # Development image
├── pyproject.toml        # UV dependencies
└── .env.example          # Environment template
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   ├── data/            # Vocabulary & grammar
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── Dockerfile           # Production image
├── Dockerfile.dev       # Development image
├── nginx.conf           # Production web server
├── vite.config.js       # Vite configuration
└── .env.example         # Environment template
```

## Environment Variables

### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://mydutch:mydutch@db:5432/mydutch

# JWT
JWT_SECRET_KEY=your-secret-key-min-32-characters
JWT_ALGORITHM=HS256

# Cloudflare R2 (Phase 3)
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...

# OAuth (Phase 2)
GOOGLE_CLIENT_ID=...
GITHUB_CLIENT_ID=...
```

### Frontend (.env)

```bash
VITE_API_URL=http://localhost:8000
VITE_R2_PUBLIC_URL=https://your-r2-bucket.com
```

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| email | String | Unique user email |
| password_hash | String | Hashed password (null for OAuth) |
| full_name | String | User's full name |
| auth_provider | Enum | email/google/github |
| provider_id | String | OAuth provider ID |
| is_active | Boolean | Account status |
| is_verified | Boolean | Email verified |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |
| last_login_at | DateTime | Last login |

### Refresh Tokens Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to users |
| token | String | Refresh token |
| expires_at | DateTime | Expiration time |
| created_at | DateTime | Creation timestamp |
| is_revoked | Boolean | Token revoked status |

## API Endpoints (Phase 1)

### Health & Status

```
GET /                    # Root endpoint
GET /health             # Health check
GET /api/v1/status      # API status
```

### Coming in Phase 2

```
POST /api/v1/auth/register          # User registration
POST /api/v1/auth/login             # User login
POST /api/v1/auth/refresh           # Token refresh
GET  /api/v1/auth/me                # Current user
```

## Testing

### Backend Tests

```bash
cd backend
uv run pytest                    # Run all tests
uv run pytest -v                 # Verbose output
uv run pytest --cov=app          # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test                         # Run tests
npm run test:coverage            # With coverage
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :5173  # Frontend
lsof -i :8000  # Backend
lsof -i :5432  # PostgreSQL

# Kill the process
kill -9 <PID>
```

### Docker Issues

```bash
# Rebuild from scratch
make clean
make build
make up
```

### Database Connection Issues

```bash
# Check database logs
make logs-db

# Reset database
docker-compose down -v
docker-compose up -d db
make migrate
```

### UV Installation Issues

```bash
# Install UV globally
curl -LsSf https://astral.sh/uv/install.sh | sh

# Or use pip
pip install uv
```

## Git Workflow

### Branch Strategy

- `main` - Production-ready code
- `dev` - Development branch
- `test` - Testing/QA branch
- `feature/*` - Feature branches

### Creating Feature Branch

```bash
git checkout dev
git pull origin dev
git checkout -b feature/my-feature
# Make changes
git add .
git commit -m "Add my feature"
git push origin feature/my-feature
# Create PR to dev branch
```

## Next Steps (Phase 2)

- [ ] User authentication endpoints
- [ ] JWT token generation
- [ ] OAuth integration (Google, GitHub)
- [ ] Protected routes
- [ ] Login/Register UI components

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [UV Documentation](https://github.com/astral-sh/uv)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Review documentation
3. Create new issue with details

---

**Last Updated**: Phase 1 Completion
**Contributors**: Development Team

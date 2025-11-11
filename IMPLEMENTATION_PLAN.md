# MyDutch Full-Stack Application - Implementation Plan

## Project Overview

Build a complete **MyDutch** Dutch language learning application for A2-level inburgering exam preparation. The application includes a React frontend, Python FastAPI backend, Cloudflare R2 storage, multi-provider authentication, AI chat agent, and automated GitHub CI/CD deployment.

[Full detailed prompt content continues as provided by user...]

## Technology Stack

**Frontend:**
- React 18 with Vite for fast development
- Direct R2 access for content loading
- JWT-based authentication with refresh tokens
- Web Speech API for text-to-speech
- React Router for navigation
- Context API for global state management

**Backend:**
- Python 3.11 with FastAPI framework
- **UV for Python package management** (fast, reliable dependency management)
- PostgreSQL for user accounts only
- JWT token generation and validation
- OAuth2 integration (Google, GitHub)
- Boto3 for R2 presigned URL generation
- Cloudflare AI SDK for chat agent
- Uvicorn ASGI server

**Storage:**
- Cloudflare R2 with two buckets
- Public bucket for static learning content
- Private bucket for user data with presigned URL access
- JSON file format for all data

**Infrastructure:**
- Docker and Docker Compose for local development
- GitHub Actions for CI/CD pipeline
- Cloudflare Pages for frontend hosting
- VPS or Cloudflare Workers for backend hosting
- PostgreSQL in Docker container locally
- Managed PostgreSQL in production

**Branching Strategy:**
- **main**: Production-ready code, auto-deploys to production
- **dev**: Development branch, auto-deploys to staging
- **test**: Testing branch for QA and integration tests
- Feature branches: Created from dev, merged back to dev

[Rest of the detailed implementation plan continues...]

## Implementation Priority

**Phase 1 - Foundation:** ✅ CURRENT
- Project structure with frontend and backend directories
- UV setup for Python dependencies
- Docker and Docker Compose configuration
- PostgreSQL container setup
- Basic FastAPI server with health check
- Basic React app with Vite
- Git branch structure (main, dev, test)
- Initial documentation

**Phase 2 - Authentication:**
- User registration and login
- JWT token generation
- OAuth integration
- Protected routes

**Phase 3 - R2 Integration:**
- Bucket creation
- Content migration
- Presigned URL endpoints

**Phase 4 - Core Features:**
- Learning components
- Progress tracking
- Quiz system

**Phase 5 - Chat Agent:**
- Cloudflare AI integration
- Chat interface

**Phase 6 - CI/CD:**
- GitHub Actions
- Automated deployments

**Phase 7 - Polish:**
- Testing, optimization, documentation

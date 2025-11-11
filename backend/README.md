# MyDutch Backend API

FastAPI backend for the MyDutch A2 Dutch Learning Application.

## Technology Stack

- **Python 3.11** - Programming language
- **UV** - Fast Python package manager
- **FastAPI** - Web framework
- **PostgreSQL 16** - Database
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **Boto3** - AWS S3/Cloudflare R2 client

## Development

See the main project documentation in `/docs/DEVELOPMENT.md` for full development instructions.

### Quick Start

```bash
# Install dependencies
uv venv
source .venv/bin/activate
uv pip install -e .

# Run development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Database Migrations

```bash
# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

## API Documentation

When running, visit:
- Interactive API docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

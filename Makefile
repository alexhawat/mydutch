.PHONY: help install dev build up down logs clean test migrate db-shell backend-shell frontend-shell

help:  ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install:  ## Install backend dependencies with UV
	cd backend && uv venv && uv pip install -r pyproject.toml

install-dev:  ## Install all dependencies including dev tools
	cd backend && uv venv && uv pip install -r pyproject.toml --extra dev
	cd frontend && npm install

dev:  ## Start development environment
	docker-compose up

build:  ## Build all Docker images
	docker-compose build

up:  ## Start all services in background
	docker-compose up -d

down:  ## Stop all services
	docker-compose down

logs:  ## Show logs from all services
	docker-compose logs -f

logs-backend:  ## Show backend logs
	docker-compose logs -f backend

logs-frontend:  ## Show frontend logs
	docker-compose logs -f frontend

logs-db:  ## Show database logs
	docker-compose logs -f db

clean:  ## Stop and remove all containers, volumes, and images
	docker-compose down -v --rmi all

test-backend:  ## Run backend tests
	cd backend && uv run pytest

test-frontend:  ## Run frontend tests
	cd frontend && npm test

migrate:  ## Run database migrations
	docker-compose exec backend alembic upgrade head

migrate-create:  ## Create a new migration (use: make migrate-create name="migration_name")
	docker-compose exec backend alembic revision --autogenerate -m "$(name)"

migrate-down:  ## Rollback one migration
	docker-compose exec backend alembic downgrade -1

db-shell:  ## Open PostgreSQL shell
	docker-compose exec db psql -U mydutch -d mydutch

backend-shell:  ## Open backend container shell
	docker-compose exec backend /bin/sh

frontend-shell:  ## Open frontend container shell
	docker-compose exec frontend /bin/sh

format-backend:  ## Format backend code with black and ruff
	cd backend && uv run black app/ && uv run ruff check --fix app/

lint-backend:  ## Lint backend code
	cd backend && uv run ruff check app/ && uv run mypy app/

lint-frontend:  ## Lint frontend code
	cd frontend && npm run lint

setup:  ## Initial project setup
	@echo "Setting up MyDutch development environment..."
	@cp backend/.env.example backend/.env 2>/dev/null || true
	@cp frontend/.env.example frontend/.env 2>/dev/null || true
	@echo "Created .env files from examples"
	@echo "Building Docker images..."
	@docker-compose build
	@echo "Starting services..."
	@docker-compose up -d
	@echo "Waiting for database..."
	@sleep 5
	@echo "Running migrations..."
	@docker-compose exec backend alembic upgrade head
	@echo ""
	@echo "✅ Setup complete!"
	@echo "Frontend: http://localhost:5173"
	@echo "Backend API: http://localhost:8000"
	@echo "API Docs: http://localhost:8000/docs"

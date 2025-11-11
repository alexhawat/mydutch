# Backend Dockerfile using UV for Python dependency management
FROM python:3.11-slim as builder

# Install UV
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml .python-version ./

# Create virtual environment and install dependencies
RUN uv venv && \
    uv pip install --no-cache -r pyproject.toml

# Production stage
FROM python:3.11-slim

# Create non-root user
RUN useradd -m -u 1000 mydutch && \
    mkdir -p /app && \
    chown -R mydutch:mydutch /app

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder --chown=mydutch:mydutch /app/.venv /app/.venv

# Copy application code
COPY --chown=mydutch:mydutch ./app ./app

# Switch to non-root user
USER mydutch

# Activate virtual environment
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app:$PYTHONPATH"

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

"""
MyDutch Backend API - Main Application
FastAPI server for authentication, R2 access, and AI chat
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

app = FastAPI(
    title="MyDutch API",
    description="Backend API for MyDutch A2 Dutch Learning Application",
    version="0.1.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "MyDutch API", "version": "0.1.0"}


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "service": "mydutch-backend",
        "version": "0.1.0"
    }


@app.get("/api/v1/status")
async def api_status():
    """API status endpoint"""
    return {
        "api_version": "v1",
        "features": {
            "authentication": "pending",
            "r2_storage": "pending",
            "chat_agent": "pending"
        }
    }

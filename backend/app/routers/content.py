"""Content router for vocabulary, grammar, and learning materials."""
import json
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.r2 import r2_service

router = APIRouter(prefix="/api/v1/content", tags=["content"])


@router.get("/vocabulary")
async def get_vocabulary(current_user: Annotated[User, Depends(get_current_user)]) -> dict:
    """Get all vocabulary data."""
    # Try to get from R2 first
    content = r2_service.get_file("vocabulary/all.json")

    if content:
        return json.loads(content.decode("utf-8"))

    # Fallback to empty data if R2 is not configured
    return {
        "message": "R2 storage not configured",
        "note": "Using local vocabulary data",
    }


@router.get("/vocabulary/{category}")
async def get_vocabulary_category(
    category: str, current_user: Annotated[User, Depends(get_current_user)]
) -> dict:
    """Get vocabulary for a specific category."""
    content = r2_service.get_file(f"vocabulary/{category}.json")

    if content:
        return json.loads(content.decode("utf-8"))

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Category '{category}' not found",
    )


@router.get("/grammar")
async def get_grammar(current_user: Annotated[User, Depends(get_current_user)]) -> dict:
    """Get all grammar lessons."""
    content = r2_service.get_file("grammar/all.json")

    if content:
        return json.loads(content.decode("utf-8"))

    return {
        "message": "R2 storage not configured",
        "note": "Using local grammar data",
    }


@router.get("/grammar/{lesson}")
async def get_grammar_lesson(
    lesson: str, current_user: Annotated[User, Depends(get_current_user)]
) -> dict:
    """Get a specific grammar lesson."""
    content = r2_service.get_file(f"grammar/{lesson}.json")

    if content:
        return json.loads(content.decode("utf-8"))

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Grammar lesson '{lesson}' not found",
    )


@router.get("/progress")
async def get_user_progress(
    current_user: Annotated[User, Depends(get_current_user)]
) -> dict:
    """Get user's learning progress from R2."""
    # Generate presigned URL for user's progress file
    key = f"progress/{current_user.id}.json"

    if r2_service.file_exists(key, bucket=r2_service.user_data_bucket):
        url = r2_service.generate_presigned_url(key)
        if url:
            return {"presigned_url": url}

    # Return default progress if file doesn't exist
    return {
        "level": 1,
        "totalXP": 0,
        "studyStreak": 0,
        "mistakes": [],
    }


@router.post("/progress")
async def update_user_progress(
    progress_data: dict,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    """Update user's learning progress in R2."""
    key = f"progress/{current_user.id}.json"

    # Upload progress to R2
    success = r2_service.upload_file(
        file_content=json.dumps(progress_data).encode("utf-8"),
        key=key,
        bucket=r2_service.user_data_bucket,
        content_type="application/json",
    )

    if success:
        return {"message": "Progress updated successfully"}

    raise HTTPException(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail="Failed to update progress",
    )


@router.get("/audio/{word}")
async def get_audio_url(
    word: str, current_user: Annotated[User, Depends(get_current_user)]
) -> dict:
    """Get presigned URL for audio file (if audio files are stored in R2)."""
    key = f"audio/{word}.mp3"

    if r2_service.file_exists(key):
        # Generate presigned URL for audio file
        url = r2_service.generate_presigned_url(
            key, bucket=r2_service.content_bucket, expiration=3600
        )
        if url:
            return {"audio_url": url}

    # Return note that audio is generated via Web Speech API
    return {
        "message": "Audio files not stored in R2",
        "note": "Using Web Speech API for text-to-speech",
    }

"""Chat router for Dutch conversation partner."""
import json
from typing import Annotated, List, Dict

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.ai import ai_service
from app.database import get_db
from app.dependencies import get_current_user
from app.models import User
from app.r2 import r2_service

router = APIRouter(prefix="/api/v1/chat", tags=["chat"])


class ChatMessage(BaseModel):
    """Chat message model."""

    message: str
    conversation_history: List[Dict[str, str]] = []


class GrammarRequest(BaseModel):
    """Grammar explanation request."""

    topic: str
    example: str = ""


@router.post("/conversation")
async def dutch_conversation(
    chat_data: ChatMessage,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    """
    Chat with Dutch conversation partner.

    The AI will respond in Dutch and provide corrections if needed.
    """
    # Get user's level from their progress (default to A2)
    user_level = "A2"  # Could be fetched from user progress

    # Get AI response
    response = await ai_service.dutch_conversation(
        user_message=chat_data.message,
        conversation_history=chat_data.conversation_history,
        user_level=user_level,
    )

    # Build full conversation history
    updated_history = chat_data.conversation_history + [
        {"role": "user", "content": chat_data.message},
        {"role": "assistant", "content": response},
    ]

    # Save conversation to R2 (async, don't wait)
    try:
        await save_conversation_to_r2(current_user.id, updated_history)
    except Exception as e:
        print(f"Error saving conversation: {e}")
        # Don't fail the request if save fails

    return {
        "response": response,
        "conversation_history": updated_history,
    }


@router.post("/grammar")
async def explain_grammar(
    grammar_request: GrammarRequest,
    current_user: Annotated[User, Depends(get_current_user)],
) -> dict:
    """Get a grammar explanation from the AI."""
    explanation = await ai_service.grammar_explanation(
        topic=grammar_request.topic,
        example=grammar_request.example if grammar_request.example else None,
    )

    return {
        "topic": grammar_request.topic,
        "explanation": explanation,
    }


@router.get("/history")
async def get_chat_history(
    current_user: Annotated[User, Depends(get_current_user)],
) -> dict:
    """Get user's chat history from R2."""
    key = f"chat/{current_user.id}/latest.json"

    # Check if history exists
    if r2_service.file_exists(key, bucket=r2_service.user_data_bucket):
        # Generate presigned URL
        url = r2_service.generate_presigned_url(key)
        if url:
            return {"presigned_url": url}

    return {"conversation_history": []}


@router.delete("/history")
async def clear_chat_history(
    current_user: Annotated[User, Depends(get_current_user)],
) -> dict:
    """Clear user's chat history."""
    key = f"chat/{current_user.id}/latest.json"

    success = r2_service.delete_file(key, bucket=r2_service.user_data_bucket)

    if success:
        return {"message": "Chat history cleared"}

    return {"message": "No chat history to clear"}


async def save_conversation_to_r2(user_id: str, conversation: List[Dict[str, str]]) -> None:
    """Save conversation history to R2."""
    key = f"chat/{user_id}/latest.json"

    r2_service.upload_file(
        file_content=json.dumps({"conversation": conversation}).encode("utf-8"),
        key=key,
        bucket=r2_service.user_data_bucket,
        content_type="application/json",
    )

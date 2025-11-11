"""Pydantic schemas for request/response validation."""
from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


# User schemas
class UserBase(BaseModel):
    """Base user schema."""

    email: EmailStr
    full_name: Optional[str] = None


class UserCreate(UserBase):
    """Schema for user registration."""

    password: str = Field(..., min_length=8, max_length=100)


class UserLogin(BaseModel):
    """Schema for user login."""

    email: EmailStr
    password: str


class UserResponse(UserBase):
    """Schema for user response."""

    id: UUID
    auth_provider: str
    is_active: bool
    is_verified: bool
    created_at: datetime
    last_login_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Token schemas
class Token(BaseModel):
    """Schema for token response."""

    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    """Schema for token refresh request."""

    refresh_token: str


class TokenData(BaseModel):
    """Schema for token data."""

    user_id: Optional[UUID] = None


# OAuth schemas
class OAuthCallback(BaseModel):
    """Schema for OAuth callback."""

    code: str
    state: Optional[str] = None


# Progress and learning schemas (for future phases)
class ProgressUpdate(BaseModel):
    """Schema for updating user progress."""

    xp_gained: int
    mistakes: Optional[list[dict]] = None


class MistakeLog(BaseModel):
    """Schema for logging mistakes."""

    word: str
    correct_answer: str
    user_answer: str
    category: str

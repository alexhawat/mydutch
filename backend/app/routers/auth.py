"""Authentication router with registration, login, and OAuth endpoints."""
import uuid
from datetime import datetime, timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
    verify_token,
)
from app.database import get_db
from app.dependencies import get_current_user
from app.models import AuthProvider, RefreshToken, User
from app.schemas import Token, TokenRefresh, UserCreate, UserLogin, UserResponse

router = APIRouter(prefix="/api/v1/auth", tags=["authentication"])


@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: Annotated[Session, Depends(get_db)]) -> Token:
    """Register a new user with email and password."""
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Create new user
    user = User(
        id=uuid.uuid4(),
        email=user_data.email,
        full_name=user_data.full_name,
        password_hash=get_password_hash(user_data.password),
        auth_provider=AuthProvider.EMAIL,
        is_active=True,
        is_verified=False,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # Create tokens
    access_token = create_access_token(user.id)
    refresh_token_str = create_refresh_token(user.id)

    # Store refresh token
    refresh_token = RefreshToken(
        id=uuid.uuid4(),
        user_id=user.id,
        token=refresh_token_str,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )
    db.add(refresh_token)
    db.commit()

    return Token(access_token=access_token, refresh_token=refresh_token_str)


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin, db: Annotated[Session, Depends(get_db)]) -> Token:
    """Login with email and password."""
    # Get user
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not user.password_hash:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # Verify password
    if not verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive",
        )

    # Update last login
    user.last_login_at = datetime.utcnow()
    db.commit()

    # Create tokens
    access_token = create_access_token(user.id)
    refresh_token_str = create_refresh_token(user.id)

    # Store refresh token
    refresh_token = RefreshToken(
        id=uuid.uuid4(),
        user_id=user.id,
        token=refresh_token_str,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )
    db.add(refresh_token)
    db.commit()

    return Token(access_token=access_token, refresh_token=refresh_token_str)


@router.post("/refresh", response_model=Token)
async def refresh_token(
    token_data: TokenRefresh, db: Annotated[Session, Depends(get_db)]
) -> Token:
    """Refresh access token using refresh token."""
    # Verify refresh token
    user_id = verify_token(token_data.refresh_token, token_type="refresh")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
        )

    # Check if refresh token exists and is not revoked
    refresh_token = (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token == token_data.refresh_token,
            RefreshToken.is_revoked == False,  # noqa: E712
        )
        .first()
    )

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token not found or revoked",
        )

    # Check if refresh token is expired
    if refresh_token.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token expired",
        )

    # Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )

    # Create new tokens
    access_token = create_access_token(user.id)
    new_refresh_token_str = create_refresh_token(user.id)

    # Revoke old refresh token
    refresh_token.is_revoked = True

    # Store new refresh token
    new_refresh_token = RefreshToken(
        id=uuid.uuid4(),
        user_id=user.id,
        token=new_refresh_token_str,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )
    db.add(new_refresh_token)
    db.commit()

    return Token(access_token=access_token, refresh_token=new_refresh_token_str)


@router.post("/logout")
async def logout(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[Session, Depends(get_db)],
) -> dict:
    """Logout current user by revoking all refresh tokens."""
    # Revoke all refresh tokens for this user
    db.query(RefreshToken).filter(
        RefreshToken.user_id == current_user.id, RefreshToken.is_revoked == False  # noqa: E712
    ).update({"is_revoked": True})
    db.commit()

    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """Get current user information."""
    return current_user


# OAuth endpoints will be implemented with actual OAuth flows
@router.get("/google/login")
async def google_login() -> dict:
    """Initiate Google OAuth login flow."""
    # This will be implemented with actual Google OAuth URL
    return {
        "message": "Google OAuth not yet implemented",
        "note": "Will redirect to Google OAuth consent screen",
    }


@router.get("/google/callback")
async def google_callback(code: str, state: str = "") -> dict:
    """Handle Google OAuth callback."""
    # This will be implemented to exchange code for tokens
    return {
        "message": "Google OAuth callback not yet implemented",
        "code": code,
        "state": state,
    }


@router.get("/github/login")
async def github_login() -> dict:
    """Initiate GitHub OAuth login flow."""
    # This will be implemented with actual GitHub OAuth URL
    return {
        "message": "GitHub OAuth not yet implemented",
        "note": "Will redirect to GitHub OAuth consent screen",
    }


@router.get("/github/callback")
async def github_callback(code: str, state: str = "") -> dict:
    """Handle GitHub OAuth callback."""
    # This will be implemented to exchange code for tokens
    return {
        "message": "GitHub OAuth callback not yet implemented",
        "code": code,
        "state": state,
    }

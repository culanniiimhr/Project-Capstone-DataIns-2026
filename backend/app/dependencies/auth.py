from typing import Any, Dict

from fastapi import Depends, Header, HTTPException, status

from app.core.security import get_supabase_client


async def get_current_user(
    authorization: str = Header(default=None),
) -> Dict[str, Any]:
    """
    Validate Supabase JWT and return authenticated user.
    """

    if authorization is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is missing",
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header",
        )

    token = authorization.replace("Bearer ", "").strip()

    if token == "":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is empty",
        )

    supabase = get_supabase_client()

    try:
        # Validate JWT ke Supabase
        response = supabase.auth.get_user(token)

        if response is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )

        user = response.user

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )

        # Ambil role dari app_metadata terlebih dahulu
        role = (
            user.app_metadata.get("role")
            if user.app_metadata
            else None
        )

        # Fallback ke user_metadata
        if role is None and user.user_metadata:
            role = user.user_metadata.get("role")

        return {
            "id": user.id,
            "email": user.email,
            "role": role,
            "app_metadata": user.app_metadata,
            "user_metadata": user.user_metadata,
            "raw_user": user,
            "access_token": token,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(exc)}",
        )
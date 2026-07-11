from typing import Any, Dict, Optional

import httpx
from fastapi import APIRouter, HTTPException, status

from app.core.config import settings
from app.schemas.auth import AuthUser, LoginRequest, LoginResponse

router = APIRouter()

VALID_ROLES = {"ROLE_ADMIN", "ROLE_PIMPINAN", "ROLE_AKADEMIK", "ROLE_SDM", "ROLE_IKU"}
EMAIL_ROLE_MAP = {
    "yusuf@webmail.uad.ac.id": "ROLE_ADMIN",
    "gunawan@webmail.uad.ac.id": "ROLE_PIMPINAN",
    "rahmat@webmail.uad.ac.id": "ROLE_AKADEMIK",
    "ika@webmail.uad.ac.id": "ROLE_SDM",
    "eva@webmail.uad.ac.id": "ROLE_IKU",
}


def _normalize_role(role: Optional[str]) -> Optional[str]:
    if not role:
        return None

    normalized = str(role).strip().upper()
    if normalized in VALID_ROLES:
        return normalized

    return None


def _extract_role(user_data: Dict[str, Any]) -> str:
    candidates: list[str] = []

    for container in (user_data, user_data.get("app_metadata") or {}, user_data.get("user_metadata") or {}):
        if isinstance(container, dict):
            role_value = container.get("role")
            if role_value:
                candidates.append(str(role_value))

            roles_value = container.get("roles")
            if isinstance(roles_value, list):
                candidates.extend([str(item) for item in roles_value])
            elif isinstance(roles_value, str) and roles_value:
                candidates.append(roles_value)

    for candidate in candidates:
        normalized_role = _normalize_role(candidate)
        if normalized_role:
            return normalized_role

    email = (user_data.get("email") or "").strip().lower()
    if email in EMAIL_ROLE_MAP:
        return EMAIL_ROLE_MAP[email]

    return "ROLE_AKADEMIK"


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest) -> LoginResponse:
    # STEP 11 debug logs (temporary)
    print("[Auth/Login] Incoming email:", payload.email)
    print("[Auth/Login] Incoming password length:", len(payload.password or ""))
    print("[Auth/Login] Supabase URL present:", bool(settings.SUPABASE_URL))
    print("[Auth/Login] Supabase ANON_KEY present:", bool(settings.SUPABASE_ANON_KEY))

    if not settings.SUPABASE_URL or not settings.SUPABASE_ANON_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase Auth configuration is missing",
        )

    async with httpx.AsyncClient(timeout=10.0) as client:
        req_url = f"{settings.SUPABASE_URL}/auth/v1/token?grant_type=password"
        print("[Auth/Login] Supabase request URL:", req_url)

        # STEP 2 requirement: Print request sent to Supabase before sending it.
        print("[Auth/Login] Supabase request JSON payload:", {"email": payload.email, "password": "[REDACTED]"})
        response = await client.post(
            req_url,
            headers={
                "apikey": settings.SUPABASE_ANON_KEY,
                "Content-Type": "application/json",
            },
            json={
                "email": payload.email,
                "password": payload.password,
            },
        )

    # STEP 5 requirement: Print COMPLETE response from Supabase.
    print("[Auth/Login] Supabase response status_code:", response.status_code)
    print("[Auth/Login] Supabase response.text:", response.text)
    try:
        print("[Auth/Login] Supabase response.json():", response.json())
    except Exception as e:
        print("[Auth/Login] Supabase response.json() parse error:", str(e))

    # STEP 6 requirement: If Supabase returns 400/401/422, print exact reason and do not replace with generic.
    if response.status_code != status.HTTP_200_OK:
        detail: str = ""
        try:
            data = response.json()
            detail = (
                data.get("error_description")
                or data.get("msg")
                or data.get("error")
                or response.text
            )
        except Exception:
            detail = response.text

        # Keep the status code mapping sensible
        http_status = status.HTTP_401_UNAUTHORIZED
        if response.status_code in (400, 422):
            http_status = status.HTTP_422_UNPROCESSABLE_ENTITY
        elif response.status_code == 401:
            http_status = status.HTTP_401_UNAUTHORIZED

        raise HTTPException(status_code=http_status, detail=detail)

    data = response.json()
    user_data = data.get("user") or {}

    role = _extract_role(user_data)

    access_token = data.get("access_token", "")
    refresh_token = data.get("refresh_token", "")
    token_type = data.get("token_type", "bearer")

    # STEP 11 requirement: Extracted role + Generated LoginResponse
    print("[Auth/Login] Extracted role:", role)

    login_resp = LoginResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type=token_type,
        user=AuthUser(
            id=str(user_data.get("id", "")),
            email=str(user_data.get("email", payload.email)),
            role=role,
        ),
    )

    print("[Auth/Login] Generated LoginResponse:", login_resp.model_dump())

    return login_resp


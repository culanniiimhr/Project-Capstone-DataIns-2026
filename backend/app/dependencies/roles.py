from fastapi import Depends, HTTPException

from app.dependencies.auth import get_current_user

VALID_ROLES = {
    "ROLE_ADMIN",
    "ROLE_PIMPINAN",
    "ROLE_AKADEMIK",
    "ROLE_SDM",
    "ROLE_IKU",
}


def require_roles(*roles):

    async def checker(user=Depends(get_current_user)):

        role = (
            user.get("app_metadata", {})
            .get("role")
        )

        if role == "ROLE_ADMIN":
            return user

        if role not in roles:
            raise HTTPException(
                status_code=403,
                detail="Forbidden",
            )

        return user

    return checker
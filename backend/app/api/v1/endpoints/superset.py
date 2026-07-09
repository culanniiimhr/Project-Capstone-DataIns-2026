from fastapi import APIRouter, HTTPException, Query
import requests
from app.core.config import settings  # 👈 Import konfigurasi global

router = APIRouter()

@router.get("/guest-token")
def get_superset_guest_token(dashboard_id: str = Query(...)):
    try:
        # 1. Login ke Superset menggunakan API Security resmi (Ambil dari .env via settings)
        login_data = {
            "username": settings.SUPERSET_ADMIN_USER,
            "password": settings.SUPERSET_ADMIN_PASSWORD,
            "provider": "db",
            "refresh": True
        }

        login_res = requests.post(
            f"{settings.SUPERSET_URL}/api/v1/security/login",
            json=login_data,
            timeout=10
        )

        if login_res.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Gagal login ke Superset Mitra: {login_res.status_code} - {login_res.text}"
            )

        access_token = login_res.json().get("access_token")

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # 2. Minta Guest Token sesuai dengan dashboard_id yang dikirim oleh Front-End
        guest_token_data = {
            "user": {
                "username": "guest_user",
                "first_name": "Guest",
                "last_name": "User"
            },
            "resources": [
                {
                    "type": "dashboard",
                    "id": dashboard_id
                }
            ],
            "rls": [] 
        }

        token_res = requests.post(
            f"{settings.SUPERSET_URL}/api/v1/security/guest_token/",  # Menggunakan trailing slash '/'
            json=guest_token_data,
            headers=headers,
            timeout=10
        )

        if token_res.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Gagal generate guest token dari Mitra: {token_res.status_code} - {token_res.text}"
            )

        return {"token": token_res.json().get("token")}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

SUPERSET_URL = "http://datains_superset:8088"
SUPERSET_USERNAME = "admin"
SUPERSET_PASSWORD = "admin123"

DASHBOARD_UUID = "39e5c66f-4870-419b-adfe-20ad48c3ef1b"


@router.get("/guest-token")
def get_superset_guest_token():
    try:
        # 1. Login ke Superset
        login_data = {
            "username": SUPERSET_USERNAME,
            "password": SUPERSET_PASSWORD,
            "provider": "db",
            "refresh": True
        }

        login_res = requests.post(
            f"{SUPERSET_URL}/api/v1/security/login",
            json=login_data,
            timeout=10
        )

        if login_res.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Gagal login ke Superset: {login_res.status_code} - {login_res.text}"
            )

        access_token = login_res.json().get("access_token")

        if not access_token:
            raise HTTPException(
                status_code=500,
                detail="Access token tidak ditemukan dari response Superset"
            )

        # 2. Generate guest token
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        guest_token_data = {
            "user": {
                "username": "guest_user",
                "first_name": "Guest",
                "last_name": "User"
            },
            "resources": [
                {
                    "type": "dashboard",
                    "id": DASHBOARD_UUID
                }
            ],
            "rls": []
        }

        token_res = requests.post(
            f"{SUPERSET_URL}/api/v1/security/guest_token",
            json=guest_token_data,
            headers=headers,
            timeout=10
        )

        if token_res.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"Gagal generate guest token dari Superset: {token_res.status_code} - {token_res.text}"
            )

        token = token_res.json().get("token")

        if not token:
            raise HTTPException(
                status_code=500,
                detail=f"Token tidak ditemukan dari response Superset: {token_res.text}"
            )

        return {"token": token}

    except HTTPException:
        raise

    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=500,
            detail=f"Tidak bisa konek ke Superset: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected backend error: {str(e)}"
        )
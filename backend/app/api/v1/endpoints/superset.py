from fastapi import APIRouter, HTTPException, Query
import requests

router = APIRouter()

SUPERSET_URL = "http://datains_superset:8088"
SUPERSET_USERNAME = "admin"
SUPERSET_PASSWORD = "admin123"


@router.get("/guest-token")
def get_superset_guest_token(dashboard_id: str = Query(...)):
    try:
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
                    "id": dashboard_id
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
                detail=f"Gagal generate guest token: {token_res.status_code} - {token_res.text}"
            )

        return {"token": token_res.json().get("token")}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
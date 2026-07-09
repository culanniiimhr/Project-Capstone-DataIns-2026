from fastapi import APIRouter, HTTPException, Query
import requests

router = APIRouter()

SUPERSET_URL = "http://datains_superset:8088"
SUPERSET_USERNAME = "admin"
SUPERSET_PASSWORD = "admin123"


@router.get("/guest-token")
def get_superset_guest_token(dashboard_id: str = Query(...)):
    try:
        print("Dashboard:", dashboard_id)

        login_data = {
            "username": SUPERSET_USERNAME,
            "password": SUPERSET_PASSWORD,
            "provider": "db",
            "refresh": True
        }

        print("Login ke Superset...")

        login_res = requests.post(
            f"{SUPERSET_URL}/api/v1/security/login",
            json=login_data,
            timeout=10
        )

        print("Login status:", login_res.status_code)

        access_token = login_res.json()["access_token"]

        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        print("Generate guest token...")

        token_res = requests.post(
            f"{SUPERSET_URL}/api/v1/security/guest_token",
            json={
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
            },
            headers=headers,
            timeout=10
        )

        print("Guest token status:", token_res.status_code)

        return {"token": token_res.json()["token"]}

    except HTTPException:
        raise

    except Exception as e:
        print("ERROR:", repr(e))
        raise HTTPException(500, str(e))
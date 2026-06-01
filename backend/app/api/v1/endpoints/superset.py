from fastapi import APIRouter, HTTPException
import requests

router = APIRouter()

SUPERSET_URL = "http://datains_superset:8088" 
SUPERSET_USERNAME = "admin"
SUPERSET_PASSWORD = "admin123" 

# ID asli 
DASHBOARD_UUID = "363c7032-3690-4c02-bd0d-4be7e43a425d"

@router.get("/guest-token")
def get_superset_guest_token():
    try:
        # 1. Login ke internal Superset
        login_data = {
            "username": SUPERSET_USERNAME,
            "password": SUPERSET_PASSWORD,
            "provider": "db",
            "refresh": True
        }
        login_res = requests.post(f"{SUPERSET_URL}/api/v1/auth/login", json=login_data)
        
        if login_res.status_code != 200:
            raise HTTPException(status_code=500, detail="Backend gagal login ke internal Superset")
            
        access_token = login_res.json()["access_token"]
        
        # 2. Minta Guest Token pake access_token admin
        headers = {"Authorization": f"Bearer {access_token}"}
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
            headers=headers
        )
        
        if token_res.status_code != 200:
            raise HTTPException(status_code=500, detail="Gagal generate guest token dari Superset")
            
        return {"token": token_res.json()["token"]}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
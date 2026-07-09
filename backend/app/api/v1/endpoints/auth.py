from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

# 1. Skema Data untuk Request Login dari Frontend
class LoginRequest(BaseModel):
    email: str
    password: str

# 2. Skema Data untuk Response (Apa yang dikirim balik ke Frontend)
class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    # Hardcode akun sementara buat ngetes / buat anak FE besok pagi
    # Nanti ini bisa lu hubungin ke database pas udah seger
    if payload.email == "nama@uad.ac.id" and payload.password == "passwordnyo":
        return {
            "access_token": "mocked_jwt_token_akbar_12345",
            "token_type": "bearer",
            "user": {
                "email": payload.email,
                "role": "pimpinan" # Biar FE bisa ngetes routing dashboard pimpinan
            }
        }
    
    # Kalau email/password salah, lempar error 401 Unauthorized
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Email atau password salah. Silakan coba lagi."
    )
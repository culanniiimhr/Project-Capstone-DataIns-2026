from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.session import get_warehouse_db
from app.models.user import User

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


@router.post("/login", response_model=LoginResponse)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_warehouse_db)
):
    print("===== LOGIN MASUK =====")
    print(payload.email)
    print(payload.password)
    
    print("===================================")
    print("Email input :", payload.email)

    user = (
        db.query(User)
        .filter(User.email == payload.email)
        .first()
    )

    print("User :", user)

    if user:
        print("Password DB :", user.password)
        print("Password Input :", payload.password)

    print("===================================")

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Email tidak ditemukan."
        )

    if user.password != payload.password:
        raise HTTPException(
            status_code=401,
            detail="Password salah."
        )

    return {
        "access_token": "dummy_token",
        "token_type": "bearer",
        "user": {
            "email": user.email,
            "nama": user.nama,
            "role": user.role
        }
    }
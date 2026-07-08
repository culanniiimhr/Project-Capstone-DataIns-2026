from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict


# Dummy User
USERS = [
    {
        "email": "Yusuf@uad.ac.id",
        "password": "AdminSys#26",
        "role": "ROLE_ADMIN",
        "nama": "Yusuf Maulana"
    },
    {
        "email": "Gunawan@uad.ac.id",
        "password": "Rektor#2026",
        "role": "ROLE_PIMPINAN",
        "nama": "Prof. Gunawan Sutrisno"
    },
    {
        "email": "Rahmat@uad.ac.id",
        "password": "Akademik#26",
        "role": "ROLE_AKADEMIK",
        "nama": "Rahmat Hidayat"
    },
    {
        "email": "Ika@uad.ac.id",
        "password": "SdmDosen#26",
        "role": "ROLE_SDM",
        "nama": "Ika Kartika"
    },
    {
        "email": "Eva@uad.ac.id",
        "password": "UjmUAD#26",
        "role": "ROLE_IKU",
        "nama": "Dr. Eva Aminah"
    }
]


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):

    for user in USERS:

        if (
            user["email"].lower() == payload.email.lower()
            and user["password"] == payload.password
        ):

            return {
                "access_token": "dummy-token-123456",
                "token_type": "bearer",
                "user": {
                    "email": user["email"],
                    "nama": user["nama"],
                    "role": user["role"]
                }
            }

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Email atau password salah"
    )
from fastapi import APIRouter
# 1. Kita buka import auth di sini (auth ditambahin di paling kanan)
from app.api.v1.endpoints import akademik, superset, auth

api_router = APIRouter()

# Register endpoint akademik yang udah ada
api_router.include_router(akademik.router, prefix="/akademik", tags=["Operasional Akademik"])

# Register endpoint superset baru buatan lu!
api_router.include_router(superset.router, prefix="/superset", tags=["superset"])

# 2. KITA AKTIFKAN ROUTER AUTH-NYA (Comment-nya dihapus!)
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])

# Baris di bawah ini tetap di-comment dulu sampai file lainnya dibuat sama temen lu
# api_router.include_router(mahasiswa.router,  prefix="/mahasiswa",  tags=["Mahasiswa"])
# api_router.include_router(dosen.router,      prefix="/dosen",      tags=["Dosen SDM"])
# api_router.include_router(dashboard.router,  prefix="/dashboard",  tags=["Dashboard Pimpinan"])
# api_router.include_router(iku.router,        prefix="/iku",        tags=["IKU"])
# api_router.include_router(chatbot.router,    prefix="/chatbot",    tags=["AI Chatbot"])
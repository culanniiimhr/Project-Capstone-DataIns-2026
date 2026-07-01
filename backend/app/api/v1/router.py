from fastapi import APIRouter
from app.api.v1.endpoints import akademik, superset, auth, summarydashboardutama # 1. Tambahkan import di sini

api_router = APIRouter()

# Register endpoint akademik yang udah ada
api_router.include_router(akademik.router, prefix="/akademik", tags=["Operasional Akademik"])

# Register endpoint superset baru
api_router.include_router(superset.router, prefix="/superset", tags=["superset"])

# KITA AKTIFKAN ROUTER AUTH-NYA
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])

# 2. DAFTARKAN ROUTER INSIGHT DASHBOARD UTAMA KAMU DI SINI
api_router.include_router(summarydashboardutama.router, prefix="/dashboard-utama", tags=["Dashboard Utama"])

# Baris di bawah ini tetap di-comment dulu sampai file lainnya dibuat sama temen lu
# api_router.include_router(mahasiswa.router,  prefix="/mahasiswa",  tags=["Mahasiswa"])
# api_router.include_router(dosen.router,      prefix="/dosen",      tags=["Dosen SDM"])
# api_router.include_router(dashboard.router,  prefix="/dashboard",  tags=["Dashboard Pimpinan"])
# api_router.include_router(iku.router,        prefix="/iku",        tags=["IKU"])
# api_router.include_router(chatbot.router,    prefix="/chatbot",    tags=["AI Chatbot"])
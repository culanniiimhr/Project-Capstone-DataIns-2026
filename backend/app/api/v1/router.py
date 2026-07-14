from fastapi import APIRouter

# Import semua endpoint yang aktif
from app.api.v1.endpoints import (
    akademik,
    superset,
    summarydashboardutama,
    auth,
)

api_router = APIRouter()

# Register endpoint Akademik
api_router.include_router(
    akademik.router,
    prefix="/akademik",
    tags=["Operasional Akademik"]
)

# Register endpoint Superset
api_router.include_router(
    superset.router,
    prefix="/superset",
    tags=["Superset"]
)

# Register endpoint Dashboard Utama
api_router.include_router(
    summarydashboardutama.router,
    prefix="/dashboard-utama",
    tags=["Dashboard Utama Superset"]
)

# Register endpoint Auth
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"]
)

# Endpoint di bawah ini masih dinonaktifkan
# Aktifkan jika file endpoint-nya sudah tersedia

# api_router.include_router(mahasiswa.router, prefix="/mahasiswa", tags=["Mahasiswa"])
# api_router.include_router(dosen.router, prefix="/dosen", tags=["Dosen SDM"])
# api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard Pimpinan"])
# api_router.include_router(iku.router, prefix="/iku", tags=["IKU"])
# api_router.include_router(chatbot.router, prefix="/chatbot", tags=["AI Chatbot"])

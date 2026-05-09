from fastapi import APIRouter
# Kita cuma import yang filenya benar-benar ada di folder endpoints
from app.api.v1.endpoints import akademik

api_router = APIRouter()

# Register yang ada saja dulu supaya backend bisa UP
api_router.include_router(akademik.router, prefix="/akademik", tags=["Operasional Akademik"])

# Baris di bawah ini di-comment (dimatikan) dulu. 
# Nanti kalau file dari teman kamu sudah ada, tinggal buka comment-nya.

# api_router.include_router(auth.router,       prefix="/auth",       tags=["Auth"])
# api_router.include_router(mahasiswa.router,  prefix="/mahasiswa",  tags=["Mahasiswa"])
# api_router.include_router(dosen.router,      prefix="/dosen",      tags=["Dosen SDM"])
# api_router.include_router(dashboard.router,  prefix="/dashboard",  tags=["Dashboard Pimpinan"])
# api_router.include_router(iku.router,        prefix="/iku",        tags=["IKU"])
# api_router.include_router(chatbot.router,    prefix="/chatbot",    tags=["AI Chatbot"])
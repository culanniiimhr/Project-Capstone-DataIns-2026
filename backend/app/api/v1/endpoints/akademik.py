from fastapi import APIRouter

# Inisialisasi variabel router biar dipahami oleh router.py
router = APIRouter()

@router.get("/")
async def test_akademik():
    return {"status": "success", "message": "Backend Akademik sudah jalan!"}
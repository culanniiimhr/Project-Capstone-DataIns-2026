# backend/app/api/v1/endpoints/summarydashboardutama.py
from fastapi import APIRouter, HTTPException
from app.services.dashboard_kpi import calculate_dashboard_insights

router = APIRouter()

@router.get("/insights")
def get_dashboard_insights():
    try:
        # Panggil fungsi hitung-hitungan Pandas dari file service
        res = calculate_dashboard_insights()
        
        # Jika service mengembalikan error (misal koneksi DB gagal)
        if "error" in res:
            raise HTTPException(status_code=500, detail=res["error"])
            
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
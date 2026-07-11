import os
from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text
# 👇 Baris ini ditambahkan biar endpoint /insights bawaan server lama gak eror
from app.services.dashboard_kpi import calculate_dashboard_insights

router = APIRouter()

# 1. Ambil URL database langsung dari environment variable (.env)
DATABASE_URL = os.getenv("SUPERSET_DATABASE_URI")

# 2. Buat Engine Koneksi ke Supabase Cloud
if not DATABASE_URL or not DATABASE_URL.startswith("postgresql://"):
    raise RuntimeError("DATABASE_URL (SUPERSET_DATABASE_URI) tidak terkonfigurasi dengan benar di .env!")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# ─── ENDPOINT 1: KODE PUNYA LU (KPI SUMMARY) ───
@router.get("/kpi-summary")
def get_kpi_summary():
    try:
        # Buka koneksi langsung ke Supabase Cloud
        with engine.connect() as connection:
            # 1. Ambil agregasi utama dari view_dashboard_utama
            query_dashboard = text("""
                SELECT 
                    COALESCE(SUM(total_mahasiswa), 0) as total_mhs,
                    COALESCE(ROUND(AVG(rata_rata_ipk)::numeric, 2), 0.0) as avg_ipk,
                    COALESCE(ROUND(AVG(persentase_kelulusan)::numeric, 1), 0.0) as pct_kelulusan
                FROM view_dashboard_utama
            """)
            res_dashboard = connection.execute(query_dashboard).fetchone()

            # 2. Ambil total Dosen dari view_sdm_profil_dosen
            query_dosen = text("""
                SELECT COUNT(DISTINCT nidn) FROM view_sdm_profil_dosen
            """)
            res_dosen = connection.execute(query_dosen).scalar()

            # 3. Ambil capaian IKU terbaru dari view_dashboard_iku
            query_iku = text("""
                SELECT COALESCE(ROUND(AVG(capaian_institusi)::numeric, 1), 0.0) 
                FROM view_dashboard_iku
            """)
            res_iku = connection.execute(query_iku).scalar()

        # 4. Susun respons JSON murni dari database (jika kosong, default ke 0 atau 0.0)
        return {
            "status": "success",
            "data": {
                "total_mahasiswa": int(res_dashboard[0]) if res_dashboard else 0,
                "avg_ipk": float(res_dashboard[1]) if res_dashboard else 0.0,
                "total_dosen": int(res_dosen) if res_dosen else 0,
                "tingkat_kelulusan": float(res_dashboard[2]) if res_dashboard else 0.0,
                "capaian_iku": float(res_iku) if res_iku else 0.0
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Gagal memuat data real-time dari Data Warehouse: {str(e)}"
        )

# ─── ENDPOINT 2: KODE BAWAAN SERVER LAMA (INSIGHTS) JANGAN DIHAPUS ───
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


# ─── ENDPOINT 3: KHUSUS DASHBOARD AKADEMIK (DINAMIS 100%) ───
@router.get("/academic-summary")
def get_academic_summary():
    try:
        with engine.connect() as connection:
            # 1. Ambil Rata-rata IPK, Kehadiran, dan Total Mahasiswa Aktif dari view_dashboard_utama
            query_utama = text("""
                SELECT 
                    COALESCE(ROUND(AVG(rata_rata_ipk)::numeric, 2), 0.0) as avg_ipk,
                    COALESCE(ROUND(AVG(rata_rata_kehadiran)::numeric, 1), 0.0) as avg_hadir,
                    COALESCE(SUM(total_mahasiswa), 0) as total_mhs_aktif
                FROM view_dashboard_utama
            """)
            res_utama = connection.execute(query_utama).fetchone()

            # 2. Ambil Rata-rata SKS yang diambil mahasiswa dari view_beban_studi_mahasiswa
            query_sks = text("""
                SELECT 
                    COALESCE(ROUND(AVG(total_sks_diambil)::numeric, 1), 0.0) as avg_sks
                FROM view_beban_studi_mahasiswa
            """)
            res_sks = connection.execute(query_sks).scalar()

        # 3. Lempar datanya dalam bentuk JSON
        return {
            "status": "success",
            "data": {
                "rata_rata_ipk": float(res_utama[0]) if res_utama else 0.0,
                "kehadiran_mahasiswa": float(res_utama[1]) if res_utama else 0.0,
                "mahasiswa_aktif": int(res_utama[2]) if res_utama else 0,
                "rata_rata_sks": float(res_sks) if res_sks else 0.0
            }
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Gagal memuat data akademik dari Data Warehouse: {str(e)}"
        )
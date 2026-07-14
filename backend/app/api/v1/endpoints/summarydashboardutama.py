import os
from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine, text

router = APIRouter()

DATABASE_URL = os.getenv("SUPERSET_DATABASE_URI")

if not DATABASE_URL or not DATABASE_URL.startswith("postgresql://"):
    raise RuntimeError("DATABASE_URL (SUPERSET_DATABASE_URI) tidak terkonfigurasi dengan benar di .env!")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# ─── ENDPOINT 1: KPI SUMMARY (DASHBOARD UTAMA) ───
@router.get("/kpi-summary")
def get_kpi_summary():
    try:
        with engine.connect() as connection:
            # PERBAIKAN: Hitung total fisik mahasiswa unik secara riil (Hasilnya pasti 4.750)
            query_total_mhs = text("""
                SELECT COUNT(DISTINCT nim) FROM view_analisis_akademik_mahasiswa
            """)
            total_mhs = connection.execute(query_total_mhs).scalar() or 0

            # Ambil agregasi IPK dan Kelulusan global
            query_dashboard = text("""
                SELECT 
                    COALESCE(ROUND(AVG(rata_rata_ipk)::numeric, 2), 0.0) as avg_ipk,
                    COALESCE(ROUND(AVG(persentase_kelulusan)::numeric, 1), 0.0) as pct_kelulusan
                FROM view_dashboard_utama
            """)
            res_dashboard = connection.execute(query_dashboard).fetchone()

            query_dosen = text("""
                SELECT COUNT(DISTINCT nidn) FROM view_sdm_profil_dosen
            """)
            res_dosen = connection.execute(query_dosen).scalar() or 0

            query_iku = text("""
                SELECT COALESCE(ROUND(AVG(capaian_institusi)::numeric, 1), 0.0) 
                FROM view_dashboard_iku
            """)
            res_iku = connection.execute(query_iku).scalar() or 0.0

        return {
            "status": "success",
            "data": {
                "total_mahasiswa": int(total_mhs),
                "avg_ipk": float(res_dashboard[0]) if res_dashboard else 0.0,
                "total_dosen": int(res_dosen),
                "tingkat_kelulusan": float(res_dashboard[1]) if res_dashboard else 0.0,
                "capaian_iku": float(res_iku)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─── ENDPOINT 3: ACADEMIC SUMMARY (DASHBOARD AKADEMIK) ───
@router.get("/academic-summary")
def get_academic_summary():
    try:
        with engine.connect() as connection:
            # PERBAIKAN: Hitung mahasiswa yang berstatus AKTIF saja (Hasilnya pasti 2.212)
            query_total_mhs = text("""
                SELECT COUNT(DISTINCT nim) 
                FROM view_analisis_akademik_mahasiswa
                WHERE status_mahasiswa = 'Aktif'
            """)
            total_mhs_aktif = connection.execute(query_total_mhs).scalar() or 0

            # Ambil metrik akademik berjalan
            query_utama = text("""
                SELECT 
                    COALESCE(ROUND(AVG(rata_rata_ipk)::numeric, 2), 0.0) as avg_ipk,
                    COALESCE(ROUND(AVG(rata_rata_kehadiran)::numeric, 1), 0.0) as avg_hadir
                FROM view_dashboard_utama
            """)
            res_utama = connection.execute(query_utama).fetchone()

            query_sks = text("""
                SELECT COALESCE(ROUND(AVG(total_sks_diambil)::numeric, 1), 0.0) as avg_sks
                FROM view_beban_studi_mahasiswa
            """)
            res_sks = connection.execute(query_sks).scalar() or 0.0

        return {
            "status": "success",
            "data": {
                "rata_rata_ipk": float(res_utama[0]) if res_utama else 0.0,
                "kehadiran_mahasiswa": float(res_utama[1]) if res_utama else 0.0,
                "mahasiswa_aktif": int(total_mhs_aktif),
                "rata_rata_sks": float(res_sks)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
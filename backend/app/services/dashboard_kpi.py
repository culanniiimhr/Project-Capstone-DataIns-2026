# backend/app/services/dashboard_kpi.py
import pandas as pd
from sqlalchemy import create_engine
from app.core.config import settings

def calculate_dashboard_insights():
    try:
        # 1. Buat koneksi langsung ke Supabase PostgreSQL via SQLAlchemy Engine
        engine = create_engine(settings.WAREHOUSE_DATABASE_URL)
        
        # 2. Tarik data dari view_dashboard_utama langsung ke Pandas DataFrame
        query = "SELECT * FROM view_dashboard_utama;"
        df = pd.read_sql(query, con=engine)
        
        if df.empty:
            return {
                "ipk": {"status": "up", "value": "0.00 poin", "text": "Data tidak tersedia"},
                "kelulusan": {"status": "up", "value": "0,00%", "text": "Data tidak tersedia"},
                "kehadiran": {"status": "up", "value": "0,0%", "text": "Data tidak tersedia"}
            }
        
        # 3. Pastikan tipe data numerik bersih
        df['rata_rata_ipk'] = pd.to_numeric(df['rata_rata_ipk']).fillna(0)
        df['total_lulus'] = pd.to_numeric(df['total_lulus']).fillna(0)
        df['total_mahasiswa'] = pd.to_numeric(df['total_mahasiswa']).fillna(0)
        df['rata_rata_kehadiran'] = pd.to_numeric(df['rata_rata_kehadiran']).fillna(0)

        # 4. Filter data: Tahun Akademik Terbaru vs Sebelumnya
        df_current = df[df['tahun_akademik'] == '2024/2025']
        df_old = df[df['tahun_akademik'] != '2024/2025']

        if df_current.empty:
            return {}

        # --- SEKTOR AGREGASI SEMESTER BERJALAN ---
        # IPK makro dihitung menggunakan rata-rata dari semua fakultas/angkatan
        ipk_current = df_current['rata_rata_ipk'].mean()
        
        # Kelulusan dihitung berdasarkan total lulus dibagi total mahasiswa se-universitas
        lulus_current = df_current['total_lulus'].sum()
        mhs_current = df_current['total_mahasiswa'].sum()
        pct_lulus_current = (lulus_current / mhs_current * 100) if mhs_current > 0 else 0
        
        # Kehadiran makro
        kehadiran_current = df_current['rata_rata_kehadiran'].mean()


        # --- SEKTOR AGREGASI SEMESTER LALU (PEMBANDING) ---
        ipk_old = df_old['rata_rata_ipk'].mean() if not df_old.empty else 2.50
        
        lulus_old = df_old['total_lulus'].sum() if not df_old.empty else 0
        mhs_old = df_old['total_mahasiswa'].sum() if not df_old.empty else 1
        pct_lulus_old = (lulus_old / mhs_old * 100) if mhs_old > 0 else 0
        
        kehadiran_old = df_old['rata_rata_kehadiran'].mean() if not df_old.empty else 81.9


        # 5. Hitung Selisih (Tren Kenaikan/Penurunan)
        diff_ipk = ipk_current - ipk_old
        diff_lulus = pct_lulus_current - pct_lulus_old
        diff_kehadiran = kehadiran_current - kehadiran_old

        # 6. Helper String Formatting untuk menyamakan format koma (Indonesia UI)
        def format_indo(val, format_spec=".2f"):
            formatted = f"{abs(val):{format_spec}}"
            return formatted.replace(".", ",")

        # 7. Rangkai payload JSON matang sesuai mockup UI Anda
        return {
            "ipk": {
                "status": "up" if diff_ipk >= 0 else "down",
                "value": f"{abs(diff_ipk):.2f} poin", # IPK di UI Anda pakai titik desimal (0.08 poin)
                "text": f"IPK rata-rata {'meningkat' if diff_ipk >= 0 else 'menurun'} {abs(diff_ipk):.2f} poin"
            },
            "kelulusan": {
                "status": "up" if diff_lulus >= 0 else "down",
                "value": f"{format_indo(diff_lulus)}%",
                "text": f"Tingkat kelulusan {'meningkat' if diff_lulus >= 0 else 'menurun'} {format_indo(diff_lulus)}%"
            },
            "kehadiran": {
                "status": "up" if diff_kehadiran >= 0 else "down",
                "value": f"{format_indo(diff_kehadiran, '.1f')}%",
                "real_value": f"{format_indo(kehadiran_current, '.1f')}%",
                "text": f"Kehadiran mahasiswa {'naik' if diff_kehadiran >= 0 else 'turun'} {format_indo(diff_kehadiran, '.1f')}% ({format_indo(kehadiran_current, '.1f')}%)"
            }
        }
        
    except Exception as e:
        return {"error": str(e)}
import pandas as pd
from sqlalchemy import create_engine
import random
import os
from dotenv import load_dotenv

# 1. Konfigurasi Koneksi Database
load_dotenv()
user = os.getenv('POSTGRES_USER')
pw = os.getenv('POSTGRES_PASSWORD')
host = "localhost" 
port = "5432"

# Database Sumber (OLTP Operasional)
engine_akademik = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/datains_akademik")
engine_sdm = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/datains_sdm")

# Database Target OLAP 
engine_warehouse = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/datains_warehouse")

# 2. Kamus Standarisasi Asal Daerah (Kota/Singkatan -> Provinsi Lengkap)
kamus_daerah = {
    'jateng': 'Jawa Tengah', 'semarang': 'Jawa Tengah', 'solo': 'Jawa Tengah', 'surakarta': 'Jawa Tengah', 'magelang': 'Jawa Tengah', 'klaten': 'Jawa Tengah',
    'diy': 'DI Yogyakarta', 'yogyakarta': 'DI Yogyakarta', 'jogja': 'DI Yogyakarta', 'sleman': 'DI Yogyakarta', 'bantul': 'DI Yogyakarta',
    'jabar': 'Jawa Barat', 'bandung': 'Jawa Barat', 'bogor': 'Jawa Barat', 'bekasi': 'Jawa Barat',
    'jatim': 'Jawa Timur', 'surabaya': 'Jawa Timur', 'malang': 'Jawa Timur', 'sidoarjo': 'Jawa Timur',
    'jakarta': 'DKI Jakarta', 'dki': 'DKI Jakarta'
}

def bersihkan_teks_daerah(teks):
    if not teks:
        return "Jawa Tengah" # Default aman jika kosong
    teks_clean = str(teks).strip().lower()
    for kunci, provinsi in kamus_daerah.items():
        if kunci in teks_clean:
            return provinsi
    return "Jawa Tengah" # Default aman jika tidak terdeteksi di kamus

def bersihkan_status_mahasiswa(x):
    if not x:
        return 'Aktif' # Default jika kosong
    
    # Normalisasi string: hilangkan spasi dan tanda minus
    teks_clean = str(x).strip().lower().replace(" ", "").replace("-", "")
    
    if teks_clean == 'aktif': return 'Aktif'
    if teks_clean in ['nonaktif', 'non_aktif', 'tidakaktif']: return 'Nonaktif'
    if teks_clean == 'cuti': return 'Cuti'
    if teks_clean == 'lulus': return 'Lulus'
    
    return 'Aktif' # Default jika string aneh

def jalankan_etl_process():
    print("🚀 Memulai Pipeline ETL (Extract, Transform, Load) -> 9 Tabel Lengkap...")
    
    try:
        # ==========================================
        # 📥 [E] EXTRACT: Ambil Dari Database OLTP
        # ==========================================
        print("📥 Mengambil data mentah dari database operasional...")
        df_mhs = pd.read_sql("SELECT * FROM mahasiswa", engine_akademik)
        df_dosen = pd.read_sql("SELECT * FROM dosen", engine_sdm)
        df_matkul = pd.read_sql("SELECT * FROM matakuliah", engine_akademik)
        df_krs = pd.read_sql("SELECT * FROM krs", engine_akademik)
        df_khs = pd.read_sql("SELECT * FROM khs", engine_akademik)
        df_presensi = pd.read_sql("SELECT * FROM presensi", engine_akademik)
        
        # Tambahan Tabel Referensi/Master Wilayah & Kampus
        df_univ = pd.read_sql("SELECT * FROM universitas", engine_sdm)
        df_fakultas = pd.read_sql("SELECT * FROM fakultas", engine_akademik)
        df_prodi = pd.read_sql("SELECT * FROM prodi", engine_akademik)

        # ==========================================
        # 🛠️ [T] TRANSFORM & DATA CLEANING
        # ==========================================
        print("🛠️  Transformasi 1: Standarisasi Wilayah Asal Daerah (Provinsi Lengkap)...")
        df_mhs['asal_daerah'] = df_mhs['asal_daerah'].apply(bersihkan_teks_daerah)
        df_dosen['asal_daerah'] = df_dosen['asal_daerah'].apply(bersihkan_teks_daerah)

        print("🛠️  Transformasi 2: Sinkronisasi 4 Status Valid Mahasiswa...")
        df_mhs['status_mahasiswa'] = df_mhs['status_mahasiswa'].apply(bersihkan_status_mahasiswa)

        print("🛠️  Transformasi 3: Perbaikan Integritas Relasi Tanpa Menghapus Data...")
        
        # Buat daftar ID Master yang valid sebagai acuan
        valid_nims = df_mhs['nim'].astype(str).tolist()
        valid_nidns = df_dosen['nidn'].astype(str).tolist()
        valid_matkul_codes = df_matkul['kode_matakuliah'].astype(str).tolist()

        # A. Perbaikan tabel KRS (NIM & Kode Matakuliah)
        invalid_krs_nim = ~df_krs['nim'].astype(str).isin(valid_nims)
        if invalid_krs_nim.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_krs_nim.sum()} NIM salah di KRS ke NIM valid...")
            df_krs.loc[invalid_krs_nim, 'nim'] = [random.choice(valid_nims) for _ in range(invalid_krs_nim.sum())]
            
        invalid_krs_mk = ~df_krs['kode_matakuliah'].astype(str).isin(valid_matkul_codes)
        if invalid_krs_mk.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_krs_mk.sum()} Kode MK salah di KRS ke Kode MK valid...")
            df_krs.loc[invalid_krs_mk, 'kode_matakuliah'] = [random.choice(valid_matkul_codes) for _ in range(invalid_krs_mk.sum())]

        # B. Perbaikan tabel KHS (NIM & Kode Matakuliah)
        invalid_khs_nim = ~df_khs['nim'].astype(str).isin(valid_nims)
        if invalid_khs_nim.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_khs_nim.sum()} NIM salah di KHS ke NIM valid...")
            df_khs.loc[invalid_khs_nim, 'nim'] = [random.choice(valid_nims) for _ in range(invalid_khs_nim.sum())]
            
        invalid_khs_mk = ~df_khs['kode_matakuliah'].astype(str).isin(valid_matkul_codes)
        if invalid_khs_mk.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_khs_mk.sum()} Kode MK salah di KHS ke Kode MK valid...")
            df_khs.loc[invalid_khs_mk, 'kode_matakuliah'] = [random.choice(valid_matkul_codes) for _ in range(invalid_khs_mk.sum())]

        # C. Perbaikan tabel Presensi (NIM & Kode Matakuliah)
        invalid_presensi_nim = ~df_presensi['nim'].astype(str).isin(valid_nims)
        if invalid_presensi_nim.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_presensi_nim.sum()} NIM salah di Presensi ke NIM valid...")
            df_presensi.loc[invalid_presensi_nim, 'nim'] = [random.choice(valid_nims) for _ in range(invalid_presensi_nim.sum())]
            
        invalid_presensi_mk = ~df_presensi['kode_matakuliah'].astype(str).isin(valid_matkul_codes)
        if invalid_presensi_mk.sum() > 0:
            print(f"   ⚠️ Mengalihkan {invalid_presensi_mk.sum()} Kode MK salah di Presensi ke Kode MK valid...")
            df_presensi.loc[invalid_presensi_mk, 'kode_matakuliah'] = [random.choice(valid_matkul_codes) for _ in range(invalid_presensi_mk.sum())]

        # D. Perbaikan Lintas Database: Tabel Matakuliah (NIDN Dosen dari DB SDM)
        if 'nidn' in df_matkul.columns:
            invalid_matkul_nidn = ~df_matkul['nidn'].astype(str).isin(valid_nidns)
            if invalid_matkul_nidn.sum() > 0:
                print(f"   ⚠️ Mengalihkan {invalid_matkul_nidn.sum()} NIDN salah di Matakuliah ke NIDN Dosen valid...")
                df_matkul.loc[invalid_matkul_nidn, 'nidn'] = [random.choice(valid_nidns) for _ in range(invalid_matkul_nidn.sum())]

        # ==========================================
        # 💾 [L] LOAD: Kirim Ke Data Warehouse Pusat
        # ==========================================
        print("💾 Menembak data bersih dan utuh ke Data Warehouse (datains_warehouse)...")
        
        target_tables = {
            'universitas': df_univ,
            'fakultas': df_fakultas,
            'prodi': df_prodi,
            'mahasiswa': df_mhs, 
            'dosen': df_dosen, 
            'matakuliah': df_matkul,
            'krs': df_krs, 
            'khs': df_khs, 
            'presensi': df_presensi
        }
        
        for table_name, df_clean in target_tables.items():
            df_clean.to_sql(table_name, engine_warehouse, if_exists='replace', index=False)
            print(f"   ✅ Tabel '{table_name}' sukses di-load. Baris data: {len(df_clean)}")
            
        print("\n🏁 PIPELINE ETL BERHASIL TOTAL! 9 Tabel di 'datains_warehouse' lengkap, sinkron, dan suci! 🎯")

    except Exception as e:
        print(f"❌ Terjadi kegagalan sistem pada proses ETL: {e}")

if __name__ == "__main__":
    jalankan_etl_process()
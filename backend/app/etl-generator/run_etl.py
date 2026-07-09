import pandas as pd
from sqlalchemy import create_engine
import random
import os
from dotenv import load_dotenv

load_dotenv()

# --- KONFIGURASI KONEKSI ---
user = os.getenv('POSTGRES_USER')
pw = os.getenv('POSTGRES_PASSWORD')
host = "localhost" 
port = "5432"

# Engine untuk masing-masing database
engine_akademik = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/db_akademik")
engine_sdm = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/db_sdm")
engine_warehouse = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/warehouse_datains")

def load_data():
    # Pemisahan sumber data
    akademik_files = [
        ('fixed_universitas.csv', 'universitas'),
        ('fixed_fakultas.csv', 'fakultas'),
        ('fixed_prodi.csv', 'prodi'),
        ('fixed_mahasiswa.csv', 'mahasiswa'),
        ('fixed_matakuliah.csv', 'matakuliah'),
        ('fixed_krs.csv', 'krs'),
        ('fixed_khs.csv', 'khs'),
        ('fixed_presensi.csv', 'presensi')
    ]
    
    sdm_files = [
        ('fixed_dosen.csv', 'dosen')
    ]

    print("🚀 Memulai ETL: Memindahkan CSV ke DB Sumber & Warehouse...")
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # simpan ID valid untuk sinkronisasi
    list_nim_valid = []
    list_nidn_valid = []

    # --- PROSES SDM (Cari NIDN Dosen) ---
    for file_name, table_name in sdm_files:
        file_path = os.path.join(current_dir, file_name)
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            if table_name == 'dosen':
                df = df.rename(columns={'jabatan': 'nama_jabatan'}) if 'jabatan' in df.columns else df
                list_nidn_valid = df['nidn'].astype(str).tolist()
            
            # Masuk ke db_sdm & warehouse
            df.to_sql(table_name, engine_sdm, if_exists='replace', index=False)
            df.to_sql(table_name, engine_warehouse, if_exists='replace', index=False)
            print(f"✅ Tabel {table_name} masuk ke db_sdm & warehouse.")

    # --- PROSES AKADEMIK ---
    for file_name, table_name in akademik_files:
        file_path = os.path.join(current_dir, file_name)
        try:
            if not os.path.exists(file_path):
                continue

            df = pd.read_csv(file_path)

            # Sinkronisasi NIM
            if table_name == 'mahasiswa':
                list_nim_valid = df['nim'].astype(str).tolist()

            # Fix data relasi (Data Cleaning / Transformation)
            if table_name in ['khs', 'presensi', 'krs'] and list_nim_valid:
                df['nim'] = df['nim'].astype(str).apply(lambda x: x if x in list_nim_valid else random.choice(list_nim_valid))

            if table_name == 'matakuliah' and list_nidn_valid:
                df['nidn'] = df['nidn'].astype(str).apply(lambda x: x if x in list_nidn_valid else random.choice(list_nidn_valid))
            
            # Paksa id_univ valid
            if 'id_univ' in df.columns:
                df['id_univ'] = df['id_univ'].apply(lambda x: x if x in [1, 2] else random.choice([1, 2]))

            # Masuk ke db_akademik
            df.to_sql(table_name, engine_akademik, if_exists='replace', index=False)
            # Masuk ke warehouse_datains
            df.to_sql(table_name, engine_warehouse, if_exists='replace', index=False)
            
            print(f"✅ Tabel {table_name} masuk ke db_akademik & warehouse.")
            
        except Exception as e:
            print(f"❌ Gagal di tabel {table_name}: {e}")

    print("\n🏁 Data sudah terbagi rapi di db_akademik, db_sdm, dan warehouse_datains.")

if __name__ == "__main__":
    load_data()
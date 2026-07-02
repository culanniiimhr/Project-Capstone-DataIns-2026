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

engine_akademik = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/db_akademik")
engine_sdm = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/db_sdm")
engine_warehouse = create_engine(f"postgresql://{user}:{pw}@{host}:{port}/warehouse_datains")

def load_data():
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
    
    list_nim_valid = []
    list_nidn_valid = []
    list_mk_valid = []

    # --- TAHAP 1: PROSES SDM (Dosen) ---
    for file_name, table_name in sdm_files:
        # REVISI: Diarahkan ke dalam folder 'raw_data'
        file_path = os.path.join(current_dir, 'raw_data', file_name)
        if os.path.exists(file_path):
            df = pd.read_csv(file_path)
            if table_name == 'dosen':
                df = df.rename(columns={'jabatan': 'nama_jabatan'}) if 'jabatan' in df.columns else df
                list_nidn_valid = df['nidn'].astype(str).tolist()
            
            df.to_sql(table_name, engine_sdm, if_exists='replace', index=False)
            df.to_sql(table_name, engine_warehouse, if_exists='replace', index=False)
            print(f"✅ Tabel {table_name} masuk ke db_sdm & warehouse.")

    # Datastructure sementara untuk nampung file akademik
    loaded_dfs = {}

    # --- TAHAP 2: READ & PRE-PROCESS DATA AKADEMIK ---
    for file_name, table_name in akademik_files:
        # REVISI: Diarahkan ke dalam folder 'raw_data'
        file_path = os.path.join(current_dir, 'raw_data', file_name)
        if not os.path.exists(file_path):
            print(f"⚠️ File tidak ditemukan: {file_path}")
            continue
        
        df = pd.read_csv(file_path)
        
        if table_name == 'mahasiswa':
            list_nim_valid = df['nim'].astype(str).tolist()
        elif table_name == 'matakuliah':
            if list_nidn_valid:
                df['nidn'] = df['nidn'].astype(str).apply(lambda x: x if x in list_nidn_valid else random.choice(list_nidn_valid))
            list_mk_valid = df['kode_matakuliah'].astype(str).tolist()
            
        if 'id_univ' in df.columns:
            df['id_univ'] = df['id_univ'].apply(lambda x: x if x in [1, 2] else random.choice([1, 2]))
            
        loaded_dfs[table_name] = df

    # --- TAHAP 3: SINKRONISASI TOTAL KRS, KHS, PRESENSI BIAR 5000 MAHASISWA AKTIF ---
    print("🔄 Menyinkronkan KRS, KHS, dan Presensi agar 5000 Mahasiswa Aktif...")
    
    df_krs = loaded_dfs.get('krs')
    df_khs = loaded_dfs.get('khs')
    df_presensi = loaded_dfs.get('presensi')

    # Cari tahu NIM mana saja yang belum punya record di KRS/KHS asli
    nim_di_krs = set(df_krs['nim'].astype(str).tolist()) if df_krs is not None else set()
    nim_di_khs = set(df_khs['nim'].astype(str).tolist()) if df_khs is not None else set()
    
    nim_belum_aktif = [nim for nim in list_nim_valid if nim not in nim_di_krs or nim not in nim_di_khs]

    new_krs_rows = []
    new_khs_rows = []
    new_presensi_rows = []

    # Ambil base ID terakhir biar kelanjutan autonumber-nya ga duplikat
    last_id_krs = int(df_krs['id_krs'].max()) if df_krs is not None and 'id_krs' in df_krs.columns else 1
    last_id_khs = int(df_khs['id_nilai'].max()) if df_khs is not None and 'id_nilai' in df_khs.columns else 1
    last_id_presensi = int(df_presensi['id_presensi'].max()) if df_presensi is not None and 'id_presensi' in df_presensi.columns else 1

    # Loop khusus untuk menembak mahasiswa yang nganggur
    for nim in nim_belum_aktif:
        mk_pilihan = random.sample(list_mk_valid, 2) if len(list_mk_valid) >= 2 else list_mk_valid
        semester_pilihan = random.choice([1, 2, 3, 4])
        
        for mk in mk_pilihan:
            last_id_krs += 1
            new_krs_rows.append({
                'id_krs': last_id_krs, 'nim': nim, 'kode_matakuliah': mk, 
                'semester': semester_pilihan, 'status_krs': 'Disetujui'
            })
            
            last_id_khs += 1
            nilai_acak = random.randint(65, 95)
            huruf_acak = 'A' if nilai_acak >= 85 else ('B+' if nilai_acak >= 75 else 'B')
            new_khs_rows.append({
                'id_nilai': last_id_khs, 'nim': nim, 'kode_matakuliah': mk, 
                'nilai_angka': nilai_acak, 'nilai_huruf': huruf_acak
            })
            
            last_id_presensi += 1
            new_presensi_rows.append({
                'id_presensi': last_id_presensi, 'nim': nim, 'kode_matakuliah': mk, 
                'jumlah_hadir': random.randint(12, 14), 'total_pertemuan': 14
            })

    # Gabungkan data asli CSV dengan data tambahan hasil sinkronisasi
    if new_krs_rows and df_krs is not None:
        loaded_dfs['krs'] = pd.concat([df_krs, pd.DataFrame(new_krs_rows)], ignore_index=False)
    if new_khs_rows and df_khs is not None:
        loaded_dfs['khs'] = pd.concat([df_khs, pd.DataFrame(new_khs_rows)], ignore_index=False)
    if new_presensi_rows and df_presensi is not None:
        loaded_dfs['presensi'] = pd.concat([df_presensi, pd.DataFrame(new_presensi_rows)], ignore_index=False)

    # --- PUSH SEMUA DATA KE POSTGRES ---
    for table_name, df in loaded_dfs.items():
        df.to_sql(table_name, engine_akademik, if_exists='replace', index=False)
        df.to_sql(table_name, engine_warehouse, if_exists='replace', index=False)
        print(f"✅ Tabel {table_name} sukses disinkronkan & masuk ke db_akademik + warehouse.")

    print("\n🏁 5000 Mahasiswa sekarang 100% aktif dan punya nilai di database!")

if __name__ == "__main__":
    load_data()
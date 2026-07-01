import pandas as pd
from sqlalchemy import create_engine

# Koneksikan ke database postgres lokal lu
engine_akademik = create_engine("postgresql://user:password@localhost:5432/db_akademik")
engine_sdm = create_engine("postgresql://user:password@localhost:5432/db_sdm")

def cek_keamanan_relasi():
    print("🔍 Memulai Audit Validasi Relasi ERD...")

    # 1. Ambil data master untuk acuan validasi
    df_mhs = pd.read_sql("SELECT nim FROM mahasiswa", engine_akademik)
    df_matkul = pd.read_sql("SELECT kode_matakuliah FROM matakuliah", engine_akademik)
    df_dosen = pd.read_sql("SELECT nidn FROM dosen", engine_sdm)
    
    list_nim_valid = df_mhs['nim'].tolist()
    list_mk_valid = df_matkul['kode_matakuliah'].tolist()
    list_nidn_valid = df_dosen['nidn'].tolist()

    # 2. Cek Kebocoran Relasi di Tabel KRS
    df_krs = pd.read_sql("SELECT nim, kode_matakuliah FROM krs", engine_akademik)
    nim_krs_bocor = df_krs[~df_krs['nim'].isin(list_nim_valid)]
    mk_krs_bocor = df_krs[~df_krs['kode_matakuliah'].isin(list_mk_valid)]
    
    print(f"🔹 KRS - NIM Bocor (Tidak Terdaftar): {len(nim_krs_bocor)} baris")
    print(f"🔹 KRS - Kode MK Bocor (Tidak Terdaftar): {len(mk_krs_bocor)} baris")

    # 3. Cek Kebocoran Relasi NIDN di Tabel Matakuliah (Lintas Database)
    df_mk_nidn = pd.read_sql("SELECT kode_matakuliah, nidn FROM matakuliah", engine_akademik)
    nidn_bocor = df_mk_nidn[~df_mk_nidn['nidn'].isin(list_nidn_valid)]
    print(f"🔹 Matakuliah - NIDN Bocor (NIDN Tidak Ada di DB SDM): {len(nidn_bocor)} baris")

    print("\n🏁 Audit Selesai! Jika semua angka bocor bernilai 0, maka data temen lu AMAN sesuai ERD.")

if __name__ == "__main__":
    # Jalankan setelah lu eksekusi/run file akademik.sql dan sdm.sql ke Postgres lu
    cek_keamanan_relasi()
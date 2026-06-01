import pandas as pd
import os

def check_data():
    print("Memulai Audit Integritas Data...\n")
    
    # List file yang akan dicek
    files = {
        'fakultas': 'fixed_fakultas.csv',
        'prodi': 'fixed_prodi.csv',
        'mhs': 'fixed_mahasiswa.csv',
        'dosen': 'fixed_dosen.csv',
        'matkul': 'fixed_matakuliah.csv',
        'krs': 'fixed_krs.csv',
        'khs': 'fixed_khs.csv',
        'presensi': 'fixed_presensi.csv'
    }

    # Load semua data
    dfs = {}
    for key, name in files.items():
        if os.path.exists(name):
            dfs[key] = pd.read_csv(name)
        else:
            print(f"❌ File {name} tidak ditemukan!")
            return

    errors = 0

    # 1. Cek Relasi: Prodi -> Fakultas
    bad_prodi_fak = dfs['prodi'][~dfs['prodi']['id_fakultas'].isin(dfs['fakultas']['id_fakultas'])]
    if not bad_prodi_fak.empty:
        print(f"❌ ERROR: Ada {len(bad_prodi_fak)} Prodi dengan id_fakultas yang tidak ada di master fakultas!")
        errors += 1
    else:
        print("Relasi Prodi -> Fakultas: AMAN")

    # 2. Cek Relasi: Mahasiswa -> Prodi
    bad_mhs_prodi = dfs['mhs'][~dfs['mhs']['id_prodi'].isin(dfs['prodi']['id_prodi'])]
    if not bad_mhs_prodi.empty:
        print(f"❌ ERROR: Ada {len(bad_mhs_prodi)} Mahasiswa dengan id_prodi yang tidak valid!")
        errors += 1
    else:
        print("Relasi Mahasiswa -> Prodi: AMAN")

    # 3. Cek Relasi: Dosen -> Prodi
    bad_dosen_prodi = dfs['dosen'][~dfs['dosen']['id_prodi'].isin(dfs['prodi']['id_prodi'])]
    if not bad_dosen_prodi.empty:
        print(f"❌ ERROR: Ada {len(bad_dosen_prodi)} Dosen dengan id_prodi yang tidak valid!")
        errors += 1
    else:
        print("Relasi Dosen -> Prodi: AMAN")

    # 4. Cek Relasi: Matakuliah -> Dosen (NIDN)
    bad_matkul_nidn = dfs['matkul'][~dfs['matkul']['nidn'].isin(dfs['dosen']['nidn'])]
    if not bad_matkul_nidn.empty:
        print(f"❌ ERROR: Ada Matakuliah yang diampu NIDN yang tidak terdaftar di tabel Dosen!")
        errors += 1
    else:
        print("Relasi Matakuliah -> Dosen (NIDN): AMAN")

    # 5. Cek Relasi Transaksi: KRS -> Mahasiswa (NIM)
    bad_krs_nim = dfs['krs'][~dfs['krs']['nim'].isin(dfs['mhs']['nim'])]
    if not bad_krs_nim.empty:
        print(f"❌ ERROR: Ada data KRS dengan NIM yang tidak terdaftar!")
        errors += 1
    else:
        print("Relasi KRS -> Mahasiswa (NIM): AMAN")

    # 6. Cek Sinkronisasi id_univ (Mahasiswa vs Prodi)
    # Kita gabung mhs dan prodi untuk cek apakah id_univ-nya sama
    merged_mhs = dfs['mhs'].merge(dfs['prodi'][['id_prodi', 'id_univ']], on='id_prodi', suffixes=('_mhs', '_prodi'))
    mismatch_univ = merged_mhs[merged_mhs['id_univ_mhs'] != merged_mhs['id_univ_prodi']]
    if not mismatch_univ.empty:
        print(f"❌ ERROR: Ada {len(mismatch_univ)} Mahasiswa yang id_univ-nya beda dengan id_univ Prodinya!")
        errors += 1
    else:
        print("Sinkronisasi id_univ (Mahasiswa & Prodi): AMAN")

    print("\n" + "="*40)
    if errors == 0:
        print("SEMUA DATA VALID & SINKRON! SIAP IMPORT KE PGADMIN.")
    else:
        print(f"⚠️ Ditemukan {errors} jenis kesalahan. Cek kembali script generatornya.")
    print("="*40)

if __name__ == "__main__":
    check_data()
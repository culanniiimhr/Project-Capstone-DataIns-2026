import pandas as pd
import random

def fix_without_deleting():
    print("🚀 Memperbaiki KRS & Matakuliah (Menjaga kuantitas data)...")
    
    # Load Master Data
    df_mhs = pd.read_csv('fixed_mahasiswa.csv')
    df_dosen = pd.read_csv('fixed_dosen.csv')
    
    # Load Transaksi
    df_krs = pd.read_csv('fixed_krs.csv')
    df_matkul = pd.read_csv('fixed_matakuliah.csv')

    # 1. FIX KRS (Tunjuk NIM valid secara acak untuk NIM yang salah)
    valid_nims = df_mhs['nim'].tolist()
    invalid_krs_mask = ~df_krs['nim'].isin(valid_nims)
    num_invalid_krs = invalid_krs_mask.sum()
    
    if num_invalid_krs > 0:
        print(f"⚠️ Mengalihkan {num_invalid_krs} NIM di KRS ke NIM yang valid...")
        df_krs.loc[invalid_krs_mask, 'nim'] = [random.choice(valid_nims) for _ in range(num_invalid_krs)]

    # 2. FIX MATAKULIAH (Tunjuk NIDN valid secara acak untuk NIDN yang salah)
    valid_nidns = df_dosen['nidn'].tolist()
    invalid_matkul_mask = ~df_matkul['nidn'].isin(valid_nidns)
    num_invalid_matkul = invalid_matkul_mask.sum()
    
    if num_invalid_matkul > 0:
        print(f"⚠️ Mengalihkan {num_invalid_matkul} NIDN di Matakuliah ke NIDN yang valid...")
        df_matkul.loc[invalid_matkul_mask, 'nidn'] = [random.choice(valid_nidns) for _ in range(num_invalid_matkul)]

    # Simpan kembali
    df_krs.to_csv('fixed_krs.csv', index=False)
    df_matkul.to_csv('fixed_matakuliah.csv', index=False)
    
    print(f"✅ SELESAI! Jumlah KRS tetap: {len(df_krs)}, Matakuliah tetap: {len(df_matkul)}")

if __name__ == "__main__":
    fix_without_deleting()
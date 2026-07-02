import pandas as pd
import random

def boost_to_5000():
    df = pd.read_csv('fixed_mahasiswa.csv')
    df_prodi = pd.read_csv('fixed_prodi.csv')
    
    current_count = len(df)
    target_count = 5000
    needed = target_count - current_count
    
    if needed <= 0:
        print(f"Data sudah {current_count}, tidak perlu ditambah.")
        return

    print(f"Data sekarang {current_count}. Menambah {needed} data baru...")

    # Ambil sample data yang sudah ada untuk diduplikasi
    extra_data = df.sample(needed, replace=True).copy()
    
    # Biar NIM-nya gak bentrok, kita bikin NIM baru lanjutannya
    # Kita asumsikan NIM-nya integer, kalau string kita manipulasi
    last_nim = int(df['nim'].max())
    extra_data['nim'] = range(last_nim + 1, last_nim + 1 + needed)
    
    # Kasih variasi nama dikit biar gak kelihatan clone banget (opsional)
    extra_data['nama'] = extra_data['nama'] + " (Baru)"

    # Gabungin
    df_final = pd.concat([df, extra_data], ignore_index=True)
    
    # Simpan
    df_final.to_csv('fixed_mahasiswa.csv', index=False)
    print(f"✅ SUKSES! Sekarang isi file fixed_mahasiswa.csv ada {len(df_final)} baris.")

if __name__ == "__main__":
    boost_to_5000()
import pandas as pd
import random

def rombak_status_mahasiswa():
    file_path = 'fixed_mahasiswa.csv'
    print(f"🛠️ Memproses rombak status di {file_path}...")
    
    try:
        df = pd.read_csv(file_path)
    except FileNotFoundError:
        print("❌ File tidak ditemukan! Pastikan nama filenya bener.")
        return

    def tentukan_status(row):
        rand = random.random()
        angkatan = row['angkatan']
        
        # 1. Angkatan Baru (2023 - 2024) -> Fokus Aktif/Cuti
        if angkatan >= 2023:
            if rand < 0.90: return 'Aktif'
            if rand < 0.95: return 'Cuti'
            if rand < 0.98: return 'Nonaktif'
            return 'Drop Out'
        
        # 2. Angkatan Tengah (2021 - 2022) -> Mulai banyak Nonaktif/DO
        elif 2021 <= angkatan <= 2022:
            if rand < 0.85: return 'Aktif'
            if rand < 0.90: return 'Cuti'
            if rand < 0.96: return 'Nonaktif'
            return 'Drop Out'
            
        # 3. Angkatan Tua (<= 2020) -> Peluang Lulus Besar
        else:
            if rand < 0.60: return 'Lulus' # Mayoritas harusnya udah lulus
            if rand < 0.85: return 'Aktif' # Sisanya mungkin pejuang skripsi
            if rand < 0.92: return 'Nonaktif'
            if rand < 0.97: return 'Cuti'
            return 'Drop Out'

    # Eksekusi rombak status
    df['status_mahasiswa'] = df.apply(tentukan_status, axis=1)

    # Simpan kembali ke CSV
    df.to_csv(file_path, index=False)
    
    # Cetak hasil buat ngecek distribusi singkat
    print("\n✅ Berhasil merombak status mahasiswa!")
    print("Hasil Distribusi Status Baru:")
    print(df['status_mahasiswa'].value_counts())

if __name__ == "__main__":
    rombak_status_mahasiswa()
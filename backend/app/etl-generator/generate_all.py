import pandas as pd
import numpy as np

def generate_perfect_data():
    print("🚀 Memulai pabrikasi data sinkron (Full Revision: Dosen -> Matakuliah)...")

    # --- 1. DATA MASTER: FAKULTAS (11 Fakultas) ---
    fakultas_names = [
        "Fakultas Teknologi Industri", "Fakultas Ekonomi dan Bisnis",
        "Fakultas Kedokteran dan Kesehatan", "Fakultas Hukum, Sosial, dan Politik",
        "Fakultas Keguruan dan Ilmu Pendidikan", "Fakultas Psikologi",
        "Fakultas Agama Islam", "Fakultas Sastra, Budaya, dan Komunikasi",
        "Fakultas Sains dan Teknologi Terapan", "Fakultas Farmasi", "Fakultas Kedokteran Gigi"
    ]
    fakultas = pd.DataFrame({
        'id_fakultas': range(1, 12),
        'nama_fakultas': fakultas_names,
        'id_univ': np.random.randint(1, 5, size=11)
    })

    # --- 2. DATA MASTER: PRODI (37 Prodi) ---
    prodi_names = [
        "Sistem Informasi", "Informatika", "Teknik Elektro", "Teknik Sipil", "Teknik Industri", 
        "Teknik Kimia", "Arsitektur", "Manajemen", "Akuntansi", "Ekonomi Pembangunan", 
        "Bisnis Digital", "Kedokteran", "Farmasi", "Kesehatan Masyarakat", "Ilmu Keperawatan", 
        "Kedokteran Gigi", "Psikologi", "Hukum", "Ilmu Komunikasi", "Hubungan Internasional", 
        "Sosiologi", "Sastra Inggris", "Sastra Indonesia", "Pendidikan Matematika", 
        "Pendidikan Fisika", "Pendidikan Biologi", "Ilmu Hadis", "Perbankan Syariah", 
        "Gizi", "Matematika", "Fisika", "Biologi", "Kimia", "Teknik Mesin", "Ilmu Politik", 
        "Pendidikan Bahasa Arab", "Teknologi Pangan"
    ]
    prodi = pd.DataFrame({
        'id_prodi': [f'PRODI{i+1:02d}' for i in range(len(prodi_names))],
        'nama_prodi': prodi_names,
        'id_fakultas': np.random.randint(1, 12, size=len(prodi_names))
    })
    prodi['id_univ'] = prodi['id_fakultas'].map(fakultas.set_index('id_fakultas')['id_univ'])

    # --- 3. DATA MASTER: DOSEN (60 Dosen) ---
    n_dosen = 60
    dosen = pd.DataFrame({
        'nidn': [f'0600{i:05d}' for i in range(n_dosen)],
        'nama_dosen': [f'Dosen_{i}' for i in range(n_dosen)],
        'email_instansi': [f'dosen_{i}@univ.ac.id' for i in range(n_dosen)],
        'jenis_kelamin': np.random.choice(['L', 'P'], size=n_dosen),
        'id_prodi': np.random.choice(prodi['id_prodi'], size=n_dosen),
        'nama_jabatan': np.random.choice(['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar'], size=n_dosen),
        'status_kepegawaian': 'Dosen Tetap',
        'asal_daerah': np.random.choice(['Yogyakarta', 'Bandung', 'Jakarta', 'Surabaya'], size=n_dosen)
    })
    # Sinkronkan Univ Dosen dengan Univ Prodinya
    dosen['id_univ'] = dosen['id_prodi'].map(prodi.set_index('id_prodi')['id_univ'])

    # --- 4. DATA MASTER: MATAKULIAH (Connect to Dosen NIDN) ---
    matkul_data = [
        ['MK01', 'Algoritma dan Pemrograman', 3],
        ['MK02', 'Dasar-Dasar Manajemen', 3],
        ['MK03', 'Anatomi Manusia', 4],
        ['MK04', 'Pengantar Hukum Indonesia', 2],
        ['MK05', 'Psikologi Perkembangan', 3],
        ['MK06', 'Sistem Basis Data', 4],
        ['MK07', 'Akuntansi Keuangan', 3],
        ['MK08', 'Farmakologi Dasar', 3],
        ['MK09', 'Komunikasi Massa', 3],
        ['MK10', 'Fisika Dasar', 3]
    ]
    matkul = pd.DataFrame(matkul_data, columns=['kode_matakuliah', 'nama_matakuliah', 'sks'])
    
    # Pilih 10 dosen acak untuk jadi pengampu matkul ini
    pengampu_nidn = np.random.choice(dosen['nidn'], size=10, replace=False)
    matkul['nidn'] = pengampu_nidn
    
    # Sinkronkan id_univ matkul dengan univ si dosen pengampu
    matkul['id_univ'] = matkul['nidn'].map(dosen.set_index('nidn')['id_univ'])

    # --- 5. DATA MAHASISWA (5000 Baris) ---
    n_rows = 5000
    mhs = pd.DataFrame({
        'nim': [f'2400{i:05d}' for i in range(n_rows)],
        'nama': [f'Mahasiswa_{i}' for i in range(n_rows)],
        'jenis_kelamin': np.random.choice(['L', 'P'], size=n_rows),
        'angkatan': np.random.choice([2020, 2021, 2022, 2023, 2024], size=n_rows),
        'status_mahasiswa': 'Aktif',
        'id_prodi': np.random.choice(prodi['id_prodi'], size=n_rows),
        'asal_daerah': np.random.choice(['DIY', 'Jateng', 'Jabar', 'Jatim', 'Bali'], size=n_rows)
    })
    mhs['id_univ'] = mhs['id_prodi'].map(prodi.set_index('id_prodi')['id_univ'])

    # --- 6. DATA TRANSAKSI (KRS, KHS, PRESENSI) ---
    # Memastikan mahasiswa hanya mengambil matkul yang tersedia di Univ yang sama (Logika Dashboard)
    # Untuk simplifikasi dummy, kita asumsikan semua mahasiswa bisa ambil matkul MK01-MK10
    krs = pd.DataFrame({
        'id_krs': range(1, n_rows + 1),
        'nim': np.random.choice(mhs['nim'], size=n_rows),
        'kode_matakuliah': np.random.choice(matkul['kode_matakuliah'], size=n_rows),
        'semester': 'Gasal 2023/2024'
    })

    khs = pd.DataFrame({
        'id_nilai': range(1, n_rows + 1),
        'nim': krs['nim'],
        'kode_matakuliah': krs['kode_matakuliah'],
        'nilai_angka': np.random.uniform(60, 100, size=n_rows).round(2),
        'nilai_huruf': np.random.choice(['A', 'B+', 'B', 'C'], size=n_rows)
    })

    presensi = pd.DataFrame({
        'id_presensi': range(1, n_rows + 1),
        'nim': np.random.choice(mhs['nim'], size=n_rows),
        'kode_matakuliah': np.random.choice(matkul['kode_matakuliah'], size=n_rows),
        'tanggal': '2026-05-07',
        'status_kehadiran': np.random.choice(['Hadir', 'Tidak Hadir'], p=[0.9, 0.1], size=n_rows)
    })

    # --- SAVE ---
    files = {
        'fixed_fakultas.csv': fakultas, 'fixed_prodi.csv': prodi,
        'fixed_mahasiswa.csv': mhs, 'fixed_dosen.csv': dosen,
        'fixed_matakuliah.csv': matkul, 'fixed_krs.csv': krs,
        'fixed_khs.csv': khs, 'fixed_presensi.csv': presensi
    }

    for name, df in files.items():
        df.to_csv(name, index=False)
        print(f"✅ {name} selesai dibuat & sinkron.")

    print("\n" + "="*50)
    print("✨ DATA REVISI FINAL SIAP! RELASI DOSEN-MATKUL AMAN.")
    print("="*50)

if __name__ == "__main__":
    generate_perfect_data()
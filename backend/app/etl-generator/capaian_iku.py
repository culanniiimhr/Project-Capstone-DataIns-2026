import pandas as pd
import random
from sqlalchemy import create_engine, text

# ==========================================
# 1. KONFIGURASI DATABASE (PILIH SALAH SATU)
# ==========================================
# Opsi A: Jalankan di LOKAL terlebih dahulu
URL_DB = 'postgresql://postgres.zuooajizxhtsxswdwcha:datains_secret3421@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres'

# Opsi B: Jika lokal sukses, comment Opsi A lalu uncomment Opsi B ini untuk isi Supabase
# URL_DB = 'postgresql://postgres.zuooajizxhtsxswdwcha:[YOUR-PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres'

engine = create_engine(URL_DB)

# ==========================================
# 2. AMBIL ID PRODI YANG VALID DARI DATABASE
# ==========================================
with engine.connect() as conn:
    query = text("SELECT id_prodi FROM dim_prodi")
    result = conn.execute(query)
    # Mengambil list ID asli yang ada di DB (menghindari ID yang bolong)
    prodi_ids = [row[0] for row in result]

print(f"Berhasil membaca {len(prodi_ids)} ID prodi aktif dari database.")

# ==========================================
# 3. KELOMPOK DATA IKU
# ==========================================
list_iku = [
    ('IKU 1', 'Lulusan Mendapat Pekerjaan yang Layak', 'Pendidikan'),
    ('IKU 2', 'Mahasiswa Mendapat Pengalaman di Luar Kampus', 'Pendidikan'),
    ('IKU 3', 'Dosen Berkegiatan di Luar Kampus', 'Penelitian'),
    ('IKU 4', 'Praktisi Mengajar di Dalam Kampus', 'Pendidikan'),
    ('IKU 5', 'Hasil Kerja Dosen Digunakan Masyarakat', 'PKM'),
    ('IKU 6', 'Program Studi Bekerja Sama dengan Mitra', 'Tata Kelola'),
    ('IKU 7', 'Kelas yang Kolaboratif dan Partisipatif', 'Pendidikan'),
    ('IKU 8', 'Program Studi Berstandar Internasional', 'Tata Kelola')
]

tahun_list = ['2019/2020', '2020/2021', '2021/2022', '2022/2023', '2023/2024', '2024/2025', '2025/2026']
semester_list = ['Ganjil', 'Genap']

data_iku = []

# ==========================================
# 4. GENERATE KOMBINASI DATA (> 4.000 - 5.000 BARIS)
# ==========================================
for tahun in tahun_list:
    for semester in semester_list:
        for prodi_id in prodi_ids:
            for iku_code, iku_name, perspektif in list_iku:
                
                target = round(random.uniform(55.0, 85.0), 2)
                capaian = round(random.uniform(40.0, 95.0), 2)
                
                status = 'Tercapai' if capaian >= target else 'Perlu Perhatian'
                is_tercapai = True if capaian >= target else False
                
                data_iku.append({
                    'id_prodi': prodi_id,
                    'id_univ': 1,
                    'nomor_iku': iku_code,
                    'nama_indikator': iku_name,
                    'perspektif': perspektif,
                    'tahun_akademik': tahun,
                    'semester': semester,
                    'target_persentase': target,
                    'capaian_persentase': capaian,
                    'status_capaian': status,
                    'is_tercapai_target': is_tercapai
                })

# 5. Push ke Database lewat Pandas
df = pd.DataFrame(data_iku)
df.to_sql('fact_capaian_iku', engine, if_exists='append', index=False)

print(f"Sukses! {len(df)} baris data IKU berhasil disuntikkan ke database.")
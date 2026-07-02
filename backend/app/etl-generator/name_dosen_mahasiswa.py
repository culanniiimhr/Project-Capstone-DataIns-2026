import pandas as pd
import random
from faker import Faker

# Set ke Bahasa Indonesia
fake = Faker('id_ID')

# --- CONFIGURATION ---
NUM_MAHASISWA = 5000
NUM_DOSEN = 100

# Load data pendukung (asumsi kamu sudah punya list ID-nya)
univ_ids = [1, 2, 3, 4]
prodi_ids = [f"PRODI{str(i).zfill(2)}" for i in range(1, 41)] # PRODI01 - PRODI40
daerah = ['Jateng', 'Jatim', 'Jabar', 'DIY', 'Bali', 'Jakarta', 'Sumatra', 'Sulawesi']
jabatan = ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Guru Besar']

# 1. GENERATE DOSEN (Untuk DB SDM)
dosen_list = []
for i in range(NUM_DOSEN):
    nidn = f"06{str(i).zfill(7)}"
    jk = random.choice(['L', 'P'])
    nama = fake.name_male() if jk == 'L' else fake.name_female()
    email = f"{nama.lower().replace(' ', '.')}@univ.ac.id"
    dosen_list.append([
        nidn, nama, email, jk, 
        random.choice(prodi_ids), 
        random.choice(jabatan), 
        "Dosen Tetap", 
        random.choice(daerah), 
        random.choice(univ_ids)
    ])

df_dosen = pd.DataFrame(dosen_list, columns=['nidn','nama_dosen','email_instansi','jenis_kelamin','id_prodi','nama_jabatan','status_kepegawaian','asal_daerah','id_univ'])
df_dosen.to_csv('fixed_dosen.csv', index=False)

# 2. GENERATE MAHASISWA (Untuk DB Akademik)
mhs_list = []
for i in range(NUM_MAHASISWA):
    nim = 240000000 + i
    jk = random.choice(['L', 'P'])
    nama = fake.name_male() if jk == 'L' else fake.name_female()
    mhs_list.append([
        nim, nama, jk, 
        random.choice([2020, 2021, 2022, 2023, 2024]), 
        "Aktif", 
        random.choice(prodi_ids), 
        random.choice(daerah), 
        random.choice(univ_ids)
    ])

df_mhs = pd.DataFrame(mhs_list, columns=['nim','nama','jenis_kelamin','angkatan','status_mahasiswa','id_prodi','asal_daerah','id_univ'])
df_mhs.to_csv('fixed_mahasiswa.csv', index=False)

print("Berhasil! File fixed_dosen.csv dan fixed_mahasiswa.csv sudah pakai nama asli Indonesia.")
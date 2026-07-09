# 🎓 Panduan Audit & Import Data Dummy (Multi-DB)

Folder ini berisi dataset dummy untuk simulasi sistem **SDM (Sumber Daya Manusia)** dan **Akademik**.  
Data telah divalidasi menggunakan library `Faker` untuk menghasilkan data realistis dan `Pandas` untuk menjaga integritas relasi antar tabel.

---

# 🏗️ Arsitektur Database

Proyek menggunakan **2 database PostgreSQL** yang terpisah:

| Database | Fungsi |
|---|---|
| `db_sdm` | Mengelola data universitas, fakultas, prodi, dan kepegawaian (dosen) |
| `db_akademik` | Mengelola data operasional akademik (matakuliah, mahasiswa, KRS, KHS, presensi) |

---

# 🛠️ Langkah 1 — Persiapan Lingkungan

Install library yang dibutuhkan sebelum menjalankan generator atau validator data:

```bash
pip install pandas faker --break-system-packages
```

---

# 📜 Langkah 2 — Membuat Struktur Tabel (SQL DDL)

Jalankan query berikut di **Query Tool** masing-masing database sebelum melakukan import CSV.

---

# 🅰️ Database: `db_sdm`

```sql
CREATE TABLE universitas (
    id_univ INT PRIMARY KEY,
    nama_univ VARCHAR(255),
    kode_pt VARCHAR(20)
);

CREATE TABLE fakultas (
    id_fakultas INT PRIMARY KEY,
    nama_fakultas VARCHAR(255),
    id_univ INT REFERENCES universitas(id_univ)
);

CREATE TABLE prodi (
    id_prodi VARCHAR(20) PRIMARY KEY,
    nama_prodi VARCHAR(255),
    id_fakultas INT REFERENCES fakultas(id_fakultas),
    id_univ INT REFERENCES universitas(id_univ)
);

CREATE TABLE dosen (
    nidn VARCHAR(20) PRIMARY KEY,
    nama_dosen VARCHAR(255),
    email_instansi VARCHAR(255),
    jenis_kelamin CHAR(1),
    id_prodi VARCHAR(20) REFERENCES prodi(id_prodi),
    nama_jabatan VARCHAR(100),
    status_kepegawaian VARCHAR(100),
    asal_daerah VARCHAR(100),
    id_univ INT REFERENCES universitas(id_univ)
);
```

---

# 🅱️ Database: `db_akademik`

> Jalankan tabel master (`universitas`, `fakultas`, `prodi`) sama seperti di `db_sdm`, lalu jalankan query berikut:

```sql
CREATE TABLE matakuliah (
    kode_matakuliah VARCHAR(20) PRIMARY KEY,
    nama_matakuliah VARCHAR(255),
    sks INT,
    nidn VARCHAR(20),
    id_univ INT REFERENCES universitas(id_univ)
);

CREATE TABLE mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(255),
    jenis_kelamin CHAR(1),
    angkatan INT,
    status_mahasiswa VARCHAR(50),
    id_prodi VARCHAR(20) REFERENCES prodi(id_prodi),
    asal_daerah VARCHAR(100),
    id_univ INT REFERENCES universitas(id_univ)
);

CREATE TABLE krs (
    id_krs INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES matakuliah(kode_matakuliah),
    semester VARCHAR(50)
);

CREATE TABLE khs (
    id_nilai INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES matakuliah(kode_matakuliah),
    nilai_angka DECIMAL(5,2),
    nilai_huruf VARCHAR(5)
);

CREATE TABLE presensi (
    id_presensi INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES matakuliah(kode_matakuliah),
    tanggal DATE,
    status_kehadiran VARCHAR(50)
);
```

---

# 🚀 Langkah 3 — Proses Import ke pgAdmin

> ⚠️ **PENTING**  
> Ikuti urutan import secara ketat untuk menghindari error **Foreign Key Violation**.

---

# 🅰️ Database: `db_sdm`

## Urutan Import

### 1. Tabel `universitas`

Input manual data berikut:

| ID | Nama |
|---|---|
| 1 | UAD |
| 2 | UGM |
| 3 | UNY |
| 4 | UMY |

---

### 2. Import `fixed_fakultas.csv`

➡️ Tabel: `fakultas`

---

### 3. Import `fixed_prodi.csv`

➡️ Tabel: `prodi`

---

### 4. Import `fixed_dosen.csv`

➡️ Tabel: `dosen`

---

# 🅱️ Database: `db_akademik`

## Tabel Master

> ⚠️ Wajib mengulangi import tabel master dari `db_sdm`

Urutan import:

1. `universitas`
2. `fakultas`
3. `prodi`

---

## Import Data Master Akademik

| File CSV | Tabel |
|---|---|
| `fixed_matakuliah.csv` | `matakuliah` |
| `fixed_mahasiswa.csv` | `mahasiswa` |

---

## Tabel Transaksi

Urutan import berikut bersifat bebas:

- `fixed_krs.csv`
- `fixed_khs.csv`
- `fixed_presensi.csv`

---

# ⚙️ Konfigurasi Import di pgAdmin

Gunakan konfigurasi berikut saat membuka menu **Import/Export Data**:

| Tab | Properti | Nilai |
|---|---|---|
| General | Import/Export | Import |
| Options | Format | `csv` |
| Options | Header | `Yes` |
| Options | Delimiter | `,` (koma) |
| Options | Quote / Escape | `"` |

---

# 🔍 Troubleshooting

## ❌ Error: `missing data for column`

### Penyebab
- Terdapat baris kosong di bagian akhir file CSV.

### Solusi
- Hapus baris kosong paling bawah menggunakan text editor.

---

## ❌ Error:
```text
Key (id_prodi)=(PRODIxx) is not present in table "prodi"
```

### Penyebab
- Tabel `prodi` belum terisi lengkap.

### Solusi
Pastikan seluruh data `PRODI01` sampai `PRODI40` sudah berhasil diimport sebelum mengimport tabel:

- `dosen`
- `mahasiswa`

---

## ❌ Error: `Extra data after last expected column`

### Penyebab
- Terdapat tanda koma `,` liar di dalam isi data teks.

### Solusi
- Pastikan seluruh data teks menggunakan format CSV yang valid dan menggunakan quote (`"`).

---

# 💡 Tips Audit Data

Sebelum import, jalankan validator untuk memastikan seluruh relasi data sinkron:

```bash
python3 check_integrity.py
```

---

# ✅ Status Data

| Komponen | Status |
|---|---|
| Mahasiswa | 5000 data sinkron |
| Dosen | 100 data sinkron |
| Relasi FK | Valid |
| CSV | Siap Import |

---

# 👨‍💻 Author

**Akbar**

---

# 📌 Catatan

- Seluruh dataset dibuat untuk kebutuhan simulasi/testing.
- Struktur data telah disesuaikan agar kompatibel dengan PostgreSQL.
- Disarankan menggunakan **pgAdmin** atau `COPY FROM CSV` untuk import massal.

---

# 🚀 Final Status

✅ Data berhasil disinkronkan dan siap digunakan.
-- 1. Tabel Universitas
CREATE TABLE fixed_universitas (
    id_univ INT PRIMARY KEY,
    nama_univ VARCHAR(255),
    kode_pt VARCHAR(20),
    alamat TEXT
);

-- 2. Tabel Fakultas
CREATE TABLE fixed_fakultas (
    id_fakultas INT PRIMARY KEY,
    nama_fakultas VARCHAR(255),
    id_univ INT REFERENCES fixed_universitas(id_univ)
);

-- 3. Tabel Prodi
CREATE TABLE fixed_prodi (
    id_prodi VARCHAR(20) PRIMARY KEY,
    nama_prodi VARCHAR(255),
    id_fakultas INT REFERENCES fixed_fakultas(id_fakultas),
    id_univ INT REFERENCES fixed_universitas(id_univ)
);

-- 4. Tabel Mahasiswa
CREATE TABLE fixed_mahasiswa (
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(255),
    jenis_kelamin CHAR(1),
    angkatan INT,
    status_mahasiswa VARCHAR(50),
    id_prodi VARCHAR(20) REFERENCES fixed_prodi(id_prodi),
    asal_daerah VARCHAR(100),
    id_univ INT REFERENCES fixed_universitas(id_univ)
);

-- 5. Tabel Matakuliah
CREATE TABLE fixed_matakuliah (
    kode_matakuliah VARCHAR(20) PRIMARY KEY,
    nama_matakuliah VARCHAR(255),
    sks INT,
    nidn VARCHAR(20), -- Referensi teks ke DB SDM
    id_univ INT REFERENCES fixed_universitas(id_univ)
);

-- 6. Tabel KRS
CREATE TABLE fixed_krs (
    id_krs INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES fixed_mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES fixed_matakuliah(kode_matakuliah),
    semester VARCHAR(50)
);

-- 7. Tabel KHS
CREATE TABLE fixed_khs (
    id_nilai INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES fixed_mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES fixed_matakuliah(kode_matakuliah),
    nilai_angka DECIMAL(5,2),
    nilai_huruf VARCHAR(5)
);

-- 8. Tabel Presensi
CREATE TABLE fixed_presensi (
    id_presensi INT PRIMARY KEY,
    nim VARCHAR(20) REFERENCES fixed_mahasiswa(nim),
    kode_matakuliah VARCHAR(20) REFERENCES fixed_matakuliah(kode_matakuliah),
    tanggal DATE,
    status_kehadiran VARCHAR(50)
);
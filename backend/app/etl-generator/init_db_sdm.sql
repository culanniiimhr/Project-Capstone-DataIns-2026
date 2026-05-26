-- 1. Tabel Universitas (Master data diulang di sini)
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

-- 4. Tabel Dosen
CREATE TABLE fixed_dosen (
    nidn VARCHAR(20) PRIMARY KEY,
    nama_dosen VARCHAR(255),
    email_instansi VARCHAR(255),
    jenis_kelamin CHAR(1),
    id_prodi VARCHAR(20) REFERENCES fixed_prodi(id_prodi),
    jabatan VARCHAR(100),
    status_kepegawaian VARCHAR(100),
    asal_daerah VARCHAR(100),
    id_univ INT REFERENCES fixed_universitas(id_univ)
);
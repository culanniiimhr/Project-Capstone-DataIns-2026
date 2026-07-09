--- ==========================================
-- CREATE DIMENSION TABLES (OLAP REVISI)
-- ==========================================
CREATE TABLE dim_mahasiswa AS
SELECT nim::TEXT, nama, jenis_kelamin, angkatan, status_mahasiswa, asal_daerah, id_univ, id_prodi
FROM mahasiswa;

CREATE TABLE dim_dosen AS
SELECT nidn::TEXT, nama_dosen, nama_jabatan, status_kepegawaian, asal_daerah, id_univ
FROM dosen;

CREATE TABLE dim_prodi AS
SELECT 
    p.id_prodi, 
    p.nama_prodi, 
    f.nama_fakultas, 
    u.nama_univ
FROM prodi p
JOIN fakultas f ON p.id_fakultas = f.id_fakultas
JOIN universitas u ON p.id_univ = u.id_univ;

CREATE TABLE dim_matakuliah AS
SELECT kode_matakuliah, nama_matakuliah, sks
FROM matakuliah;

-- ==========================================
-- CREATE FACT TABLE (MURNI INNER JOIN)
-- ==========================================
CREATE TABLE fact_akademik AS
SELECT 
    khs.id_nilai,
    khs.nim::TEXT, 
    khs.kode_matakuliah,
    mk.nidn::TEXT as nidn, 
    krs.semester,
    khs.nilai_angka,
    khs.nilai_huruf,
    mk.sks,
    CASE 
        WHEN khs.nilai_huruf = 'A' THEN 4.0
        WHEN khs.nilai_huruf = 'B+' THEN 3.5
        WHEN khs.nilai_huruf = 'B' THEN 3.0
        WHEN khs.nilai_huruf = 'C+' THEN 2.5
        WHEN khs.nilai_huruf = 'C' THEN 2.0
        ELSE 0.0 
    END as poin_nilai
FROM khs
JOIN krs ON khs.nim::TEXT = krs.nim::TEXT AND khs.kode_matakuliah = krs.kode_matakuliah
JOIN matakuliah mk ON khs.kode_matakuliah = mk.kode_matakuliah;

-- ==========================================
-- CREATE VIEWS
-- ==========================================
CREATE OR REPLACE VIEW v_ip_semester AS
SELECT 
    nim, 
    semester, 
    CAST(ROUND(CAST(SUM(poin_nilai * sks) AS NUMERIC) / NULLIF(SUM(sks), 0), 2) AS DECIMAL(3,2)) as ips
FROM fact_akademik
GROUP BY nim, semester;

CREATE OR REPLACE VIEW v_ipk_mahasiswa AS
SELECT 
    nim, 
    CAST(ROUND(CAST(SUM(poin_nilai * sks) AS NUMERIC) / NULLIF(SUM(sks), 0), 2) AS DECIMAL(3,2)) as ipk
FROM fact_akademik
GROUP BY nim;

CREATE OR REPLACE VIEW v_rekap_mahasiswa_lengkap AS
SELECT 
    m.nim, 
    m.nama, 
    p.nama_prodi, 
    p.nama_fakultas,
    COALESCE(v.ipk, 0.00) as ipk
FROM dim_mahasiswa m
JOIN dim_prodi p ON m.id_prodi = p.id_prodi
LEFT JOIN v_ipk_mahasiswa v ON m.nim = v.nim;
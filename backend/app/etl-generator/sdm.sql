-- Database: sdm
--

-- --------------------------------------------------------

--
-- Struktur dari tabel dosen
--

CREATE TABLE dosen (
  NIDN varchar(100) NOT NULL,
  id_univ int DEFAULT NULL,
  nama_dosen varchar(100) DEFAULT NULL,
  email_instansi varchar(100) DEFAULT NULL,
  jenis_kelamin char(10) DEFAULT NULL,
  id_prodi int DEFAULT NULL,
  jabatan varchar(100) DEFAULT NULL,
  status_kepegawaian varchar(100) DEFAULT NULL,
  asal_daerah varchar(100) DEFAULT NULL
) ;

--
-- Dumping data untuk tabel dosen
--

INSERT INTO dosen (NIDN, id_univ, nama_dosen, email_instansi, jenis_kelamin, id_prodi, jabatan, status_kepegawaian, asal_daerah) VALUES
('1000000001', 1, 'Ahmad Fauzi', 'ahmad.fauzi@uad.ac.id', 'L', 1, 'Lektor', 'Tetap', 'Yogyakarta'),
('1000000002', 1, 'Siti Aminah', 'siti.aminah@uad.ac.id', 'P', 2, 'Asisten Ahli', 'Tetap', 'Klaten'),
('1000000003', 1, 'Muhammad Rizki', 'm.rizki@uad.ac.id', 'L', 3, 'Lektor', 'Tetap', 'Solo'),
('1000000004', 1, 'Dewi Lestari', 'dewi.lestari@uad.ac.id', 'P', 4, 'Lektor Kepala', 'Tetap', 'Semarang'),
('1000000005', 1, 'Andi Pratama', 'andi.pratama@uad.ac.id', 'L', 5, 'Asisten Ahli', 'Tetap', 'Yogyakarta'),
('1000000006', 1, 'Putri Maharani', 'putri.maharani@uad.ac.id', 'P', 6, 'Lektor', 'Tetap', 'Magelang'),
('1000000007', 1, 'Fajar Nugroho', 'fajar.nugroho@uad.ac.id', 'L', 7, 'Guru Besar', 'Tetap', 'Yogyakarta'),
('1000000008', 1, 'Nabila Kusuma', 'nabila.kusuma@uad.ac.id', 'P', 8, 'Lektor', 'Tetap', 'Surabaya'),
('1000000009', 1, 'Budi Santoso', 'budi.santoso@uad.ac.id', 'L', 9, 'Asisten Ahli', 'Tetap', 'Malang'),
('1000000010', 1, 'Rina Utami', 'rina.utami@uad.ac.id', 'P', 10, 'Lektor', 'Tetap', 'Bandung'),
('1000000011', 1, 'Agus Hidayat', 'agus.hidayat@uad.ac.id', 'L', 11, 'Lektor Kepala', 'Tetap', 'Purwokerto'),
('1000000012', 1, 'Sri Wahyuni', 'sri.wahyuni@uad.ac.id', 'P', 12, 'Lektor', 'Tetap', 'Yogyakarta'),
('1000000013', 1, 'Eko Saputra', 'eko.saputra@uad.ac.id', 'L', 13, 'Asisten Ahli', 'Tetap', 'Solo'),
('1000000014', 1, 'Linda Sari', 'linda.sari@uad.ac.id', 'P', 14, 'Lektor', 'Tetap', 'Semarang'),
('1000000015', 1, 'Dimas Prakoso', 'dimas.prakoso@uad.ac.id', 'L', 15, 'Lektor Kepala', 'Tetap', 'Yogyakarta'),
('1000000016', 1, 'Maya Puspita', 'maya.puspita@uad.ac.id', 'P', 16, 'Asisten Ahli', 'Tetap', 'Klaten'),
('1000000017', 1, 'Yusuf Ramadhan', 'yusuf.ramadhan@uad.ac.id', 'L', 17, 'Lektor', 'Tetap', 'Sleman'),
('1000000018', 1, 'Fitri Handayani', 'fitri.handayani@uad.ac.id', 'P', 18, 'Lektor', 'Tetap', 'Bantul'),
('1000000019', 1, 'Rudi Hartono', 'rudi.hartono@uad.ac.id', 'L', 19, 'Guru Besar', 'Tetap', 'Yogyakarta'),
('1000000020', 1, 'Anisa Rahmawati', 'anisa.rahmawati@uad.ac.id', 'P', 20, 'Asisten Ahli', 'Tetap', 'Surakarta'),
('1000000021', 1, 'Hendra Wijaya', 'hendra.wijaya@uad.ac.id', 'L', 21, 'Lektor', 'Tetap', 'Semarang'),
('1000000022', 1, 'Nur Aisyah', 'nur.aisyah@uad.ac.id', 'P', 22, 'Lektor Kepala', 'Tetap', 'Yogyakarta'),
('1000000023', 1, 'Rizal Maulana', 'rizal.maulana@uad.ac.id', 'L', 23, 'Asisten Ahli', 'Tetap', 'Malang'),
('1000000024', 1, 'Dian Kartika', 'dian.kartika@uad.ac.id', 'P', 24, 'Lektor', 'Tetap', 'Bandung'),
('1000000025', 1, 'Arif Setiawan', 'arif.setiawan@uad.ac.id', 'L', 25, 'Guru Besar', 'Tetap', 'Yogyakarta'),
('1000000026', 1, 'Intan Permata', 'intan.permata@uad.ac.id', 'P', 26, 'Lektor', 'Tetap', 'Purworejo'),
('1000000027', 1, 'Bayu Kurniawan', 'bayu.kurniawan@uad.ac.id', 'L', 27, 'Asisten Ahli', 'Tetap', 'Magelang'),
('1000000028', 1, 'Salsa Nabila', 'salsa.nabila@uad.ac.id', 'P', 28, 'Lektor', 'Tetap', 'Yogyakarta'),
('1000000029', 1, 'Teguh Prasetyo', 'teguh.prasetyo@uad.ac.id', 'L', 29, 'Lektor Kepala', 'Tetap', 'Klaten'),
('1000000030', 1, 'Wulan Safitri', 'wulan.safitri@uad.ac.id', 'P', 30, 'Asisten Ahli', 'Tetap', 'Semarang'),
('1000000031', 1, 'Iqbal Firmansyah', 'iqbal.firmansyah@uad.ac.id', 'L', 31, 'Lektor', 'Tetap', 'Yogyakarta'),
('1000000032', 1, 'Aulia Rahman', 'aulia.rahman@uad.ac.id', 'P', 32, 'Lektor', 'Tetap', 'Solo'),
('1000000033', 1, 'Fikri Akbar', 'fikri.akbar@uad.ac.id', 'L', 33, 'Guru Besar', 'Tetap', 'Bandung'),
('1000000034', 1, 'Citra Larasati', 'citra.larasati@uad.ac.id', 'P', 34, 'Asisten Ahli', 'Tetap', 'Yogyakarta'),
('1000000035', 1, 'Rangga Saputro', 'rangga.saputro@uad.ac.id', 'L', 35, 'Lektor Kepala', 'Tetap', 'Sleman'),
('1000000036', 1, 'Nisa Khairunnisa', 'nisa.khairunnisa@uad.ac.id', 'P', 36, 'Lektor', 'Tetap', 'Bantul'),
('1000000037', 1, 'Galih Wicaksono', 'galih.wicaksono@uad.ac.id', 'L', 37, 'Asisten Ahli', 'Tetap', 'Semarang'),
('1000000038', 1, 'Ayu Maharani', 'ayu.maharani@uad.ac.id', 'P', 38, 'Lektor', 'Tetap', 'Surabaya'),
('1000000039', 1, 'Bagus Nugraha', 'bagus.nugraha@uad.ac.id', 'L', 39, 'Lektor Kepala', 'Tetap', 'Yogyakarta'),
('1000000040', 1, 'Shinta Oktaviani', 'shinta.oktaviani@uad.ac.id', 'P', 40, 'Guru Besar', 'Tetap', 'Jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel fakultas
--

CREATE TABLE fakultas (
  id_fakultas int NOT NULL,
  id_univ int DEFAULT NULL,
  nama_fakultas varchar(100) DEFAULT NULL
) ;

--
-- Dumping data untuk tabel fakultas
--

INSERT INTO fakultas (id_fakultas, id_univ, nama_fakultas) VALUES
(1, 1, 'Fakultas Agama Islam'),
(2, 1, 'Fakultas Ekonomi dan Bisnis'),
(3, 1, 'Fakultas Farmasi'),
(4, 1, 'Fakultas Hukum'),
(5, 1, 'Fakultas Keguruan dan Ilmu Pendidikan'),
(6, 1, 'Fakultas Kedokteran'),
(7, 1, 'Fakultas Kesehatan Masyarakat'),
(8, 1, 'Fakultas Psikologi'),
(9, 1, 'Fakultas Sastra, Budaya, dan Komunikasi'),
(10, 1, 'Fakultas Sains dan Teknologi Terapan'),
(11, 1, 'Fakultas Teknologi Industri');

-- --------------------------------------------------------

--
-- Struktur dari tabel prodi
--

CREATE TABLE prodi (
  id_prodi int NOT NULL,
  id_fakultas int DEFAULT NULL,
  id_univ int DEFAULT NULL,
  nama_prodi varchar(100) DEFAULT NULL
) ;

--
-- Dumping data untuk tabel prodi
--

INSERT INTO prodi (id_prodi, id_fakultas, id_univ, nama_prodi) VALUES
(1, 1, 1, 'Pendidikan Agama Islam'),
(2, 1, 1, 'Bahasa dan sastra arab'),
(3, 1, 1, 'Ilmu Hadis'),
(4, 1, 1, 'Perbankan Syariah'),
(5, 2, 1, 'Manajemen'),
(6, 2, 1, 'Akuntansi'),
(7, 2, 1, 'Ekonomi Pembangunan'),
(8, 3, 1, 'Farmasi'),
(9, 3, 1, 'Pendidikan Profesi Apoteker'),
(10, 4, 1, 'Ilmu Hukum'),
(11, 5, 1, 'Pendidikan Bahasa Inggris'),
(12, 5, 1, 'Pendidikan Bahasa dan Sastra Indonesia'),
(13, 5, 1, 'Pendidikan Matematika'),
(14, 5, 1, 'Pendidikan Biologi'),
(15, 5, 1, 'Pendidikan Fisika'),
(16, 5, 1, 'Pendidikan Guru Sekolah Dasar'),
(17, 5, 1, 'Pendidikan Guru Pendidikan Anak Usia Dini'),
(18, 5, 1, 'Bimbingan Konseling'),
(19, 5, 1, 'Pendidikan Pancasila dan Kewarganegaraan'),
(20, 5, 1, 'Pendidikan Vokasional Teknologi Otomotif '),
(21, 5, 1, 'Pendidikan Vokasional Teknik Elektro'),
(23, 6, 1, 'Kedokteran'),
(24, 7, 1, 'Kesehatan Masyarakat'),
(25, 7, 1, 'Gizi'),
(27, 8, 1, 'Psikologi'),
(28, 9, 1, 'Ilmu Komunikasi'),
(29, 9, 1, 'Sastra Inggris'),
(30, 9, 1, 'Sastra Indonesia'),
(31, 10, 1, 'Biologi'),
(32, 10, 1, 'Fisika'),
(33, 10, 1, 'Kimia'),
(34, 10, 1, 'Matematika'),
(35, 10, 1, 'Sistem Informasi'),
(36, 11, 1, 'Teknik Informatika'),
(37, 11, 1, 'Teknik Industri'),
(38, 11, 1, 'Teknik Elektro'),
(39, 11, 1, 'Teknik Kimia'),
(40, 11, 1, 'Teknilogi Pangan');

-- --------------------------------------------------------

--
-- Struktur dari tabel univeristas
--

CREATE TABLE univeristas (
  id_univ int NOT NULL,
  nama_univ varchar(100) DEFAULT NULL,
  kode_pt int DEFAULT NULL,
  alamat text DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Struktur dari tabel universitas
--

CREATE TABLE universitas (
  id_univ int NOT NULL,
  nama_univ varchar(100) DEFAULT NULL,
  kode_pt int DEFAULT NULL,
  alamat text DEFAULT NULL
) ;

--
-- Dumping data untuk tabel universitas
--

INSERT INTO universitas (id_univ, nama_univ, kode_pt, alamat) VALUES
(1, 'Universitas Ahmad Dahlan', 51013, 'Jl. Kapas No. 9, Semaki, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55166');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel dosen
--
ALTER TABLE dosen
  ADD PRIMARY KEY (NIDN);

--
-- Indeks untuk tabel fakultas
--
ALTER TABLE fakultas
  ADD PRIMARY KEY (id_fakultas);

--
-- Indeks untuk tabel prodi
--
ALTER TABLE prodi
  ADD PRIMARY KEY (id_prodi);

--
-- Indeks untuk tabel univeristas
--
ALTER TABLE univeristas
  ADD PRIMARY KEY (id_univ);

--
-- Indeks untuk tabel universitas
--
ALTER TABLE universitas
  ADD PRIMARY KEY (id_univ);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# 🚀 Datains Capstone Project

Project berbasis **Microservices** yang terdiri dari:

- **Frontend** → React
- **Backend** → FastAPI
- **Database** → PostgreSQL
- **BI Tool** → Apache Superset

---

# 🛠️ Persiapan Awal

Sebelum menjalankan project, pastikan:

- Docker Desktop (Windows) atau Docker Engine (Linux) sudah terinstal
- Port berikut tidak sedang digunakan aplikasi lain:
  - `5432` → PostgreSQL
  - `3000` → Frontend React
  - `8000` → FastAPI Backend
  - `8088` → Apache Superset

---

# 🚦 Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone <repository-url>
cd datains-capstone
```

---

## 2. Jalankan Semua Service

Buka Terminal/PowerShell pada folder project, lalu jalankan:

```bash
docker compose up -d --build
```

> Gunakan `sudo docker compose up -d --build` jika menggunakan Linux dan belum mengatur Docker non-root user.

---

## 3. Akses Service

Setelah semua container berjalan, akses melalui browser:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API Docs | http://localhost:8000/docs |
| Apache Superset | http://localhost:8088 |

---

# 🔑 Setup Apache Superset

Jika pertama kali menjalankan project, lakukan inisialisasi admin Superset.

## 1. Buat User Admin

```bash
docker exec -it datains_superset superset fab create-admin \
--username admin \
--firstname Superset \
--lastname Admin \
--email admin@fab.org \
--password admin123
```

---

## 2. Inisialisasi Database Superset

```bash
docker exec -it datains_superset superset db upgrade

docker exec -it datains_superset superset init
```

---

## 3. Login Superset

Gunakan akun berikut:

```text
Username : admin
Password : admin123
```

---

# ⚠️ Catatan Pengembangan

## 1. Backend (FastAPI)

Saat ini beberapa import dan route pada file:

```text
app/api/v1/router.py
```

masih dalam kondisi di-comment, seperti:

- auth
- mahasiswa
- dosen
- dan endpoint lainnya

Hal ini dilakukan karena beberapa file pada folder:

```text
app/api/v1/endpoints/
```

masih belum lengkap.

Untuk sementara hanya endpoint **Akademik** yang diaktifkan agar backend dapat berjalan tanpa error.

---

## 2. Database Connection

Saat menghubungkan Apache Superset ke PostgreSQL, gunakan host berikut:

```text
datains_warehouse
```

> Jangan menggunakan `localhost` karena koneksi dilakukan antar-container Docker.

---

# 📂 Struktur Folder

```text
datains-capstone/
│
├── backend/              # FastAPI Source Code
├── frontend/             # React Source Code
├── superset/             # Apache Superset Configurations
├── docker-compose.yml    # Main Docker Configuration
└── README.md
```

---

# 💡 Tips Pengembangan

## Restart Backend Saja

Jika hanya melakukan perubahan pada backend:

```bash
docker compose restart backend
```

---

## Mematikan Semua Service

```bash
docker compose down
```

---

# 👥 Catatan untuk Tim

- Pastikan selalu melakukan `git pull` sebelum mulai development
- Gunakan branch masing-masing untuk fitur baru
- Hindari mengubah konfigurasi utama tanpa koordinasi tim
- Pastikan container berjalan normal sebelum melakukan commit
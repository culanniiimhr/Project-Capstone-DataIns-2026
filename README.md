# 🚀 Datains Capstone Project (EduInsight)

Platform Dashboard Analytics & Business Intelligence Akademik Perguruan Tinggi berbasis **Microservices**.

---

## 🌐 Link Layanan Produksi (Live Endpoints)

| Service | Deskripsi | Link Akses Produksi |
| :--- | :--- | :--- |
| **Frontend Web** | Antarmuka Pengguna Utama (React) | [https://eduinsight.windsight.id](https://eduinsight.windsight.id) |
| **Backend API** | FastAPI REST Services | [https://api-eduinsight.windsight.id/docs](https://api-eduinsight.windsight.id/docs) |
| **Apache Superset** | BI Dashboard Visualization | [https://dash.varguard.id](https://dash.varguard.id) |
| **n8n AI Engine** | Workflow Agent AI Chatbot | [https://n8n.varguard.id](https://n8n.varguard.id) |
| **Database Warehouse** | Supabase Cloud PostgreSQL | Managed via Supabase |

---

## 🛠️ Persiapan Awal Lokal (Local Development)

Sebelum menjalankan project di lokal, pastikan:
- Docker Desktop (Windows/Mac) atau Docker Engine (Linux) telah terinstal.
- Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

---

## 🚦 Cara Menjalankan Project (Docker Compose)

### 1. Clone Repository & Checkout Main

```bash
git clone <repository-url>
cd datains-capstone
git checkout feat/etl-data-warehouse
```

### 2. Jalankan Semua Service

```bash
docker compose up -d --build
```

### 3. Akses Service Lokal

| Service | Port Lokal | URL |
|---|---|---|
| Frontend | `3005` | http://localhost:3005 |
| Backend API Docs | `8005` | http://localhost:8005/docs |
| Apache Superset | `8088` | http://localhost:8088 |

---

## 📂 Struktur Folder Proyek

```text
datains-capstone/
│
├── backend/              # FastAPI Source Code & Database Models
├── frontend/             # React Source Code (Pages, Components, Assets)
├── etl/                  # ETL Pipeline Services & Dockerfile
├── superset/             # Apache Superset Configurations
├── nginx/                # Reverse Proxy Configuration
├── docs/                 # Dokumentasi Proyek & Dokumen SRS (Software Requirements Specification)
│   └── SRS.md            # Dokumen Spesifikasi Kebutuhan Perangkat Lunak
├── .env.example          # Template Variabel Lingkungan
├── docker-compose.yml    # Orkestrasi Docker Microservices
└── README.md
```

---

## 📄 Dokumentasi Tambahan

Dokumentasi spesifikasi lengkap aplikasi (SRS) dapat diakses pada file [docs/SRS.md](file:///home/akbarydhh/Downloads/datains-capstone/docs/SRS.md).
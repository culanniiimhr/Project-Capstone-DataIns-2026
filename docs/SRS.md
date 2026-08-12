# Dokumen Spesifikasi Kebutuhan Perangkat Lunak (SRS)
## Datains Capstone - Platform Dashboard Analytics & Business Intelligence Akademik

---

## 📋 1. Pendahuluan

### 1.1 Latar Belakang & Tujuan
**Datains Capstone** (EduInsight) adalah platform berbasis web untuk visualisasi data, analitik bisnis (*Business Intelligence*), dan kecerdasan buatan (*AI Agent*) yang dirancang khusus untuk lingkungan perguruan tinggi / akademik. System ini mengintegrasikan data operasional akademik dan data SDM ke dalam sebuah *Data Warehouse* untuk menyajikan statistik interaktif, pemantauan Indikator Kinerja Utama (IKU), dashboard pimpinan, serta fitur bantuan berbasis AI (Chatbot).

### 1.2 Lingkup Sistem
Platform ini dikembangkan dengan arsitektur **Microservices** terisolasi yang diorkestrasi menggunakan Docker Compose dan disajikan melalui domain publik yang disediakan oleh mitra industri.

---

## 🌐 2. Lingkungan Produksi & Service Endpoints

| Service / Komponen | Deskripsi & Peran | URL / Link Akses | Lisensi / Akses Mitra |
| :--- | :--- | :--- | :--- |
| **Frontend Web App** | Antarmuka Pengguna Utama (React + Tailwind) | `https://eduinsight.windsight.id` | Domain Publik Mitra |
| **Backend REST API** | Service API Utama (FastAPI + Python) | `https://api-eduinsight.windsight.id/` | Domain Publik Mitra |
| **Data Warehouse DB** | Database Utama & Analytics (PostgreSQL) | [Supabase Dashboard](https://supabase.com/dashboard/project/zuooajizxhtsxswdwcha) | Cloud Managed (Supabase) |
| **BI Tool (Superset)** | Visualisasi Chart & Embedded Dashboard | `https://dash.varguard.id` | Hosted Instance Mitra |
| **AI Agent (n8n)** | Workflow Engine untuk Chatbot & Otomasi AI | `https://n8n.varguard.id` | Hosted Instance Mitra |

---

## 🏗️ 3. Arsitektur Sistem & Spesifikasi Teknis

### 3.1 Gambaran Arsitektur (Microservices)

```
[ User Browser ]
       │
       ├──────────────────────────────┐
       ▼                              ▼
┌──────────────┐              ┌──────────────┐
│   Frontend   │              │   Superset   │
│   (React)    │              │  (BI Dashboard)
└──────┬───────┘              └──────┬───────┘
       │                              │
       ▼                              │
┌──────────────┐                      │
│ Backend API  │                      │
│  (FastAPI)   │                      │
└──────┬───────┘                      │
       │                              │
       ├──────────────┬───────────────┤
       ▼              ▼               ▼
┌─────────────┐ ┌───────────┐ ┌──────────────┐
│  OLTP DB    │ │  SDM DB   │ │ Warehouse DB │
│ (PostgreSQL)│ │(Postgres) │ │  (Supabase)  │
└─────────────┘ └───────────┘ └──────────────┘
       ▲
       │
┌─────────────┐
│  AI Agent   │
│   (n8n)     │
└─────────────┘
```

### 3.2 Spesifikasi Teknologi (Tech Stack)
- **Frontend**: React.js, TypeScript, Tailwind CSS, Recharts / Chart.js.
- **Backend**: FastAPI (Python 3.10), SQLAlchemy, Pydantic, Uvicorn.
- **Database**: PostgreSQL (OLTP & SDM), Supabase (OLAP Data Warehouse).
- **Business Intelligence**: Apache Superset.
- **AI Agent & Workflows**: n8n Workflow Manager + Groq LLM API.
- **Deployment & Proxy**: Docker, Docker Compose, Nginx Reverse Proxy.

---

## ⚙️ 4. Spesifikasi Kebutuhan Fungsional (Functional Requirements)

### 4.1 Modul Dashboard Analytics
- **FR-DASH-01 (Dashboard Utama)**: Menampilkan *executive summary*, kartu statistik umum, dan grafis tren universitas.
- **FR-DASH-02 (Dashboard Akademik)**: Menampilkan rincian data mahasiswa, program studi, kelulusan, dan IPK rata-rata.
- **FR-DASH-03 (Dashboard IKU)**: Pemantauan pencapaian 8 Indikator Kinerja Utama Perguruan Tinggi secara visual.
- **FR-DASH-04 (Dashboard Pimpinan)**: Menyajikan grafik strategis khusus pengambil keputusan/Rektorat.
- **FR-DASH-05 (Dashboard Sistem)**: Menampilkan status kesehatan service, penggunaan database, dan statistik server.

### 4.2 Modul Chatbot AI & BI Integration
- **FR-AI-01**: Pengguna dapat berinteraksi dengan AI Chatbot ([Chatbot.tsx](file:///home/akbarydhh/Downloads/datains-capstone/frontend/src/pages/Chatbot.tsx)) untuk mengueri informasi akademik dan analitik data.
- **FR-AI-02**: Sistem menghubungkan pertanyaan pengguna ke workflow n8n untuk mendapatkan jawaban kecerdasan buatan secara *real-time*.
- **FR-BI-01**: Embedding dashboard visualisasi Apache Superset ke dalam halaman frontend secara dinamis.

---

## 🔒 5. Kebutuhan Non-Fungsional (Non-Functional Requirements)

- **NFR-PERF-01**: Respon API FastAPI rata-rata di bawah 500 ms untuk kueri standar.
- **NFR-SEC-01**: Transmisi data wajib menggunakan protokol terenkripsi HTTPS/SSL.
- **NFR-SEC-02**: Seluruh secret key dan kredensial sensitif disimpan terisolasi di file `.env` (tidak di-commit ke Git).
- **NFR-PORT-01**: Seluruh service dapat di-build dan dijalankan ulang menggunakan `docker compose up -d --build` pada environment Linux/Windows yang memiliki Docker Engine.

---

## 🚀 6. Panduan Instalasi & Deployment

### 6.1 Menjalankan di Lingkungan Lokal (Local Development)

1. **Clone Repository & Checkout Branch**:
   ```bash
   git clone <repository-url>
   cd datains-capstone
   git checkout feat/etl-data-warehouse
   ```

2. **Setup File Environment**:
   ```bash
   cp .env.example .env
   # Sesuaikan isi variabel di .env jika diperlukan
   ```

3. **Jalankan Docker Compose**:
   ```bash
   docker compose up -d --build
   ```

4. **Akses Service Lokal**:
   - Frontend: `http://localhost:3005`
   - Backend Docs: `http://localhost:8005/docs`
   - Superset Lokal: `http://localhost:8088`



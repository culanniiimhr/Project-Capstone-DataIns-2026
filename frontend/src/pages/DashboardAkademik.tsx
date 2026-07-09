import { useState, useEffect } from "react"; 
import Layout from "../components/Layout";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";
import { FilterProvider } from "../context/FilterContext";
import api from "../lib/api"; 

/* ─── GLOBAL STYLES ─────────────────────────────────── */
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .card-hover {
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, border-color 0.22s ease;
    will-change: transform; cursor:pointer;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 12px 28px rgba(30,58,138,0.13), 0 2px 8px rgba(30,58,138,0.07);
    border-color: #BFDBFE !important;
  }
  .kpi-card { animation: fadeInUp 0.4s ease both; }
  .kpi-card:nth-child(1){animation-delay:0.05s}
  .kpi-card:nth-child(2){animation-delay:0.10s}
  .kpi-card:nth-child(3){animation-delay:0.15s}
  .kpi-card:nth-child(4){animation-delay:0.20s}
`;

/* ─── ICONS ─────────────────────────────────────────── */
const IconInfo = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
const IconStar = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;

const IconBarChartKPI = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <rect x="10" y="7" width="4" height="14" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <polyline points="3,12 10,7 17,3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const IconStudents = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <path d="M3 21v-1a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v1" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <circle cx="17.5" cy="9" r="2.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <path d="M21 21v-1a4 4 0 0 0-3-3.87" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
);
const IconGraduate = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <polygon points="12,3 22,8 12,13 2,8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M6 10.5v5c0 2.5 2.7 3.5 6 3.5s6-1 6-3.5v-5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <line x1="22" y1="8" x2="22" y2="14" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="22" cy="15" r="1" fill="#2563EB" />
  </svg>
);
const IconTarget = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="5.5" fill="white" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <line x1="12" y1="2" x2="12" y2="5.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="12" y1="18.5" x2="12" y2="22" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="2" y1="12" x2="5.5" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="18.5" y1="12" x2="22" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* ─── HOVER CARD ─────────────────────────────────────── */
function HoverCard({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", ...style }}>
      {children}
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────── */
export default function DashboardAkademik() {
  const [tahunAkademik, setTahunAkademik] = useState("");
  const [semester, setSemester] = useState("");

  // 🌟 Inisialisasi awal ke angka 0 biar kelihatan transisi loading datanya
  const [academicData, setAcademicData] = useState({
    rata_rata_ipk: 0,
    kehadiran_mahasiswa: 0,
    mahasiswa_aktif: 0,
    rata_rata_sks: 0
  });

  useEffect(() => {
    // 🌟 PATH DIPERBAIKI: Langsung menembak ke endpoint router backend tanpa sub-path penyasar
    api.get("/dashboard-utama/academic-summary")
      .then((res) => {
        if (res.data.status === "success" && res.data.data) {
          setAcademicData(res.data.data);
        }
      })
      .catch((err) => console.error("Gagal sinkronisasi data akademik dari Supabase:", err));
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <Layout
        title="Dashboard Academic"
        active="Akademik"
        filters={{
          tahunAkademik,
          semester,
          setTahunAkademik,
          setSemester,
        }}
      >
        {/* ── KPI CARDS (Dibuat Eksplisit & Reaktif 100%) ── */}
<div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
  
  {/* Card 1: Rata-rata IPK */}
  <div className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <IconBarChartKPI />
      <IconInfo />
    </div>
    <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>Rata-rata IPK</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>
      {academicData.rata_rata_ipk !== undefined && academicData.rata_rata_ipk !== null ? academicData.rata_rata_ipk.toFixed(2).replace('.', ',') : "0,00"}
    </div>
    <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
      0,15 (4,55%)
    </div>
    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
  </div>

  {/* Card 2: Kehadiran Mahasiswa */}
  <div className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <IconStudents />
      <IconInfo />
    </div>
    <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>Kehadiran Mahasiswa</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>
      {academicData.kehadiran_mahasiswa !== undefined && academicData.kehadiran_mahasiswa !== null ? `${academicData.kehadiran_mahasiswa.toFixed(1).replace('.', ',')}%` : "0,0%"}
    </div>
    <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
      3,12%
    </div>
    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
  </div>

  {/* Card 3: Mahasiswa Aktif */}
  <div className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <IconGraduate />
      <IconInfo />
    </div>
    <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>Mahasiswa Aktif</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>
      {academicData.mahasiswa_aktif ? academicData.mahasiswa_aktif.toLocaleString('id-ID') : "0"}
    </div>
    <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
      4,21%
    </div>
    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
  </div>

  {/* Card 4: Rata-rata SKS */}
  <div className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <IconTarget />
      <IconInfo />
    </div>
    <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>Rata-rata SKS</div>
    <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>
      {academicData.rata_rata_sks !== undefined && academicData.rata_rata_sks !== null ? academicData.rata_rata_sks.toFixed(1).replace('.', ',') : "0,0"}
    </div>
    <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
      1,25
    </div>
    <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
  </div>

</div>

        {/* ── ROW 2: Tren IPK + Distribusi Nilai ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Tren IPK Rata-rata</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.trenIpk}
                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Distribusi Nilai Mahasiswa</p>
            </div>
             <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.distribusiNilai}
                contentClassName="w-[125%] h-[118%] -translate-x-[65px] -translate-y-[80px] scale-[1.0] origin-top-left"
              />
            </div>
          </HoverCard>
        </div>

        {/* ── ROW 3: Beban Studi + Perbandingan Fakultas + Tren Kehadiran ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <HoverCard style={{ padding: "16px 16px 10px" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Rata-rata Beban Studi (SKS)</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.bebanStudi}
                contentClassName="w-[160%] h-[170%] -translate-x-[70px] -translate-y-[85px] scale-[0.9] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "16px 16px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: 0 }}>Perbandingan IPK Fakultas</p>
              <IconInfo />
            </div>
            <div className="h-[300px] w-full overflow-hidden">
              <SupersetEmbedDefault
                  dashboardId={supersetDashboards.performaProdi}
                  contentClassName="w-[135%] h-[118%] -translate-x-[70px] -translate-y-[95px] scale-[1.07] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "16px 16px 10px" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Tren Kehadiran (%)</p>
            <div className="h-[300px] w-full overflow-hidden">
                <SupersetEmbedDefault
                    dashboardId={supersetDashboards.trenKehadiran}
                    contentClassName="w-[155%] h-[135%] -translate-x-[65px] -translate-y-[70px] scale-[0.9] origin-top-left"
                />
            </div>
          </HoverCard>
        </div>

        {/* ── INSIGHT BANNER ── */}
        <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", padding: "14px 20px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ width: 36, height: 36, background: "#FEF9C3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconStar />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E3A8A", marginBottom: 3 }}>Insight Otomatis</div>
              <div style={{ fontSize: 12.5, color: "#475569", lineHeight: 1.55 }}>
                IPK rata-rata meningkat <span style={{ color: "#2563EB", fontWeight: 600 }}>0,15 poin</span> dibandingkan semester lalu.
                Peningkatan tertinggi pada <span style={{ color: "#2563EB", fontWeight: 600 }}>Prodi Informatika (+0,20)</span> dan <span style={{ color: "#2563EB", fontWeight: 600 }}>Manajemen (+0,18)</span>.
              </div>
            </div>
          </div>
          <button style={{ flexShrink: 0, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "8px 16px", color: "#1D4ED8", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
            Lihat Insight Lainnya
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>

        {/* ── ROW 4: Top 5 Mahasiswa + Mahasiswa Berisiko ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Top 5 Mahasiswa (IPK Tertinggi)</p>
              <button style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Lihat selengkapnya</button>
            </div>
            <div className="h-[320px] w-full overflow-hidden">
                <SupersetEmbedDefault
                    dashboardId={supersetDashboards.topMahasiswa}
                    contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
                />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Mahasiswa Berisiko (Perlu Perhatian)</p>
              <button style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Lihat selengkapnya</button>
            </div>
            <div className="h-[320px] w-full overflow-hidden">
                <SupersetEmbedDefault
                    dashboardId={supersetDashboards.mhsBeresiko}
                    contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
                />
            </div>
          </HoverCard>
        </div>
      </Layout>
    </>
  );
}
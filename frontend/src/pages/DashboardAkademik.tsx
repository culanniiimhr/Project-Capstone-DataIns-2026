import { useState } from "react";
import Layout from "../components/Layout";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";
import { FilterProvider } from "../context/FilterContext";

/* ─── GLOBAL STYLES ─────────────────────────────────── */
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scaleUp {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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
  .nav-btn { transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease; }
  .nav-btn:hover:not(.active) {
    background: #EFF6FF !important; color: #1D4ED8 !important; transform: translateX(3px);
  }
  .tr-hover { transition: background 0.15s ease; }
  .tr-hover:hover { background: #EFF6FF !important; }
  .bar-item { transition: opacity 0.15s ease; }
  .bar-item:hover { opacity: 0.82; }
`;

/* ─── ICONS ─────────────────────────────────────────── */
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
const IconPerson = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>;
const IconAkademik = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
const IconMonitor = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
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

/* ─── CUSTOM TOOLTIP ─────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#334155" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ margin: "2px 0", color: p.color || "#2563EB" }}>
          {p.name}: <strong>{typeof p.value === "number" && p.value < 10 ? p.value.toFixed(2) : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

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
  const [showIpkInfo, setShowIpkInfo] = useState(false);
  const [showKehadiranInfo, setShowKehadiranInfo] = useState(false);
  const [showMahasiswaAktifInfo, setShowMahasiswaAktifInfo] = useState(false);
  const [showRataSksInfo, setShowRataSksInfo] = useState(false);
  const [showPerbandinganIpkInfo, setShowPerbandinganIpkInfo] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <Layout
        title="Dashboard Akademik"
        active="Akademik"
        filters={{
          tahunAkademik,
          semester,
          setTahunAkademik,
          setSemester,
        }}
      >
        {/* ── KPI CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { icon: <IconBarChartKPI />, label: "Rata-rata IPK", value: "3,45", change: "0,15 (4,55%)" },
            { icon: <IconStudents />, label: "Kehadiran Mahasiswa", value: "92,3%", change: "3,12%" },
            { icon: <IconGraduate />, label: "Mahasiswa Aktif", value: "12.458", change: "4,21%" },
            { icon: <IconTarget />, label: "Rata-rata SKS", value: "20,3", change: "1,25" },
          ].map(({ icon, label, value, change }) => (
            <div key={label} className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                {icon}
                {label === "Rata-rata IPK" ? (
                  <div
                      onClick={() => setShowIpkInfo(true)}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                      <IconInfo />
                  </div>
                ) : label === "Kehadiran Mahasiswa" ? (
                  <div
                      onClick={() => setShowKehadiranInfo(true)}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                      <IconInfo />
                  </div>
                ) : label === "Mahasiswa Aktif" ? (
                  <div
                      onClick={() => setShowMahasiswaAktifInfo(true)}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                      <IconInfo />
                  </div>
                ) : label === "Rata-rata SKS" ? (
                  <div
                      onClick={() => setShowRataSksInfo(true)}
                      style={{ cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                      <IconInfo />
                  </div>
                ) : (
                  <IconInfo />
                )}
              </div>
              <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>{value}</div>
              <div style={{ fontSize: 12, color: "#16A34A", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
                {change}
              </div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
            </div>
          ))}
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

          {/* Beban Studi */}
          <HoverCard style={{ padding: "16px 16px 10px" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Rata-rata Beban Studi (SKS)</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.bebanStudi}
                contentClassName="w-[160%] h-[170%] -translate-x-[70px] -translate-y-[85px] scale-[0.9] origin-top-left"
              />
            </div>
          </HoverCard>

          {/* Perbandingan IPK Fakultas */}
          <HoverCard style={{ padding: "16px 16px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: 0 }}>Perbandingan IPK Fakultas</p>
              <div 
                  onClick={() => setShowPerbandinganIpkInfo(true)}
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                  <IconInfo />
              </div>
            </div>
            <div className="h-[300px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.performaProdi}
                contentClassName="w-[135%] h-[118%] -translate-x-[70px] -translate-y-[95px] scale-[1.07] origin-top-left"
              />
            </div>
          </HoverCard>

          {/* Tren Kehadiran */}
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

        </div>

        {/* ── ROW 4: Top 5 Mahasiswa + Mahasiswa Berisiko ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Top 5 */}
          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Top 5 Mahasiswa (IPK Tertinggi)</p>
            </div>
            <div className="h-[320px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.topMahasiswa}
                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
              />
            </div>
          </HoverCard>

          {/* Mahasiswa Berisiko */}
          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Mahasiswa Berisiko (Perlu Perhatian)</p>
            </div>
            <div className="h-[320px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.mhsBeresiko}
                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
              />
            </div>
          </HoverCard>

        </div>



        {/* IPK Info Pop up*/}
        {showIpkInfo && (
            <div
                onClick={() => setShowIpkInfo(false)}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeIn 0.2s ease",
                    backdropFilter: "blur(2px)"
                } as any}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "40px 32px",
                        width: "420px",
                        maxWidth: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <div style={{
                        background: "#F8FAFC",
                        width: 72, height: 72,
                        borderRadius: 18,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 24px",
                        border: "1px solid #F1F5F9"
                    }}>
                        <div style={{
                            background: "#0F3294",
                            width: 36, height: 36,
                            borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontWeight: "700", fontSize: 20, fontStyle: "italic",
                            fontFamily: "serif"
                        }}>
                            i
                        </div>
                    </div>
                    <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Rata-rata IPK</h3>
                    <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                        Nilai rata-rata Indeks Prestasi Kumulatif seluruh mahasiswa aktif pada semester berjalan.
                    </p>
                </div>
            </div>
        )}

        {/* Kehadiran Info Pop up */}
        {showKehadiranInfo && (
            <div
                onClick={() => setShowKehadiranInfo(false)}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeIn 0.2s ease",
                    backdropFilter: "blur(2px)"
                } as any}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "44px 32px",
                        width: "420px",
                        maxWidth: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="#0F3294">
                          <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-6.5 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-12.7 1.5c-.32.32-.61.68-.86 1.08C4.34 14.15 4 14.82 4 15.54V17H1.5v-1.5c0-1.11.58-2.14 1.53-2.65 1.13-.6 2.37-1 3.77-1.35zm12.4 0c1.4.35 2.64.75 3.77 1.35.95.51 1.53 1.54 1.53 2.65V17H20v-1.46c0-.72-.34-1.39-.94-1.96-.25-.4-.54-.76-.86-1.08z"/>
                        </svg>
                    </div>
                    <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Kehadiran Mahasiswa</h3>
                    <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                        Persentase rata-rata kehadiran mahasiswa dalam kegiatan perkuliahan tatap muka.
                    </p>
                </div>
            </div>
        )}

        {/* Mahasiswa Aktif Info Pop up */}
        {showMahasiswaAktifInfo && (
            <div
                onClick={() => setShowMahasiswaAktifInfo(false)}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeIn 0.2s ease",
                    backdropFilter: "blur(2px)"
                } as any}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "44px 32px",
                        width: "420px",
                        maxWidth: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="#0F3294">
                          <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM12 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-6.5 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm13 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-12.7 1.5c-.32.32-.61.68-.86 1.08C4.34 14.15 4 14.82 4 15.54V17H1.5v-1.5c0-1.11.58-2.14 1.53-2.65 1.13-.6 2.37-1 3.77-1.35zm12.4 0c1.4.35 2.64.75 3.77 1.35.95.51 1.53 1.54 1.53 2.65V17H20v-1.46c0-.72-.34-1.39-.94-1.96-.25-.4-.54-.76-.86-1.08z"/>
                        </svg>
                    </div>
                    <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Mahasiswa Aktif</h3>
                    <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                        Jumlah total mahasiswa yang terdaftar dan melakukan registrasi akademik pada semester berjalan.
                    </p>
                </div>
            </div>
        )}

        {/* Rata-rata SKS Info Pop up */}
        {showRataSksInfo && (
            <div
                onClick={() => setShowRataSksInfo(false)}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeIn 0.2s ease",
                    backdropFilter: "blur(2px)"
                } as any}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "44px 32px",
                        width: "420px",
                        maxWidth: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <div style={{ margin: "0 auto 24px", display: "flex", justifyContent: "center" }}>
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F3294" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <path d="M9 2v8l3-2 3 2V2" />
                        </svg>
                    </div>
                    <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Rata-rata SKS</h3>
                    <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                        Beban studi rata-rata yang diambil oleh mahasiswa dalam satu semester untuk memenuhi syarat kelulusan.
                    </p>
                </div>
            </div>
        )}

        {/* Perbandingan IPK Fakultas Info Pop up */}
        {showPerbandinganIpkInfo && (
            <div
                onClick={() => setShowPerbandinganIpkInfo(false)}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeIn 0.2s ease",
                    backdropFilter: "blur(2px)"
                } as any}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: "#fff",
                        borderRadius: 16,
                        padding: "40px 32px",
                        width: "420px",
                        maxWidth: "90%",
                        textAlign: "center",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        border: "1px solid #E2E8F0"
                    }}
                >
                    <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Perbandingan IPK Fakultas</h3>
                    <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                        Memvisualisasikan perbedaan rata-rata IPK setiap fakultas untuk membantu melakukan evaluasi dan membandingkan capaian akademik antar fakultas.
                    </p>
                </div>
            </div>
        )}
      </Layout>
    </>
  );
}

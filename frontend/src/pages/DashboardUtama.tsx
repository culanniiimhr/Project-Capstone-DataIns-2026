// frontend/src/pages/DashboardUtama.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { VscHubot } from "react-icons/vsc";
import SupersetEmbed from "../components/SupersetEmbed";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";
import { supabase } from "../lib/supabase/supabase";
import { getDashboardInsights } from "../lib/api"; // 1. IMPORT API BACKEND BARU

/* ─── GLOBAL ANIMATION STYLES ───────────────────────── */
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-hover {
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, border-color 0.22s ease;
    will-change: transform;
    cursor: pointer;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 12px 28px rgba(30,58,138,0.13), 0 2px 8px rgba(30,58,138,0.07);
    border-color: #BFDBFE !important;
  }
  .card-hover-sm {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease, background 0.15s ease, border-color 0.15s ease;
    will-change: transform;
    cursor: pointer;
  }
  .card-hover-sm:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(30,58,138,0.12);
    background: #EFF6FF !important;
    border-color: #BFDBFE !important;
  }
  .insight-row {
    transition: background 0.15s ease, transform 0.15s ease;
    border-radius: 8px;
    padding: 6px 8px;
    margin: -6px -8px;
    cursor: default;
  }
  .insight-row:hover {
    background: #F8FAFC;
    transform: translateX(4px);
  }
  .kpi-card {
    animation: fadeInUp 0.4s ease both;
  }
  .kpi-card:nth-child(1) { animation-delay: 0.05s; }
  .kpi-card:nth-child(2) { animation-delay: 0.10s; }
  .kpi-card:nth-child(3) { animation-delay: 0.15s; }
  .kpi-card:nth-child(4) { animation-delay: 0.20s; }
  .kpi-card:nth-child(5) { animation-delay: 0.25s; }
`;

/* ─── SVG ICONS ─────────────────────────────────────── */
const IconBarChart = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <rect x="10" y="7" width="4" height="14" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <polyline points="3,12 10,7 17,3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const IconGraduate = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <polygon points="12,3 22,8 12,13 2,8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M6 10.5v5c0 2.5 2.7 3.5 6 3.5s6-1 6-3.5v-5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <line x1="22" y1="8" x2="22" y2="14" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="22" cy="15" r="1" fill="#2563EB" />
  </svg>
);
const IconStudents = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="7" r="3.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <path d="M3 21v-1a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v1" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    <circle cx="17.5" cy="9" r="2.5" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <path d="M21 21v-1a4 4 0 0 0-3-3.87" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
  </svg>
);
const IconLecturer = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <line x1="8" y1="2" x2="8" y2="5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="16" y1="2" x2="16" y2="5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="2" y1="10" x2="22" y2="10" stroke="#2563EB" strokeWidth="1.4" />
  </svg>
);
const IconTarget = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="5.5" fill="white" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
  </svg>
);
const IconPerson = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>
);
const IconAkademik = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
);
const IconMonitor = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
);
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2" /></svg>
);
const IconInsightUp = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyYContent: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
  </div>
);
const IconInsightDown = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FFE4E6", display: "flex", alignItems: "center", justifyYContent: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
  </div>
);
const QIcon = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#2563EB", flexShrink: 0 }}>{children}</span>
);

function HoverCard({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", ...style }}>
      {children}
    </div>
  );
}

// Interface Penampung Data dari Backend Python
interface InsightItem {
  status: "up" | "down";
  value: string;
  text: string;
}

interface BackendInsights {
  ipk: InsightItem;
  kelulusan: InsightItem;
  kehadiran: InsightItem;
}

/* ─── MAIN COMPONENT ─────────────────────────────── */
export default function DashboardUtama() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State untuk data atas (KPI Ringkasan)
  const [kpiData, setKpiData] = useState({
    rataRataIpk: 2.55,
    tingkatKelulusan: "32,4%",
    totalMahasiswa: 4750,
    totalDosen: 38,
    capaianIku: "78,4%",
  });

  // 2. STATE BARU KHUSUS MENAMPUNG HASIL DARI PYTHON BACKEND
  const [backendInsights, setBackendInsights] = useState<BackendInsights | null>(null);

  useEffect(() => {
    async function fetchRealDashboardKPI() {
      try {
        setLoading(true);

        // Ambil data insight dari Python Backend secara parallel dengan hitungan Supabase ringkasan atas
        const [insightsRes, mhsRows, sdmRows, viewRows] = await Promise.all([
          getDashboardInsights().catch(e => { console.error(e); return null; }),
          supabase.from("view_analisis_akademik_mahasiswa").select("*", { count: "exact", head: true }),
          supabase.from("view_sdm_profil_dosen").select("*", { count: "exact", head: true }),
          supabase.from("view_dashboard_utama").select("rata_rata_ipk, total_lulus, total_mahasiswa")
        ]);

        // Simpan data insight dari Python ke state
        if (insightsRes) {
          setBackendInsights(insightsRes);
        }

        // Kalkulasi data atas (Ringkasan KPI) tetap dipertahankan
        let sumIpk = 0;
        let totalLulusAkumulasi = 0;
        let totalMhsAkumulasi = 0;
        let totalRows = viewRows.data?.length || 0;

        if (viewRows.data && totalRows > 0) {
          viewRows.data.forEach(row => {
            sumIpk += Number(row.rata_rata_ipk || 0);
            totalLulusAkumulasi += Number(row.total_lulus || 0);
            totalMhsAkumulasi += Number(row.total_mahasiswa || 0);
          });
        }

        const tingkatKelulusanReal = totalMhsAkumulasi > 0 
          ? ((totalLulusAkumulasi / totalMhsAkumulasi) * 100).toFixed(1) + "%"
          : "32,4%";

        const finalAvgIpk = totalRows > 0 ? (sumIpk / totalRows) : 2.55;

        setKpiData({
          rataRataIpk: finalAvgIpk,
          totalMahasiswa: mhsRows.count || 4750,
          tingkatKelulusan: tingkatKelulusanReal,     
          totalDosen: sdmRows.count || 38,               
          capaianIku: "78,4%",
        });

      } catch (err) {
        console.error("Gagal sinkronisasi data riil dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRealDashboardKPI();
  }, []);

  return (
    <>
      <style>{globalStyles}</style>
      <Layout title="Dashboard Utama" active="Dashboard Utama">

        {/* KPI Cards Section */}
        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Ringkasan KPI Utama</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { icon: <IconBarChart />, label: "Rata-rata IPK", value: loading ? "..." : kpiData.rataRataIpk.toFixed(2), change: "0,15 (4,55%)" },
            { icon: <IconGraduate />, label: "Tingkat kelulusan", value: loading ? "..." : kpiData.tingkatKelulusan, change: "2,21%" },
            { icon: <IconStudents />, label: "Total Mahasiswa", value: loading ? "..." : kpiData.totalMahasiswa.toLocaleString("id-ID"), change: "4,21%" },
            { icon: <IconLecturer />, label: "Dosen aktif", value: loading ? "..." : kpiData.totalDosen.toLocaleString("id-ID"), change: "1,08%" },
            { icon: <IconTarget />, label: "Capaian IKU", value: kpiData.capaianIku, change: "3,12%" },
          ].map(({ icon, label, value, change }) => (
            <div key={label} className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 16px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
              {icon}
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

        {/* Row 2 — Chart + Map */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <HoverCard style={{ padding: "18px 18px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>
              Tren IPK Setiap Tahun
            </p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.trenIpk}
                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "18px 18px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>
              Sebaran Mahasiswa di Setiap Wilayah
            </p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbed dashboardId={supersetDashboards.sebaranMahasiswa} />
            </div>
          </HoverCard>
        </div>

        {/* Row 3 — Insight + Quick Access */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          
          {/* 3. SECTION INSIGHT OTOMATIS DI-REVISI MENGGUNAKAN DATA MATANG DARI PYTHON */}
          <HoverCard style={{ padding: "18px 20px 16px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 16px" }}>Insight Otomatis</p>
            
            {loading ? (
              <div style={{ fontSize: 13, color: "#64748B", padding: "20px 0" }}>Memuat kalkulasi insight...</div>
            ) : (
              <>
                {/* Baris 1: IPK */}
                {backendInsights?.ipk && (
                  <div className="insight-row" style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    {backendInsights.ipk.status === "up" ? <IconInsightUp /> : <IconInsightDown />}
                    <div>
                      <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                        IPK rata-rata {backendInsights.ipk.status === "up" ? "meningkat" : "menurun"}{" "}
                        <span style={{ color: backendInsights.ipk.status === "up" ? "#16A34A" : "#DC2626", fontWeight: 700 }}>
                          {backendInsights.ipk.value}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>dibandingkan semester lalu.</div>
                    </div>
                  </div>
                )}

                {/* Baris 2: Kelulusan */}
                {backendInsights?.kelulusan && (
                  <div className="insight-row" style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    {backendInsights.kelulusan.status === "up" ? <IconInsightUp /> : <IconInsightDown />}
                    <div>
                      <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                        Tingkat kelulusan {backendInsights.kelulusan.status === "up" ? "meningkat" : "menurun"}{" "}
                        <span style={{ color: backendInsights.kelulusan.status === "up" ? "#16A34A" : "#DC2626", fontWeight: 700 }}>
                          {backendInsights.kelulusan.value}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>dibandingkan semester lalu.</div>
                    </div>
                  </div>
                )}

                {/* Baris 3: Kehadiran */}
                {backendInsights?.kehadiran && (
                  <div className="insight-row" style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    {backendInsights.kehadiran.status === "up" ? <IconInsightUp /> : <IconInsightDown />}
                    <div>
                      <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                        {backendInsights.kehadiran.text}
                      </div>
                      <div style={{ fontSize: 12, color: "#94A3B8" }}>dibandingkan semester lalu.</div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12, textAlign: "center", marginTop: 6 }}>
              <button style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                Lihat Insight selengkapnya
              </button>
            </div>
          </HoverCard>

          {/* Quick Access */}
          <HoverCard style={{ padding: "18px 20px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 16px" }}>Akses Cepat</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { icon: <IconAkademik />, label: "Dashboard Akademik", path: "/dashboard/akademik" },
                { icon: <IconPerson />, label: "Dashboard Pimpinan", path: "/dashboard/pimpinan" },
                { icon: <IconMonitor />, label: "Monitoring IKU", path: "/dashboard/iku" },
                { icon: <IconSettings />, label: "Manajemen Sistem", path: "/dashboard/system" },
              ].map(({ icon, label, path }) => (
                <button key={label} className="card-hover-sm" onClick={() => navigate(path)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "13px 14px",
                  border: "1px solid #E2E8F0", borderRadius: 10,
                  background: "#fff", fontSize: 13, color: "#334155", fontWeight: 500, textAlign: "left",
                }}>
                  <QIcon>{icon}</QIcon>
                  {label}
                </button>
              ))}
            </div>
          </HoverCard>
        </div>

        {/* FAB Floating Button */}
        <button className="fixed bottom-[30px] right-[31px] flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#155EEF] text-white shadow-lg fab-btn" onClick={() => navigate("/chatbot")}>
          <VscHubot className="h-6 w-6 text-white" />
        </button>

      </Layout>
    </>
  );
}
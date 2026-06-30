import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { VscHubot } from "react-icons/vsc";
import SupersetEmbed from "../components/SupersetEmbed";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";

/* ─── DATA ─────────────────────────────────────────── */
const ipkData = [
  { year: "2023/2024", ganjil: 3.12, genap: 3.52 },
  { year: "2024/2025", ganjil: 3.21, genap: 3.64 },
  { year: "2025/2026", ganjil: 3.25, genap: 3.87 },
  { year: "2026/2027", ganjil: 3.29, genap: 3.75 },
];

/* ─── GLOBAL ANIMATION STYLES ───────────────────────── */
const globalStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-hover {
    transition: transform 0.22s cubic-bezier(.34,1.56,.64,1),
                box-shadow 0.22s ease,
                border-color 0.22s ease;
    will-change: transform;
    cursor: pointer;
  }
  .card-hover:hover {
    transform: translateY(-6px) scale(1.015);
    box-shadow: 0 12px 28px rgba(30,58,138,0.13), 0 2px 8px rgba(30,58,138,0.07);
    border-color: #BFDBFE !important;
  }
  .card-hover-sm {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1),
                box-shadow 0.2s ease,
                background 0.15s ease,
                border-color 0.15s ease;
    will-change: transform;
    cursor: pointer;
  }
  .card-hover-sm:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(30,58,138,0.12);
    background: #EFF6FF !important;
    border-color: #BFDBFE !important;
  }
  .nav-btn {
    transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;
  }
  .nav-btn:hover:not(.active) {
    background: #EFF6FF !important;
    color: #1D4ED8 !important;
    transform: translateX(3px);
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
  .fab-btn {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
  }
  .fab-btn:hover {
    transform: scale(1.12) rotate(8deg);
    box-shadow: 0 8px 24px rgba(29,78,216,0.5) !important;
  }
`;

/* ─── ICONS ─────────────────────────────────────────── */
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
    <line x1="7" y1="14" x2="10" y2="14" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="7" y1="16.5" x2="14" y2="16.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconTarget = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="5.5" fill="white" stroke="#2563EB" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
    <line x1="12" y1="2" x2="12" y2="5.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="12" y1="18.5" x2="12" y2="22" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="2" y1="12" x2="5.5" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="18.5" y1="12" x2="22" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconPerson = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
  </svg>
);
const IconAkademik = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const IconMonitor = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconUserCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="9" r="3" />
    <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconInsightUp = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  </div>
);
const IconInsightDown = () => (
  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FFE4E6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
);
const QIcon = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#2563EB", flexShrink: 0 }}>{children}</span>
);

/* ─── INDONESIA MAP ───────────────────────────────── */
function IndonesiaMap() {
  return (
    <svg viewBox="95 55 440 195" style={{ width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
      <path d="M105,175 L113,157 L120,143 L130,128 L143,116 L158,107 L172,104 L180,109 L183,121 L179,136 L172,150 L162,165 L148,178 L133,186 L118,186 L106,180 Z" fill="#2563EB" opacity="0.72" />
      <path d="M188,183 L210,176 L234,172 L260,170 L284,171 L304,175 L315,181 L316,188 L305,196 L280,200 L252,201 L224,199 L200,195 L188,190 Z" fill="#2563EB" opacity="0.72" />
      <path d="M223,112 L246,101 L270,95 L296,92 L320,96 L340,106 L352,120 L356,137 L351,153 L340,165 L322,172 L300,174 L276,169 L255,160 L238,146 L226,131 Z" fill="#2563EB" opacity="0.72" />
      <path d="M362,112 L376,104 L392,101 L404,107 L406,118 L398,130 L384,135 L370,131 L362,122 Z" fill="#2563EB" opacity="0.72" />
      <path d="M368,132 L378,138 L380,153 L375,168 L365,174 L356,168 L355,153 L360,140 Z" fill="#2563EB" opacity="0.72" />
      <path d="M378,138 L397,132 L412,134 L416,147 L408,157 L392,158 L380,150 Z" fill="#2563EB" opacity="0.72" />
      <path d="M430,117 L440,110 L450,113 L452,126 L444,136 L434,131 Z" fill="#2563EB" opacity="0.68" />
      <ellipse cx="437" cy="142" rx="7" ry="12" fill="#2563EB" opacity="0.65" />
      <ellipse cx="454" cy="152" rx="5.5" ry="9" fill="#2563EB" opacity="0.65" />
      <ellipse cx="446" cy="166" rx="5" ry="8" fill="#2563EB" opacity="0.65" />
      <path d="M457,123 L448,116 L444,107 L449,101 L460,104 L467,115 Z" fill="#2563EB" opacity="0.72" />
      <path d="M460,124 L478,113 L500,107 L520,107 L524,118 L520,134 L506,144 L488,149 L468,148 L456,138 L455,129 Z" fill="#2563EB" opacity="0.72" />
      <ellipse cx="323" cy="192" rx="8" ry="5.5" fill="#2563EB" opacity="0.78" />
      <ellipse cx="338" cy="193" rx="6.5" ry="5" fill="#2563EB" opacity="0.74" />
      <path d="M347,192 L368,188 L377,194 L369,202 L349,201 Z" fill="#2563EB" opacity="0.7" />
      <path d="M378,196 L405,190 L415,196 L404,203 L380,203 Z" fill="#2563EB" opacity="0.7" />
      <path d="M416,200 L440,193 L452,196 L450,206 L422,209 L413,206 Z" fill="#2563EB" opacity="0.7" />
      <circle cx="420" cy="175" r="4.5" fill="#2563EB" opacity="0.6" />
      <circle cx="428" cy="183" r="3.5" fill="#2563EB" opacity="0.6" />
      <circle cx="410" cy="168" r="3.5" fill="#2563EB" opacity="0.6" />
      <circle cx="466" cy="160" r="3" fill="#2563EB" opacity="0.55" />
    </svg>
  );
}

/* ─── CUSTOM TOOLTIP ─────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#334155" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ margin: "2px 0", color: p.color }}>{p.name}: <strong>{p.value.toFixed(2)}</strong></p>
      ))}
    </div>
  );
};

/* ─── HOVER CARD WRAPPER ─────────────────────────── */
function HoverCard({ className = "card-hover", style = {}, children }: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className={className} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", ...style }}>
      {children}
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────── */
export default function DashboardUtama() {
  const [tahun, setTahun] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <style>{globalStyles}</style>
      <Layout title="Dashboard Utama" active="Dashboard Utama">

        {/* KPI Cards */}
        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Ringkasan KPI Utama</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 16 }}>
          {[
            { icon: <IconBarChart />, label: "Rata-rata IPK", value: "3,45", change: "0,15 (4,55%)" },
            { icon: <IconGraduate />, label: "Tingkat kelulusan", value: "87,6%", change: "2,21%" },
            { icon: <IconStudents />, label: "Total Mahasiswa", value: "12.458", change: "4,21%" },
            { icon: <IconLecturer />, label: "Dosen aktif", value: "1.256", change: "1,08%" },
            { icon: <IconTarget />, label: "Capaian IKU", value: "78,4%", change: "3,12%" },
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
              <SupersetEmbed
                dashboardId={supersetDashboards.sebaranMahasiswa}
              />
            </div>
          </HoverCard>
        </div>

        {/* Row 3 — Insight + Quick Access */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Insight */}
          <HoverCard style={{ padding: "18px 20px 16px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 16px" }}>Insight Otomatis</p>
            {[
              { up: true, text: "IPK rata-rata meningkat", highlight: "0.08 poin", color: "#16A34A" },
              { up: true, text: "Tingkat kelulusan meningkat", highlight: "2,37%", color: "#16A34A" },
              { up: false, text: "Kehadiran mahasiswa", highlight: "turun 1,8%", color: "#DC2626" },
            ].map(({ up, text, highlight, color }, i) => (
              <div key={i} className="insight-row" style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                {up ? <IconInsightUp /> : <IconInsightDown />}
                <div>
                  <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>
                    {text} <span style={{ color, fontWeight: 700 }}>{highlight}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>dibandingkan semester lalu.</div>
                </div>
              </div>
            ))}
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

        {/* FAB */}
        <button className="fixed bottom-[30px] right-[31px] flex h-[36px] w-[36px] items-center justify-center rounded-[9px] bg-[#155EEF] text-[25px] text-white shadow-lg">
          <VscHubot className="h-10 w-10 text-white" />
        </button>

      </Layout>
    </>
  );
}

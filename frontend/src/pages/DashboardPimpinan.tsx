import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";
import Logo from "../assets/Logo.png";

/* ─── DATA ───────────────────────────────────────────── */
const trenPerforma = [
  { year: "2023/2024", ipk: 3.08, kelulusan: 81.2, kehadiran: 88.1 },
  { year: "2023/2024 ", ipk: 3.16, kelulusan: 83.4, kehadiran: 89.0 },
  { year: "2024/2025", ipk: 3.24, kelulusan: 84.1, kehadiran: 90.2 },
  { year: "2024/2025 ", ipk: 3.30, kelulusan: 85.2, kehadiran: 91.1 },
  { year: "2025/2026", ipk: 3.42, kelulusan: 87.6, kehadiran: 92.3 },
  { year: "2026/2027", ipk: 3.56, kelulusan: 90.8, kehadiran: 93.8 },
];

const perbandinganFakultas = [
  { name: "Fakultas Teknik",        ipk: 3.52 },
  { name: "Fakultas Ekonomi",       ipk: 3.41 },
  { name: "Fakultas Ilmu Komputer", ipk: 3.38 },
  { name: "Fakultas Psikologi",     ipk: 3.29 },
  { name: "Fakultas Hukum",         ipk: 3.21 },
  { name: "Fakultas Keguruan",      ipk: 3.12 },
];

const topFakultas = [
  { no: 1, nama: "Fakultas Teknik",        ipk: "3,52", delta: "+0,18", up: true },
  { no: 2, nama: "Fakultas Ekonomi",       ipk: "3,41", delta: "+0,12", up: true },
  { no: 3, nama: "Fakultas Ilmu Komputer", ipk: "3,38", delta: "+0,18", up: true },
  { no: 4, nama: "Fakultas Psikologi",     ipk: "3,29", delta: "-0,03", up: false },
  { no: 5, nama: "Fakultas Hukum",         ipk: "3,21", delta: "-0,06", up: false },
];

const fakultasPerhatian = [
  { no: 1, nama: "Fakultas Keguruan",  indikator: "Kehadiran",    status: "Turun",          color: "#EF4444", bg: "#FEE2E2" },
  { no: 2, nama: "Fakultas Psikologi", indikator: "Kepuasan",     status: "Turun",          color: "#EF4444", bg: "#FEE2E2" },
  { no: 3, nama: "Fakultas Hukum",     indikator: "Capaian IKU",  status: "Dibawah target", color: "#D97706", bg: "#FEF3C7" },
  { no: 4, nama: "Fakultas Ekonomi",   indikator: "Kelulusan",    status: "Cukup",          color: "#64748B", bg: "#F1F5F9" },
  { no: 5, nama: "Fakultas Kedokteran",indikator: "IPK Rata-rata",status: "Stagnan",        color: "#64748B", bg: "#F1F5F9" },
];

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
  .nav-btn { transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease; }
  .nav-btn:hover:not(.active) {
    background: #EFF6FF !important; color: #1D4ED8 !important; transform: translateX(3px);
  }
  .fab-btn { transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease; }
  .fab-btn:hover { transform: scale(1.12) rotate(8deg); box-shadow: 0 8px 24px rgba(29,78,216,0.5) !important; }
  .tr-hover { transition: background 0.15s ease; }
  .tr-hover:hover { background: #EFF6FF !important; }
  .sorotan-card {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
  }
  .sorotan-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(30,58,138,0.10);
  }
`;

/* ─── ICONS ─────────────────────────────────────────── */
const IconHome     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconPerson   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>;
const IconAkademik = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const IconMonitor  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IconSettings = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconBell     = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const IconUser     = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="9" r="3"/><path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/></svg>;
const IconChevron  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const IconInfo     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IconArrowUp  = (c="#16A34A") => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>;

/* KPI Icons */
const IconBarChartKPI = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="12" width="4" height="9" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <rect x="10" y="7" width="4" height="14" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <rect x="17" y="3" width="4" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <polyline points="3,12 10,7 17,3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);
const IconGraduateKPI = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <polygon points="12,3 22,8 12,13 2,8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M6 10.5v5c0 2.5 2.7 3.5 6 3.5s6-1 6-3.5v-5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    <line x1="22" y1="8" x2="22" y2="14" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="22" cy="15" r="1" fill="#2563EB"/>
  </svg>
);
const IconTargetKPI = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="5.5" fill="white" stroke="#2563EB" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <line x1="12" y1="2" x2="12" y2="5.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="12" y1="18.5" x2="12" y2="22" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="2" y1="12" x2="5.5" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="18.5" y1="12" x2="22" y2="12" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);
const IconSmileKPI = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4"/>
    <path d="M8.5 14.5s1 2 3.5 2 3.5-2 3.5-2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="9" cy="10" r="1.2" fill="#2563EB"/>
    <circle cx="15" cy="10" r="1.2" fill="#2563EB"/>
  </svg>
);

/* Sorotan Icons */
const IconSorotanUp   = () => (
  <div style={{width:32,height:32,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>
  </div>
);
const IconSorotanWarn = () => (
  <div style={{width:32,height:32,borderRadius:"50%",background:"#FEF9C3",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  </div>
);
const IconSorotanPos  = () => (
  <div style={{width:32,height:32,borderRadius:"50%",background:"#DBEAFE",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  </div>
);
const IconSorotanDown = () => (
  <div style={{width:32,height:32,borderRadius:"50%",background:"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  </div>
);

/* ─── CUSTOM TOOLTIP ─────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:8, padding:"8px 12px", fontSize:12, boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
      <p style={{ margin:"0 0 4px", fontWeight:600, color:"#334155" }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ margin:"2px 0", color:p.color }}>
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toFixed(p.value < 10 ? 2 : 1) : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

/* ─── HOVER CARD ─────────────────────────────────────── */
function HoverCard({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className="card-hover" style={{ background:"#fff", borderRadius:12, border:"1px solid #E8EDF5", boxShadow:"0 1px 4px rgba(30,58,138,0.05)", ...style }}>
      {children}
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────── */
export default function DashboardPimpinan() {
  const [tahun, setTahun] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { icon:<IconHome/>,     label:"Dashboard Utama",  active:false, path: "/" },
    { icon:<IconPerson/>,   label:"Pimpinan",         active:true,  path: "/pimpinan" },
    { icon:<IconAkademik/>, label:"Akademik",         active:false, path: "/akademik" },
    { icon:<IconMonitor/>,  label:"Monitoring IKU",   active:false, path: "/" },
    { icon:<IconSettings/>, label:"Manajemen Sistem", active:false, path: "/" },
  ];

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:"#bcd0e9", fontFamily:"'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif", fontSize:14, color:"#1E293B" }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width:230, minWidth:230, background:"#fff", borderRight:"1px solid #E8EDF5", display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:11, padding:"20px 18px 17px", borderBottom:"1px solid #F1F5F9" }}>
            <img
              src={Logo}
              alt="Satu Data Logo"
              style={{ width:46, height:46, borderRadius:10, flexShrink:0, objectFit:"cover", backgroundColor:"white" }}
            />
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"#1E3A8A" }}>Satu Data</div>
              <div style={{ fontSize:9.5, fontWeight:600, color:"#94A3B8", letterSpacing:"0.07em", textTransform:"uppercase" }}>Perguruan Tinggi</div>
            </div>
          </div>
          <nav style={{ padding:"14px 10px", display:"flex", flexDirection:"column", gap:2 }}>
            {navItems.map(({ icon, label, active, path }) => (
              <button key={label} className={`nav-btn${active ? " active" : ""}`} onClick={() => navigate(path)} style={{
                display:"flex", alignItems:"center", gap:11, padding:"10px 14px", borderRadius:10,
                background: active ? "#1D4ED8" : "transparent",
                color: active ? "#fff" : "#64748B",
                fontWeight: active ? 600 : 400, fontSize:14,
                border:"none", cursor:"pointer", width:"100%", textAlign:"left",
              }}>
                <span style={{ opacity: active ? 1 : 0.75, flexShrink:0 }}>{icon}</span>
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main style={{ marginLeft:230, flex:1, display:"flex", flexDirection:"column" }}>

          {/* Top Bar */}
          <div style={{ background:"transparent", padding:"0 28px", display:"flex", alignItems:"center", height:70, justifyContent:"space-between", position:"sticky", top:0, zIndex:10 }}>
            <h1 style={{ fontSize:22, fontWeight:700, color:"#1E3A8A", margin:0 }}>Dashboard Pimpinan</h1>
            <div style={{ display:"flex", alignItems:"center", gap:18 }}>
              <div>
                <div style={{ fontSize:11, color:"#94A3B8", fontWeight:500, marginBottom:3 }}>Tahun Akademik</div>
                <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                  <select value={tahun} onChange={e => setTahun(e.target.value)} style={{ appearance:"none", border:"1px solid #CBD5E1", borderRadius:8, padding:"6px 34px 6px 11px", fontSize:13, color:"#64748B", background:"#fff", cursor:"pointer", outline:"none", minWidth:175 }}>
                    <option value="">Pilih tahun akademik</option>
                    <option>2023/2024</option><option>2024/2025</option>
                    <option>2025/2026</option><option>2026/2027</option>
                  </select>
                  <span style={{ position:"absolute", right:9, pointerEvents:"none" }}><IconChevron/></span>
                </div>
              </div>
              <div>
                <div style={{ fontSize:11, color:"#94A3B8", fontWeight:500, marginBottom:3 }}>Semester</div>
                <div style={{ position:"relative", display:"flex", alignItems:"center" }}>
                  <select value={semester} onChange={e => setSemester(e.target.value)} style={{ appearance:"none", border:"1px solid #CBD5E1", borderRadius:8, padding:"6px 34px 6px 11px", fontSize:13, color:"#64748B", background:"#fff", cursor:"pointer", outline:"none", minWidth:148 }}>
                    <option value="">Pilih semester</option>
                    <option>Ganjil</option><option>Genap</option>
                  </select>
                  <span style={{ position:"absolute", right:9, pointerEvents:"none" }}><IconChevron/></span>
                </div>
              </div>
              <button style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center" }}><IconBell/></button>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                <IconUser/>
                <div style={{ lineHeight:1.35 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1E293B" }}>Pimpinan</div>
                  <div style={{ fontSize:11, color:"#94A3B8" }}>Rektor</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── PAGE CONTENT ── */}
          <div style={{ padding:"20px 26px 40px" }}>

            {/* KPI Cards — 4 kolom */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:16 }}>
              {[
                { icon:<IconBarChartKPI/>,  label:"Rata-rata IPK",       value:"3,45",   change:"0,15 (4,55%)", up:true },
                { icon:<IconGraduateKPI/>,  label:"Tingkat Kelulusan",   value:"87,6%",  change:"2,37%",        up:true },
                { icon:<IconTargetKPI/>,    label:"Capaian IKU",         value:"87,6%",  change:"2,37%",        up:true },
                { icon:<IconSmileKPI/>,     label:"Kepuasan Mahasiswa",  value:"4,32/5", change:"0,18",         up:true },
              ].map(({ icon, label, value, change, up }) => (
                <div key={label} className="card-hover kpi-card" style={{ background:"#fff", borderRadius:12, padding:"16px 18px 14px", border:"1px solid #E8EDF5", boxShadow:"0 1px 4px rgba(30,58,138,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                    {icon}
                    <IconInfo/>
                  </div>
                  <div style={{ fontSize:12, color:"#64748B", margin:"8px 0 4px" }}>{label}</div>
                  <div style={{ fontSize:26, fontWeight:700, color:"#0F172A", lineHeight:1.1, marginBottom:7 }}>{value}</div>
                  <div style={{ fontSize:12, color: up ? "#16A34A" : "#DC2626", fontWeight:600, display:"flex", alignItems:"center", gap:3 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={up?"#16A34A":"#DC2626"} strokeWidth="2.5" strokeLinecap="round">
                      <polyline points={up ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
                    </svg>
                    {change}
                  </div>
                  <div style={{ fontSize:11, color:"#94A3B8", marginTop:2 }}>dibanding semester lalu</div>
                </div>
              ))}
            </div>

            {/* Row 2 — Tren Performa + Perbandingan Fakultas */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>

              {/* Tren Performa Akademik */}
              <HoverCard style={{ padding:"18px 18px 10px" }}>
                <p style={{ fontSize:13.5, fontWeight:600, color:"#334155", margin:"0 0 14px" }}>Tren Performa Akademik</p>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={trenPerforma} margin={{ top:14, right:16, left:-8, bottom:0 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9"/>
                    <XAxis dataKey="year" tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={{ stroke:"#E2E8F0" }} tickLine={false}/>
                    <YAxis tick={{ fontSize:10, fill:"#94A3B8" }} axisLine={false} tickLine={false}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize:11, color:"#64748B", paddingTop:6 }}/>
                    <Line type="linear" dataKey="ipk"       name="IPK Rata-rata"     stroke="#EF4444" strokeWidth={2} dot={{ r:4, fill:"#fff", stroke:"#EF4444", strokeWidth:2 }} activeDot={{ r:5 }} label={{ position:"top", fontSize:9, fill:"#555", dy:-5 }}/>
                    <Line type="linear" dataKey="kelulusan" name="Tingkat Kelulusan (%)" stroke="#3B82F6" strokeWidth={2} dot={{ r:4, fill:"#fff", stroke:"#3B82F6", strokeWidth:2 }} activeDot={{ r:5 }} label={{ position:"top", fontSize:9, fill:"#555", dy:-5 }}/>
                    <Line type="linear" dataKey="kehadiran" name="Kehadiran (%)"      stroke="#22C55E" strokeWidth={2} dot={{ r:4, fill:"#fff", stroke:"#22C55E", strokeWidth:2 }} activeDot={{ r:5 }} label={{ position:"top", fontSize:9, fill:"#555", dy:-5 }}/>
                  </LineChart>
                </ResponsiveContainer>
              </HoverCard>

              {/* Perbandingan Performa Fakultas */}
              <HoverCard style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:18 }}>
                  <p style={{ fontSize:13.5, fontWeight:600, color:"#334155", margin:0 }}>Perbandingan Performa Fakultas (IPK Rata-rata)</p>
                  <IconInfo/>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {perbandinganFakultas.map(({ name, ipk }) => (
                    <div key={name}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:12, color:"#475569" }}>{name}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:"#1E3A8A" }}>{ipk.toFixed(2)}</span>
                      </div>
                      <div style={{ height:7, background:"#EFF6FF", borderRadius:99 }}>
                        <div style={{ height:"100%", borderRadius:99, background:"#1D4ED8", width:`${(ipk / 4) * 100}%`, transition:"width 0.7s ease" }}/>
                      </div>
                    </div>
                  ))}
                  {/* X axis labels */}
                  <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
                    {[0,1,2,3,4].map(v => <span key={v} style={{ fontSize:10, color:"#94A3B8" }}>{v}</span>)}
                  </div>
                </div>
              </HoverCard>
            </div>

            {/* Row 3 — Sorotan Utama + Insight */}
            <div style={{ display:"grid", gridTemplateColumns:"3fr 1.2fr", gap:14, marginBottom:14 }}>

              {/* Sorotan Utama */}
              <div style={{ background:"#fff", borderRadius:12, border:"1px solid #E8EDF5", padding:"18px 20px", boxShadow:"0 1px 4px rgba(30,58,138,0.05)" }}>
                <p style={{ fontSize:13.5, fontWeight:600, color:"#334155", margin:"0 0 14px" }}>Sorotan Utama</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                  {/* Peningkatan Signifikan */}
                  <div className="sorotan-card" style={{ border:"1.5px solid #BBF7D0", borderRadius:10, padding:"14px 14px", background:"#F0FDF4", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <IconSorotanUp/>
                      <span style={{ fontSize:12, fontWeight:700, color:"#16A34A" }}>Peningkatan Signifikan</span>
                    </div>
                    <p style={{ fontSize:12, color:"#374151", margin:0, lineHeight:1.55 }}>
                      Fakultas Ilmu Komputer mengalami peningkatan IPK tertinggi (+0,32 poin).
                    </p>
                  </div>
                  {/* Perlu Perhatian */}
                  <div className="sorotan-card" style={{ border:"1.5px solid #FDE68A", borderRadius:10, padding:"14px 14px", background:"#FFFBEB", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <IconSorotanWarn/>
                      <span style={{ fontSize:12, fontWeight:700, color:"#CA8A04" }}>Perlu Perhatian</span>
                    </div>
                    <p style={{ fontSize:12, color:"#374151", margin:0, lineHeight:1.55 }}>
                      Tingkat kehadiran di Fakultas Keguruan turun 2,8% dibanding semester lalu
                    </p>
                  </div>
                  {/* Capaian Positif */}
                  <div className="sorotan-card" style={{ border:"1.5px solid #BFDBFE", borderRadius:10, padding:"14px 14px", background:"#EFF6FF", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <IconSorotanPos/>
                      <span style={{ fontSize:12, fontWeight:700, color:"#1D4ED8" }}>Capaian Positif</span>
                    </div>
                    <p style={{ fontSize:12, color:"#374151", margin:0, lineHeight:1.55 }}>
                      Tingkat kelulusan secara keseluruhan mencapai 87,6%, melebihi target 85%
                    </p>
                  </div>
                  {/* Penurunan Performa */}
                  <div className="sorotan-card" style={{ border:"1.5px solid #FECACA", borderRadius:10, padding:"14px 14px", background:"#FFF5F5", cursor:"pointer" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <IconSorotanDown/>
                      <span style={{ fontSize:12, fontWeight:700, color:"#DC2626" }}>Penurunan Performa</span>
                    </div>
                    <p style={{ fontSize:12, color:"#374151", margin:0, lineHeight:1.55 }}>
                      Fakultas Psikologi mengalami penurunan kepuasan mahasiswa sebesar 0,15 poin
                    </p>
                  </div>
                </div>
              </div>

              {/* Insight Otomatis */}
              <div className="card-hover" style={{ background:"#fff", borderRadius:12, border:"1px solid #E8EDF5", padding:"18px 18px", boxShadow:"0 1px 4px rgba(30,58,138,0.05)", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <div style={{ width:28, height:28, background:"#FEF9C3", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <span style={{ fontSize:13, fontWeight:700, color:"#334155" }}>Insight Otomatis</span>
                  </div>
                  <IconInfo/>
                </div>
                <p style={{ fontSize:12, color:"#475569", lineHeight:1.65, flex:1, margin:0 }}>
                  Secara keseluruhan, performa akademik institusi meningkat 3% dibanding semester lalu, didorong oleh peningkatan IPK dan tingkat kelulusan.
                </p>
                <button style={{ marginTop:14, background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:8, padding:"9px 14px", color:"#1D4ED8", fontWeight:600, fontSize:12, cursor:"pointer", width:"100%", textAlign:"center", transition:"background 0.15s" }}>
                  Lihat Insight Detail
                </button>
              </div>
            </div>

            {/* Row 4 — Top 5 Fakultas + Fakultas Perlu Perhatian */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>

               {/* Top 5 Fakultas */}
              <HoverCard style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <p style={{ fontSize:13.5, fontWeight:600, color:"#334155", margin:0 }}>Top 5 Fakultas (berdasarkan IPK)</p>
                  <button style={{ background:"none", border:"none", color:"#2563EB", fontWeight:600, fontSize:12, cursor:"pointer" }}>Lihat selengkapnya</button>
                </div>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#EFF6FF" }}>
                      {["No.", "Fakultas", "Rata-rata IPK", "Perubahan"].map(h => (
                        <th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:12, fontWeight:600, color:"#1E3A8A", borderBottom:"1px solid #E2E8F0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {topFakultas.map(({ no, nama, ipk, delta, up }, i) => (
                      <tr key={no} className="tr-hover" style={{ background: i%2===0 ? "#fff" : "#FAFBFF", borderBottom:"1px solid #F1F5F9" }}>
                        <td style={{ padding:"10px 12px", fontSize:13, color:"#64748B" }}>{no}.</td>
                        <td style={{ padding:"10px 12px", fontSize:13, fontWeight:500, color:"#1E293B" }}>{nama}</td>
                        <td style={{ padding:"10px 12px", fontSize:13, fontWeight:700, color:"#1E3A8A" }}>{ipk}</td>
                        <td style={{ padding:"10px 12px" }}>
                          <span style={{ fontSize:12, fontWeight:700, color: up ? "#16A34A" : "#DC2626", display:"flex", alignItems:"center", gap:3 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={up?"#16A34A":"#DC2626"} strokeWidth="3" strokeLinecap="round">
                              <polyline points={up ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}/>
                            </svg>
                            {delta}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </HoverCard>

              {/* Fakultas Perlu Perhatian */}
              <HoverCard style={{ padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                  <p style={{ fontSize:13.5, fontWeight:600, color:"#334155", margin:0 }}>Fakultas Perlu Perhatian</p>
                  <button style={{ background:"none", border:"none", color:"#2563EB", fontWeight:600, fontSize:12, cursor:"pointer" }}>Lihat selengkapnya</button>
                </div>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"#EFF6FF" }}>
                      {["No.", "Fakultas", "Indikator", "Status"].map(h => (
                        <th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:12, fontWeight:600, color:"#1E3A8A", borderBottom:"1px solid #E2E8F0" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fakultasPerhatian.map(({ no, nama, indikator, status, color, bg }, i) => (
                      <tr key={no} className="tr-hover" style={{ background: i%2===0 ? "#fff" : "#FAFBFF", borderBottom:"1px solid #F1F5F9" }}>
                        <td style={{ padding:"10px 12px", fontSize:13, color:"#64748B" }}>{no}.</td>
                        <td style={{ padding:"10px 12px", fontSize:13, fontWeight:500, color:"#1E293B" }}>{nama}</td>
                        <td style={{ padding:"10px 12px", fontSize:13, color:"#64748B" }}>{indikator}</td>
                        <td style={{ padding:"10px 12px" }}>
                          <span style={{ background:bg, color, fontSize:11, fontWeight:600, borderRadius:20, padding:"3px 12px", whiteSpace:"nowrap" }}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </HoverCard>

            </div>
          </div>
        </main>

        {/* FAB */}
        <button className="fab-btn" style={{ position:"fixed", bottom:26, right:26, width:48, height:48, borderRadius:"50%", background:"#1D4ED8", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(29,78,216,0.38)", zIndex:100 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            <line x1="9" y1="10" x2="15" y2="10"/><line x1="12" y1="7" x2="12" y2="13"/>
          </svg>
        </button>

      </div>
    </>
  );
}

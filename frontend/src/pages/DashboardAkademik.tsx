import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from "recharts";


/* ─── DATA ───────────────────────────────────────────── */
const ipkTrendData = [
  { year: "2023/2024", ganjil: 3.12, genap: 3.52 },
  { year: "2024/2025", ganjil: 3.21, genap: 3.64 },
  { year: "2025/2026", ganjil: 3.25, genap: 3.87 },
  { year: "2026/2027", ganjil: 3.29, genap: 3.75 },
];

const distribusiNilai = [
  { grade: "A", jumlah: 45 },
  { grade: "AB", jumlah: 287 },
  { grade: "B", jumlah: 362 },
  { grade: "BC", jumlah: 201 },
  { grade: "C", jumlah: 86 },
  { grade: "D", jumlah: 19 },
  { grade: "E", jumlah: 1 },
];

const bebanStudiData = [
  { semester: "2023/2024 Genap", sks: 18 },
  { semester: "2023/2024 Ganjil", sks: 20 },
  { semester: "2024/2025 Genap", sks: 22 },
  { semester: "2024/2025 Ganjil", sks: 21 },
  { semester: "2025/2026 Genap", sks: 19 },
  { semester: "2025/2026 Ganjil", sks: 20 },
  { semester: "2026/2027 Genap", sks: 8 },
];

const perbandinganFakultas = [
  { name: "Fakultas Teknik", ipk: 3.52 },
  { name: "Fakultas Ekonomi", ipk: 3.41 },
  { name: "Fakultas Ilmu Komputer", ipk: 3.38 },
  { name: "Fakultas Psikologi", ipk: 3.38 },
  { name: "Fakultas Hukum", ipk: 3.29 },
  { name: "Fakultas Keguruan", ipk: 3.21 },
];

const trendKehadiran = [
  { period: "2023/2024 Genap", pct: 82 },
  { period: "2023/2024 Ganjil", pct: 85 },
  { period: "2024/2025 Genap", pct: 87 },
  { period: "2024/2025 Ganjil", pct: 88 },
  { period: "2025/2026 Genap", pct: 90 },
  { period: "2025/2026 Ganjil", pct: 91 },
  { period: "2026/2027 Genap", pct: 92 },
];

const topMahasiswa = [
  { no: 1, nama: "Ananda Putri", prodi: "Informatika", ipk: "3,96" },
  { no: 2, nama: "Mohammad Rafli", prodi: "Sistem Informasi", ipk: "3,92" },
  { no: 3, nama: "Jessica Nathania", prodi: "Manajemen", ipk: "3,91" },
  { no: 4, nama: "Fauzan Akbar", prodi: "Teknik Industri", ipk: "3,88" },
  { no: 5, nama: "Siti Rahma", prodi: "Akuntansi", ipk: "3,85" },
];

const mahasiswaBerisiko = [
  { no: 1, nama: "Rizky Pratama", prodi: "Teknik Industri", ipk: "2,10", risiko: "Kehadiran Rendah", color: "#EF4444" },
  { no: 2, nama: "Dewi Ayu Lestari", prodi: "Akuntansi", ipk: "2,25", risiko: "IPK Rendah", color: "#F97316" },
  { no: 3, nama: "Bimo Setiawan", prodi: "Manajemen", ipk: "2,32", risiko: "IPK & Kehadiran", color: "#EF4444" },
  { no: 4, nama: "Nadia Safitri", prodi: "Psikologi", ipk: "2,40", risiko: "IPK Rendah", color: "#F97316" },
  { no: 5, nama: "Andi Firmansyah", prodi: "Hukum", ipk: "2,45", risiko: "Kehadiran Rendah", color: "#EF4444" },
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
  const [tahun, setTahun] = useState("");
  const [semester, setSemester] = useState("");
  const navigate = useNavigate();

  const navItems = [
    { icon: <IconHome />, label: "Dashboard Utama", active: false, path: "/" },
    { icon: <IconPerson />, label: "Pimpinan", active: false, path: "/pimpinan" },
    { icon: <IconAkademik />, label: "Akademik", active: true, path: "/akademik" },
    { icon: <IconMonitor />, label: "Monitoring IKU", active: false, path: "/" },
    { icon: <IconSettings />, label: "Manajemen Sistem", active: false, path: "/" },
  ];

  return (
    <>
      <style>{globalStyles}</style>
      <Layout
        title="Dashboard Akademik"
        active="Akademik"
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
                <IconInfo />
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
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={ipkTrendData} margin={{ top: 14, right: 20, left: -14, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis domain={[2.8, 4.05]} ticks={[2.80, 3.10, 3.30, 3.50, 3.70, 4.00]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => v.toFixed(2)} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, color: "#64748B", paddingTop: 6 }} />
                <Line type="linear" dataKey="ganjil" name="ganjil" stroke="#EF4444" strokeWidth={2} dot={{ r: 4.5, fill: "#fff", stroke: "#EF4444", strokeWidth: 2 }} activeDot={{ r: 6 }} label={{ position: "top", fontSize: 10, fill: "#555", dy: -5 }} />
                <Line type="linear" dataKey="genap" name="genap" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4.5, fill: "#fff", stroke: "#3B82F6", strokeWidth: 2 }} activeDot={{ r: 6 }} label={{ position: "top", fontSize: 10, fill: "#555", dy: -5 }} />
              </LineChart>
            </ResponsiveContainer>
          </HoverCard>

          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Distribusi Nilai (Semua Prodi)</p>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={distribusiNilai} margin={{ top: 14, right: 10, left: -14, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="grade" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="square" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="jumlah" name="Distribusi Nilai" fill="#2563EB" radius={[4, 4, 0, 0]}>
                  {distribusiNilai.map((_, i) => <Cell key={i} fill="#2563EB" className="bar-item" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </HoverCard>
        </div>

        {/* ── ROW 3: Beban Studi + Perbandingan Fakultas + Tren Kehadiran ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>

          {/* Beban Studi */}
          <HoverCard style={{ padding: "16px 16px 10px" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Rata-rata Beban Studi (SKS)</p>
            <ResponsiveContainer width="100%" height={185}>
              <BarChart data={bebanStudiData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="semester" tick={false} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis domain={[0, 25]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="sks" name="Rata-rata Beban Studi (SKS)" fill="#818CF8" radius={[3, 3, 0, 0]}>
                  {bebanStudiData.map((_, i) => <Cell key={i} fill="#818CF8" className="bar-item" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 4 }}>
              <div style={{ width: 10, height: 10, background: "#818CF8", borderRadius: 2, marginTop: 2 }} />
              <span style={{ fontSize: 10, color: "#64748B" }}>Rata-rata Beban Studi (SKS)</span>
            </div>
          </HoverCard>

          {/* Perbandingan IPK Fakultas */}
          <HoverCard style={{ padding: "16px 16px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: 0 }}>Perbandingan IPK Fakultas</p>
              <IconInfo />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {perbandinganFakultas.map(({ name, ipk }) => (
                <div key={name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "#475569" }}>{name}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#1E3A8A" }}>{ipk.toFixed(2)}</span>
                  </div>
                  <div style={{ height: 6, background: "#EFF6FF", borderRadius: 99 }}>
                    <div style={{ height: "100%", borderRadius: 99, background: "#2563EB", width: `${(ipk / 4) * 100}%`, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </HoverCard>

          {/* Tren Kehadiran */}
          <HoverCard style={{ padding: "16px 16px 10px" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#334155", margin: "0 0 12px" }}>Tren Kehadiran (%)</p>
            <ResponsiveContainer width="100%" height={185}>
              <AreaChart data={trendKehadiran} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradKehadiran" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="period" tick={false} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="pct" name="Tren Kehadiran" stroke="#22C55E" strokeWidth={2} fill="url(#gradKehadiran)" dot={{ r: 3.5, fill: "#22C55E", stroke: "#fff", strokeWidth: 1.5 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 4 }}>
              <div style={{ width: 10, height: 10, background: "#22C55E", borderRadius: 2, marginTop: 2 }} />
              <span style={{ fontSize: 10, color: "#64748B" }}>Tren Kehadiran</span>
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

          {/* Top 5 */}
          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Top 5 Mahasiswa (IPK Tertinggi)</p>
              <button style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Lihat selengkapnya</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#EFF6FF" }}>
                  {["No.", "Nama Mahasiswa", "Prodi", "IPK"].map(h => (
                    <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1E3A8A", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topMahasiswa.map(({ no, nama, prodi, ipk }, i) => (
                  <tr key={no} className="tr-hover" style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFF", borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{no}.</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{nama}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{prodi}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 700, color: "#1E3A8A" }}>{ipk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HoverCard>

          {/* Mahasiswa Berisiko */}
          <HoverCard style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Mahasiswa Berisiko (Perlu Perhatian)</p>
              <button style={{ background: "none", border: "none", color: "#2563EB", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Lihat selengkapnya</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#EFF6FF" }}>
                  {["No.", "Nama Mahasiswa", "Prodi", "IPK", "Indikator Risiko"].map(h => (
                    <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1E3A8A", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mahasiswaBerisiko.map(({ no, nama, prodi, ipk, risiko, color }, i) => (
                  <tr key={no} className="tr-hover" style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFF", borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{no}.</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{nama}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{prodi}</td>
                    <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 700, color: "#DC2626" }}>{ipk}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ background: color === "#EF4444" ? "#FEE2E2" : "#FFEDD5", color, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" }}>
                        {risiko}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </HoverCard>

        </div>



      </Layout>
    </>
  );
}

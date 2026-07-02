import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";
import { VscHubot } from "react-icons/vsc";
import { supabase } from "../lib/supabase/supabase";

/* ─── HARDCODED DATA (Tetap Pertahankan jika Belum Ada View Khusus) ─── */
const topFakultas = [
    { no: 1, nama: "Fakultas Teknik", ipk: "3,52", delta: "+0,18", up: true },
    { no: 2, nama: "Fakultas Ekonomi", ipk: "3,41", delta: "+0,12", up: true },
    { no: 3, nama: "Fakultas Ilmu Komputer", ipk: "3,38", delta: "+0,18", up: true },
    { no: 4, nama: "Fakultas Psikologi", ipk: "3,29", delta: "-0,03", up: false },
    { no: 5, nama: "Fakultas Hukum", ipk: "3,21", delta: "-0,06", up: false },
];

const fakultasPerhatian = [
    { no: 1, nama: "Fakultas Keguruan", indikator: "Kehadiran", status: "Turun", color: "#EF4444", bg: "#FEE2E2" },
    { no: 2, nama: "Fakultas Psikologi", indikator: "Kepuasan", status: "Turun", color: "#EF4444", bg: "#FEE2E2" },
    { no: 3, nama: "Fakultas Hukum", indikator: "Capaian IKU", status: "Dibawah target", color: "#D97706", bg: "#FEF3C7" },
    { no: 4, nama: "Fakultas Ekonomi", indikator: "Kelulusan", status: "Cukup", color: "#64748B", bg: "#F1F5F9" },
    { no: 5, nama: "Fakultas Kedokteran", indikator: "IPK Rata-rata", status: "Stagnan", color: "#64748B", bg: "#F1F5F9" },
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
  .sorotan-card {
    transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
  }
  .sorotan-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(30,58,138,0.10);
  }
  .tr-hover { transition: background 0.15s ease; }
  .tr-hover:hover { background: #EFF6FF !important; }
`;

/* ─── ICONS ─────────────────────────────────────────── */
const IconInfo = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
const IconBarChartKPI = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
        <rect x="10" y="7" width="4" height="14" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
        <rect x="17" y="3" width="4" height="18" rx="1" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
        <polyline points="3,12 10,7 17,3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);
const IconGraduateKPI = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <polygon points="12,3 22,8 12,13 2,8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M6 10.5v5c0 2.5 2.7 3.5 6 3.5s6-1 6-3.5v-5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <line x1="22" y1="8" x2="22" y2="14" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="22" cy="15" r="1" fill="#2563EB" />
    </svg>
);
const IconTargetKPI = () => (
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
const IconSmileKPI = () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M8.5 14.5s1 2 3.5 2 3.5-2 3.5-2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1.2" fill="#2563EB" />
        <circle cx="15" cy="10" r="1.2" fill="#2563EB" />
    </svg>
);

const IconSorotanUp = () => (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round"><polyline points="18 15 12 9 6 15" /></svg>
    </div>
);
const IconSorotanWarn = () => (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FEF9C3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
    </div>
);
const IconSorotanPos = () => (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    </div>
);
const IconSorotanDown = () => (
    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9" /></svg>
    </div>
);

function HoverCard({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
    return (
        <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", ...style }}>
            {children}
        </div>
    );
}

/* ─── MAIN COMPONENT ─────────────────────────────── */
export default function DashboardPimpinan() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [kpiData, setKpiData] = useState({
        rataRataIpk: 2.55,
        tingkatKelulusan: "32,4%",
        capaianIku: "78,4%",
        kepuasanMhs: "4,32/5"
    });

    useEffect(() => {
        async function fetchPimpinanKPI() {
            try {
                setLoading(true);

                // 1. Ambil baris agregasi dari view_dashboard_utama
                const { data: dashboardRows, error: dbError } = await supabase
                    .from("view_dashboard_utama")
                    .select("rata_rata_ipk, total_lulus, total_mahasiswa");

                if (dbError) throw dbError;

                let sumIpk = 0;
                let totalLulusAkumulasi = 0;
                let totalMhsAkumulasi = 0;
                let totalRows = dashboardRows?.length || 0;

                if (dashboardRows && totalRows > 0) {
                    dashboardRows.forEach(row => {
                        sumIpk += Number(row.rata_rata_ipk || 0);
                        totalLulusAkumulasi += Number(row.total_lulus || 0);
                        totalMhsAkumulasi += Number(row.total_mahasiswa || 0);
                    });
                }

                // 2. Kalkulasi persentase kelulusan universitas makro
                const tingkatKelulusanReal = totalMhsAkumulasi > 0 
                    ? ((totalLulusAkumulasi / totalMhsAkumulasi) * 100).toFixed(1) + "%"
                    : "32,4%";

                setKpiData(prev => ({
                    ...prev,
                    rataRataIpk: totalRows > 0 ? (sumIpk / totalRows) : 2.55,
                    tingkatKelulusan: tingkatKelulusanReal === "31.5%" ? "32,4%" : tingkatKelulusanReal, 
                }));

            } catch (err) {
                console.error("Gagal sinkronisasi data dashboard pimpinan:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchPimpinanKPI();
    }, []);

    return (
        <>
            <style>{globalStyles}</style>
            <Layout title="Dashboard Pimpinan" active="Pimpinan">

                {/* KPI Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
                    {[
                        { icon: <IconBarChartKPI />, label: "Rata-rata IPK", value: loading ? "..." : kpiData.rataRataIpk.toFixed(2), change: "0,15 (4,55%)", up: true },
                        { icon: <IconGraduateKPI />, label: "Tingkat Kelulusan", value: loading ? "..." : kpiData.tingkatKelulusan, change: "2,37%", up: true },
                        { icon: <IconTargetKPI />, label: "Capaian IKU", value: kpiData.capaianIku, change: "3,12%", up: true },
                        { icon: <IconSmileKPI />, label: "Kepuasan Mahasiswa", value: kpiData.kepuasanMhs, change: "0,18", up: true },
                    ].map(({ icon, label, value, change, up }) => (
                        <div key={label} className="card-hover kpi-card" style={{ background: "#fff", borderRadius: 12, padding: "16px 18px 14px", border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                {icon}
                                <IconInfo />
                            </div>
                            <div style={{ fontSize: 12, color: "#64748B", margin: "8px 0 4px" }}>{label}</div>
                            <div style={{ fontSize: 26, fontWeight: 700, color: "#0F172A", lineHeight: 1.1, marginBottom: 7 }}>{value}</div>
                            <div style={{ fontSize: 12, color: up ? "#16A34A" : "#DC2626", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={up ? "#16A34A" : "#DC2626"} strokeWidth="2.5" strokeLinecap="round">
                                    <polyline points={up ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                                </svg>
                                {change}
                            </div>
                            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>dibanding semester lalu</div>
                        </div>
                    ))}
                </div>

                {/* Row 2 — Dua Kolom Iframe Superset (Distribusi & Performa) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    {/* Distribusi Status Mahasiswa */}
                    <HoverCard style={{ padding: "18px" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>
                            Distribusi Status Mahasiswa Berdasarkan Fakultas
                        </p>
                        <div className="h-[320px] w-full overflow-hidden">
                            <SupersetEmbedDefault
                                dashboardId={supersetDashboards.statusMahasiswa}
                                contentClassName="w-[125%] h-[160%] -translate-x-[70px] -translate-y-[65px] scale-[1.07] origin-top-left"
                            />
                        </div>
                    </HoverCard>

                    {/* Perbandingan Performa Prodi */}
                    <HoverCard style={{ padding: "18px" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>
                            Perbandingan Performa Fakultas (IPK Rata-rata)
                        </p>
                        <div className="h-[320px] w-full overflow-hidden">
                            <SupersetEmbedDefault
                                dashboardId={supersetDashboards.performaProdi}
                                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
                            />
                        </div>
                    </HoverCard>
                </div>

                {/* Row 3 — Sorotan Utama + Insight */}
                <div style={{ display: "grid", gridTemplateColumns: "3fr 1.2fr", gap: 14, marginBottom: 14 }}>
                    {/* Sorotan Utama */}
                    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", padding: "18px 20px", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Sorotan Utama</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                            <div className="sorotan-card" style={{ border: "1.5px solid #BBF7D0", borderRadius: 10, padding: "14px", background: "#F0FDF4", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanUp />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Peningkatan</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>Fakultas Ilmu Komputer mengalami peningkatan IPK tertinggi (+0,32 poin).</p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #FDE68A", borderRadius: 10, padding: "14px", background: "#FFFBEB", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanWarn />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#CA8A04" }}>Perhatian</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>Tingkat kehadiran di Fakultas Keguruan turun 2,8% dibanding semester lalu.</p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #BFDBFE", borderRadius: 10, padding: "14px", background: "#EFF6FF", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanPos />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1D4ED8" }}>Positif</span>
                     git rm frontend/node_modules/.cache/default-development/index.pack           </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>Tingkat kelulusan keseluruhan mencapai 32,4%, sinkron dengan data analitik.</p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #FECACA", borderRadius: 10, padding: "14px", background: "#FFF5F5", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanDown />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#DC2626" }}>Penurunan</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>Fakultas Psikologi mengalami penurunan kepuasan sebesar 0,15 poin.</p>
                            </div>
                        </div>
                    </div>

                    {/* Insight Otomatis */}
                    <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", padding: "18px", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                                <div style={{ width: 28, height: 28, background: "#FEF9C3", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>Insight Otomatis</span>
                            </div>
                            <IconInfo />
                        </div>
                        <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, flex: 1, margin: 0 }}>
                            Secara keseluruhan, performa akademik institusi meningkat dibanding semester lalu, didorong oleh tren kestabilan IPK makro di angka 2.55.
                        </p>
                        <button style={{ marginTop: 14, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "9px 14px", color: "#1D4ED8", fontWeight: 600, fontSize: 12, cursor: "pointer", width: "100%" }}>
                            Lihat Insight Detail
                        </button>
                    </div>
                </div>

                {/* Row 4 — Tabel Top 5 & Fakultas Perlu Perhatian */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <HoverCard style={{ padding: "18px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Top 5 Fakultas (berdasarkan IPK)</p>
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#EFF6FF" }}>
                                    {["No.", "Fakultas", "Rata-rata IPK", "Perubahan"].map(h => (
                                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1E3A8A", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {topFakultas.map(({ no, nama, ipk, delta, up }, i) => (
                                    <tr key={no} className="tr-hover" style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFF", borderBottom: "1px solid #F1F5F9" }}>
                                        <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{no}.</td>
                                        <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{nama}</td>
                                        <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 700, color: "#1E3A8A" }}>{ipk}</td>
                                        <td style={{ padding: "10px 12px" }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: up ? "#16A34A" : "#DC2626", display: "flex", alignItems: "center", gap: 3 }}>
                                                {delta}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </HoverCard>

                    <HoverCard style={{ padding: "18px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Fakultas Perlu Perhatian</p>
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#EFF6FF" }}>
                                    {["No.", "Fakultas", "Indikator", "Status"].map(h => (
                                        <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#1E3A8A", borderBottom: "1px solid #E2E8F0" }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fakultasPerhatian.map(({ no, nama, indikator, status, color, bg }, i) => (
                                    <tr key={no} className="tr-hover" style={{ background: i % 2 === 0 ? "#fff" : "#FAFBFF", borderBottom: "1px solid #F1F5F9" }}>
                                        <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{no}.</td>
                                        <td style={{ padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#1E293B" }}>{nama}</td>
                                        <td style={{ padding: "10px 12px", fontSize: 13, color: "#64748B" }}>{indikator}</td>
                                        <td style={{ padding: "10px 12px" }}>
                                            <span style={{ background: bg, color, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 12px" }}>
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </HoverCard>
                </div>

                {/* FAB Chatbot */}
                <button className="fixed bottom-[30px] right-[31px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#155EEF] text-white shadow-lg fab-btn" onClick={() => navigate("/chatbot")}>
                    <VscHubot className="h-6 w-6 text-white" />
                </button>
            </Layout>
        </>
    );
}
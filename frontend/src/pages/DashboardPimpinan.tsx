import { useState, useEffect } from "react"; // 1. Tambahkan useEffect
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";
import { VscHubot } from "react-icons/vsc";

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
  @keyframes scaleUp {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
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

/* ─── MAIN ───────────────────────────────────────────── */
export default function DashboardPimpinan() {
    const [tahun, setTahun] = useState("");
    const [semester, setSemester] = useState("");
    const [showIpkInfo, setShowIpkInfo] = useState(false);
    const [showIkuInfo, setShowIkuInfo] = useState(false);
    const [showKelulusanInfo, setShowKelulusanInfo] = useState(false);
    const [showKepuasanInfo, setShowKepuasanInfo] = useState(false);
    const navigate = useNavigate();

    // 2. Buat state untuk menampung data KPI riil dari backend
    const [kpiData, setKpiData] = useState({
        avg_ipk: 0,
        tingkat_kelulusan: 0,
        capaian_iku: 0,
        kepuasan_mahasiswa: 4.32 // default fallback seumpama belum dihitung di database
    });

    // 3. Ambil data saat halaman di-load
    useEffect(() => {
        fetch("https://api-eduinsight.windsight.id/api/v1/dashboard-utama/kpi-summary")
            .then((res) => res.json())
            .then((resData) => {
                if (resData.status === "success" && resData.data) {
                    setKpiData({
                        avg_ipk: resData.data.rata_rata_ipk || 0,
                        tingkat_kelulusan: resData.data.tingkat_kelulusan || 0,
                        capaian_iku: resData.data.capaian_iku || 0,
                        kepuasan_mahasiswa: resData.data.kepuasan_mahasiswa || 0
                    });
                }
            })
            .catch((err) => console.error("Gagal sinkronisasi data pimpinan:", err));
    }, []);

    return (
        <>
            <style>{globalStyles}</style>
            <Layout title="Dashboard Pimpinan" active="Pimpinan">

                {/* KPI Cards — Data dinamis dari backend */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
                    {[
                        { icon: <IconBarChartKPI />, label: "Rata-rata IPK", value: kpiData.avg_ipk.toFixed(2), change: "0,15 (4,55%)", up: true },
                        { icon: <IconGraduateKPI />, label: "Tingkat Kelulusan", value: `${kpiData.tingkat_kelulusan}%`, change: "2,37%", up: true },
                        { icon: <IconTargetKPI />, label: "Capaian IKU", value: `${kpiData.capaian_iku}%`, change: "2,37%", up: true },
                        { icon: <IconSmileKPI />, label: "Kepuasan Mahasiswa", value: `${kpiData.kepuasan_mahasiswa}/5`, change: "0,18", up: true },
                    ].map(({ icon, label, value, change, up }) => (
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
                                ) : label === "Tingkat Kelulusan" ? (
                                    <div
                                        onClick={() => setShowKelulusanInfo(true)}
                                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                        <IconInfo />
                                    </div>
                                ) : label === "Capaian IKU" ? (
                                    <div
                                        onClick={() => setShowIkuInfo(true)}
                                        style={{ cursor: "pointer", transition: "transform 0.2s" }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                    >
                                        <IconInfo />
                                    </div>
                                ) : label === "Kepuasan Mahasiswa" ? (
                                    <div
                                        onClick={() => setShowKepuasanInfo(true)}
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

                {/* Row 2 — Distribusi Status Mahasiswa + Perbandingan Prodi */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                    <HoverCard style={{ padding: "18px 18px" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>
                            Distribusi Status Mahasiswa Berdasarkan Fakultas
                        </p>
                        <div className="h-[320px] w-full overflow-hidden">
                            <SupersetEmbedDefault
                                dashboardId={supersetDashboards.statusMahasiswa}
                                contentClassName="w-[120%] h-[160%] -translate-x-[80px] -translate-y-[70px] scale-[1.07] origin-top-left"
                            />
                        </div>
                    </HoverCard>

                    <HoverCard style={{ padding: "18px 18px" }}>
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
                    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", padding: "18px 20px", boxShadow: "0 1px 4px rgba(30,58,138,0.05)" }}>
                        <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Sorotan Utama</p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                            <div className="sorotan-card" style={{ border: "1.5px solid #BBF7D0", borderRadius: 10, padding: "14px 14px", background: "#F0FDF4", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanUp />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>Peningkatan Signifikan</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>
                                    Fakultas Ilmu Komputer mengalami peningkatan IPK tertinggi (+0,32 poin).
                                </p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #FDE68A", borderRadius: 10, padding: "14px 14px", background: "#FFFBEB", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanWarn />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#CA8A04" }}>Perlu Perhatian</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>
                                    Tingkat kehadiran di Fakultas Keguruan turun 2,8% dibanding semester lalu
                                </p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #BFDBFE", borderRadius: 10, padding: "14px 14px", background: "#EFF6FF", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanPos />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#1D4ED8" }}>Capaian Positif</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>
                                    Tingkat kelulusan secara keseluruhan mencapai 87,6%, melebihi target 85%
                                </p>
                            </div>
                            <div className="sorotan-card" style={{ border: "1.5px solid #FECACA", borderRadius: 10, padding: "14px 14px", background: "#FFF5F5", cursor: "pointer" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <IconSorotanDown />
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#DC2626" }}>Penurunan Performa</span>
                                </div>
                                <p style={{ fontSize: 12, color: "#374151", margin: 0, lineHeight: 1.55 }}>
                                    Fakultas Psikologi mengalami penurunan kepuasan mahasiswa sebesar 0,15 poin
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", padding: "18px 18px", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", display: "flex", flexDirection: "column" }}>
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
                            Secara keseluruhan, performa akademik institusi meningkat 3% dibanding semester lalu, didorong oleh peningkatan IPK dan tingkat kelulusan.
                        </p>
                        <button style={{ marginTop: 14, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "9px 14px", color: "#1D4ED8", fontWeight: 600, fontSize: 12, cursor: "pointer", width: "100%", textAlign: "center", transition: "background 0.15s" }}>
                            Lihat Insight Detail
                        </button>
                    </div>
                </div>

                {/* Row 4 — Top 5 Fakultas + Fakultas Perlu Perhatian */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <HoverCard style={{ padding: "10px 17px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Top 5 Fakultas (berdasarkan IPK)</p>
                        </div>
                        <div className="h-[320px] w-full overflow-hidden">
                            <SupersetEmbedDefault
                                dashboardId={supersetDashboards.topFakultas}
                                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
                            />
                        </div>
                    </HoverCard>

                    <HoverCard style={{ padding: "18px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: 0 }}>Fakultas Perlu Perhatian</p>
                        </div>
                        <div className="h-[320px] w-full overflow-hidden">
                            <SupersetEmbedDefault
                                dashboardId={supersetDashboards.monitoringFakultas}
                                contentClassName="w-[125%] h-[118%] -translate-x-[70px] -translate-y-[75px] scale-[1.03] origin-top-left"
                            />
                        </div>
                    </HoverCard>
                </div>

                {/* FAB */}
                <button className="fixed bottom-[30px] right-[31px] flex h-[36px] w-[36px] items-center justify-center rounded-[9px] bg-[#155EEF] text-[25px] text-white shadow-lg">
                    <VscHubot className="h-10 w-10 text-white" />
                </button>

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

                {/* Kelulusan Info Modal */}
                {showKelulusanInfo && (
                    <div
                        onClick={() => setShowKelulusanInfo(false)}
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
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F3294" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Tingkat Kelulusan</h3>
                            <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                                Persentase mahasiswa yang berhasil menyelesaikan studi sesuai kriteria kelulusan yang ditetapkan.
                            </p>
                        </div>
                    </div>
                )}

                {/* IKU Info Modal */}
                {showIkuInfo && (
                    <div
                        onClick={() => setShowIkuInfo(false)}
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
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F3294" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="9" />
                                    <circle cx="12" cy="12" r="5.5" />
                                    <circle cx="12" cy="12" r="2" />
                                    <line x1="12" y1="2" x2="12" y2="5.5" />
                                    <line x1="12" y1="18.5" x2="12" y2="22" />
                                    <line x1="2" y1="12" x2="5.5" y2="12" />
                                    <line x1="18.5" y1="12" x2="22" y2="12" />
                                </svg>
                            </div>
                            <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Capaian IKU</h3>
                            <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                                Persentase pencapaian target Indikator Kinerja Utama (IKU) yang telah ditetapkan.
                            </p>
                        </div>
                    </div>
                )}

                {/* Kepuasan Info Modal */}
                {showKepuasanInfo && (
                    <div
                        onClick={() => setShowKepuasanInfo(false)}
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
                                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0F3294" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                </svg>
                            </div>
                            <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Kepuasan Mahasiswa</h3>
                            <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                                Nilai rata-rata tingkat kepuasan mahasiswa berdasarkan hasil survei.
                            </p>
                        </div>
                    </div>
                )}
            </Layout>
        </>
    );
}

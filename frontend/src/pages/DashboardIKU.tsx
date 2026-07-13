import Layout from "../components/Layout";
import { FunctionComponent, useState } from "react";
import { FiAlertTriangle, FiHome, FiInfo, FiLock } from "react-icons/fi";
import { LuGraduationCap, LuSparkles } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDeviceDesktopAnalytics, TbTargetArrow } from "react-icons/tb";
import { FaArrowRight, FaArrowUp, FaRegBell, FaRegSmile } from "react-icons/fa";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { TfiTarget } from "react-icons/tfi";
import { RiMedalLine } from "react-icons/ri";
import { VscHubot } from "react-icons/vsc";
import SupersetEmbedDefault from "../components/SupersetEmbedDefault";
import { supersetDashboards } from "../config/SupersetDb";

type DashboardIKUProps = {
  kpiCapaianUrl?: string;
  kpiTargetUrl?: string;
  kpiTercapaiUrl?: string;
  kpiPerhatianUrl?: string;
  trendIkuUrl?: string;
  perspektifIkuUrl?: string;
  indikatorTableUrl?: string;
  perbandinganUrl?: string;
};

type EmbedProps = {
  src?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
};

const EmbedBox: FunctionComponent<EmbedProps> = ({
  src,
  title,
  className = "",
  children,
}) => {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-white ${className}`}>
      {src ? (
        <iframe
          title={title}
          src={src}
          className="h-full w-full border-0"
          loading="lazy"
        />
      ) : (
        children ?? (
          <div className="flex h-full w-full items-center justify-center text-[11px] font-medium text-slate-400">
            Embed Superset: {title}
          </div>
        )
      )}
    </div>
  );
};

/* GLOBAL STYLES */
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

/*HOVER CARD*/
function HoverCard({ style = {}, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div className="card-hover" style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8EDF5", boxShadow: "0 1px 4px rgba(30,58,138,0.05)", ...style }}>
      {children}
    </div>
  );
}

const KpiIKUPlaceholder = ({
  icon,
  title,
  value,
  change,
  description,
  tone = "blue",
  onInfoClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description: string;
  tone?: "blue" | "yellow" | "green" | "red" | "darkgrey";
  onInfoClick?: () => void;
}) => {
  const toneStyles = {
    blue: "bg-[#EAF1FF] text-[#155EEF]",
    yellow: "bg-[#FFF4D8] text-[#F59E0B]",
    green: "bg-[#E6FBEF] text-[#22C55E]",
    red: "bg-[#FFE7E7] text-[#EF4444]",
    darkgrey: "text-[darkgrey]",
  };

  return (
    <div className="flex h-full items-center px-[10px] py-[2px]">
      <div
        className={`mr-[10px] flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ${toneStyles[tone]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="text-[12px] font-medium leading-[14px] text-black">
            {title}
          </div>
          {onInfoClick ? (
            <button
              type="button"
              className="relative z-10 -mr-2 -mt-2 cursor-pointer p-2 transition-transform hover:scale-110 bg-transparent border-none outline-none"
              style={{ backgroundColor: "transparent" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInfoClick();
              }}
            >
              <FiInfo className="h-4 w-4 text-black" />
            </button>
          ) : (
            <FiInfo className="h-4 w-4 text-black" />
          )}
        </div>

        <div className="mt-[3px] text-[25px] font-semibold leading-[31px] text-black">
          {value}
        </div>

        <div
          className={`mt-[1px] flex items-center gap-1 text-[10px] font-semibold ${tone === "red" || tone === "yellow" ? "text-[#155EEF]" : "text-[#00C853]"
            }`}
        >
          {tone === "darkgrey" || tone === "green" ? <FaArrowUp className="h-3 w-3" /> : null}
          <span>{change}</span>
        </div>

        <div className="mt-[2px] text-[9px] leading-[11px] text-[#6B7280]">
          {description}
        </div>
      </div>
    </div>
  );
};

const ChartFallback = ({ title }: { title: string }) => (
  <div className="flex h-full w-full items-center justify-center rounded-[10px] border border-dashed border-[#B9C8E8] text-[12px] font-medium text-slate-400">
    Embed Superset: {title}
  </div>
);

const InsightRow = ({
  tone,
  icon,
  text,
}: {
  tone: "green" | "yellow" | "blue";
  icon: React.ReactNode;
  text: string;
}) => {
  const styles = {
    green: "bg-[#DCFCE7] text-[#22C55E]",
    yellow: "bg-[#FFF4D8] text-[#F59E0B]",
    blue: "bg-[#EAF1FF] text-[#155EEF]",
  };

  return (
    <div className="flex items-start gap-[8px]">
      <div
        className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-[5px] ${styles[tone]}`}
      >
        {icon}
      </div>
      <p className="text-[9px] leading-[12px] text-[#4B5563]">{text}</p>
    </div>
  );
};

const InsightOtomatis = () => {
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  return (
    <>
      <div
        className="relative rounded-[10px] bg-white px-[12px] py-[12px] overflow-hidden cursor-pointer"
        onClick={() => setShowPremiumPopup(true)}
      >
        <div className="blur-[3px] opacity-50 pointer-events-none select-none">
          <div className="mb-[12px] flex items-center gap-[10px]">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[#EAF1FF]">
              <LuSparkles className="h-4 w-4 text-[#155EEF]" />
            </div>
            <div className="flex-1 text-[12px] font-semibold leading-[14px] text-black">
              Insight Otomatis
            </div>
            <FiInfo className="h-4 w-4 text-[#155EEF]" />
          </div>

          <p className="mb-[9px] text-[9px] font-medium leading-[12px] text-[#0B3478]">
            Capaian IKU institusi sebesar 76,8%, meningkat 4,35% dibanding semester
            lalu
          </p>

          <div className="flex flex-col gap-[1px]">
            <InsightRow
              tone="green"
              icon={<FaArrowUp className="h-3 w-3" />}
              text="Capaian terbaik terdapat pada perspektif pendidikan (82,1%)"
            />
            <InsightRow
              tone="yellow"
              icon={<FiAlertTriangle className="h-3 w-3" />}
              text="Perspektif penelitian masih dibawah target tahunan"
            />
            <InsightRow
              tone="blue"
              icon={<FaRegSmile className="h-3 w-3" />}
              text="Rekomendasi: Tingkatkan kolaborasi penelitian dan publikasi terindeks"
            />
          </div>

          <button className="mt-[10px] flex h-[31px] w-full items-center justify-center gap-[8px] rounded-[7px] bg-[#D7E6FF] text-[10px] font-semibold text-[#155EEF]" tabIndex={-1}>
            Lihat Rekomendasi Lengkap
            <FaArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[1px]">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[8px] shadow-sm">
            <FiLock className="h-[18px] w-[18px] text-[#155EEF]" />
          </div>
          <span className="text-[13px] font-bold text-[#0B3478]">Tidak Tersedia</span>
        </div>
      </div>

      {showPremiumPopup && (
        <div
          onClick={() => setShowPremiumPopup(false)}
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
              background: "#FFF4D8",
              width: 72, height: 72,
              borderRadius: 18,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
              border: "1px solid #FEF0C7"
            }}>
              <FiLock className="h-[36px] w-[36px] text-[#F59E0B]" />
            </div>
            <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Coming Soon</h3>
            <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
              Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia. Nantikan pembaruan berikutnya untuk menikmati pengalaman yang lebih baik..
            </p>
            <button
              onClick={() => setShowPremiumPopup(false)}
              className="mt-8 w-full rounded-lg bg-[#155EEF] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const DashboardIKU: FunctionComponent<DashboardIKUProps> = ({
  kpiCapaianUrl,
  kpiTargetUrl,
  kpiTercapaiUrl,
  kpiPerhatianUrl,
  trendIkuUrl,
  perspektifIkuUrl,
  indikatorTableUrl,
  perbandinganUrl,
}) => {
  const [showCapaianInfo, setShowCapaianInfo] = useState(false);
  const [showTargetInfo, setShowTargetInfo] = useState(false);
  const [showTercapaiInfo, setShowTercapaiInfo] = useState(false);
  const [showPerhatianInfo, setShowPerhatianInfo] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <Layout
        title="Dashboard Monitoring IKU"
        active="Monitoring IKU"
      >
        <section className="grid grid-cols-4 gap-[12px]">
          <EmbedBox
            src={kpiCapaianUrl}
            title="KPI Capaian IKU Institusi"
            className="h-[102px]"
          >
            <KpiIKUPlaceholder
              icon={<TfiTarget className="h-9 w-9" />}
              title="Capaian IKU Institusi"
              value="76,8%"
              change="4,35 dari semester lalu"
              description="Total Capaian 23 dari 30 Indikator"
              tone="blue"
              onInfoClick={() => setShowCapaianInfo(true)}
            />
          </EmbedBox>

          <EmbedBox
            src={kpiTargetUrl}
            title="KPI Target Tahunan"
            className="h-[102px]"
          >
            <KpiIKUPlaceholder
              icon={<TbTargetArrow className="h-8 w-8" />}
              title="Target Tahunan"
              value="85,0%"
              change="Target akhir tahun"
              description="Sisa 8,2% untuk mencapai target"
              tone="yellow"
              onInfoClick={() => setShowTargetInfo(true)}
            />
          </EmbedBox>

          <EmbedBox
            src={kpiTercapaiUrl}
            title="KPI IKU Tercapai"
            className="h-[102px]"
          >
            <KpiIKUPlaceholder
              icon={<RiMedalLine className="h-8 w-8" />}
              title="IKU Tercapai"
              value="15"
              change="50% dari total indikator"
              description="IKU tercapai atau melebihi target"
              tone="green"
              onInfoClick={() => setShowTercapaiInfo(true)}
            />
          </EmbedBox>

          <EmbedBox
            src={kpiPerhatianUrl}
            title="KPI IKU Perlu Perhatian"
            className="h-[102px]"
          >
            <KpiIKUPlaceholder
              icon={<FiAlertTriangle className="h-8 w-8" />}
              title="IKU Perlu Perhatian"
              value="85,0%"
              change="Target akhir tahun"
              description="Sisa 8,2% untuk mencapai target"
              tone="red"
              onInfoClick={() => setShowPerhatianInfo(true)}
            />
          </EmbedBox>
        </section>

        <section className="mt-[10px] grid grid-cols-[1fr_1fr_200px] gap-[10px]">
          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Tren Capaian IKU Institusi</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.trenIku}
                contentClassName="w-[175%] h-[170%] -translate-x-[90px] -translate-y-[60px] scale-[0.8] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Capaian IKU per Perspektif</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.perspektifIku}
                contentClassName="w-[175%] h-[170%] -translate-x-[90px] -translate-y-[60px] scale-[0.8] origin-top-left"
              />
            </div>
          </HoverCard>

          <InsightOtomatis />
        </section>

        <section className="mt-[10px] grid grid-cols-[1.48fr_1fr] gap-[10px]">
          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Capaian per Indikator Kinerja Utama</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.indikatorIku}
                contentClassName="w-[150%] h-[170%] -translate-x-[55px] -translate-y-[60px] scale-[0.8] origin-top-left"
              />
            </div>
          </HoverCard>

          <HoverCard style={{ padding: "18px 18px 10px" }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", margin: "0 0 14px" }}>Perbandingan Capaian</p>
            <div className="h-[260px] w-full overflow-hidden">
              <SupersetEmbedDefault
                dashboardId={supersetDashboards.perbandinganIku}
                contentClassName="w-[160%] h-[170%] -translate-x-[55px] -translate-y-[60px] scale-[0.8] origin-top-left"
              />
            </div>
          </HoverCard>
        </section>

        <button className="fixed bottom-[30px] right-[31px] flex h-[36px] w-[36px] items-center justify-center rounded-[9px] bg-[#155EEF] text-[25px] text-white shadow-lg">
          <VscHubot className="h-10 w-10 text-white" />
        </button>

        {/* Capaian IKU Info Pop up */}
        {showCapaianInfo && (
          <div
            onClick={() => setShowCapaianInfo(false)}
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
                <TbTargetArrow className="h-[36px] w-[36px] text-[#0F3294]" />
              </div>
              <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Capaian IKU Institusi</h3>
              <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                Persentase rata-rata ketercapaian seluruh Indikator Kinerja Utama (IKU) institusi pada tahun berjalan dibandingkan dengan target tahunan yang telah ditetapkan.
              </p>
            </div>
          </div>
        )}

        {/* Target Tahunan Info Pop up */}
        {showTargetInfo && (
          <div
            onClick={() => setShowTargetInfo(false)}
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
                <TbTargetArrow className="h-[36px] w-[36px] text-[#0F3294]" />
              </div>
              <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Target Tahunan</h3>
              <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                Sasaran kinerja yang harus dicapai oleh institusi dalam satu tahun anggaran atau akademik.
              </p>
            </div>
          </div>
        )}

        {/* IKU Tercapai Info Pop up */}
        {showTercapaiInfo && (
          <div
            onClick={() => setShowTercapaiInfo(false)}
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
                  background: "#047857",
                  width: 36, height: 36,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>IKU Tercapai</h3>
              <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                Jumlah indikator kinerja yang telah memenuhi atau melampaui target yang ditetapkan.
              </p>
            </div>
          </div>
        )}

        {/* IKU Perlu Perhatian Info Pop up */}
        {showPerhatianInfo && (
          <div
            onClick={() => setShowPerhatianInfo(false)}
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
                  background: "#EF4444",
                  width: 36, height: 36,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white"
                }}>
                  <FiAlertTriangle size={20} strokeWidth={2.5} />
                </div>
              </div>
              <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>IKU Perlu Perhatian</h3>
              <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
                Indikator kinerja yang capaiannya masih di bawah target yang ditetapkan dan memerlukan evaluasi serta tindak lanjut.
              </p>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default DashboardIKU;

import Logo from "../assets/Logo.png";
import { FunctionComponent } from "react";
import { FiAlertTriangle, FiHome, FiInfo } from "react-icons/fi";
import { LuGraduationCap, LuSparkles } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDeviceDesktopAnalytics, TbTargetArrow } from "react-icons/tb";
import { FaArrowRight, FaArrowUp, FaRegBell, FaRegSmile } from "react-icons/fa";
import { FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { TfiTarget } from "react-icons/tfi";
import { RiMedalLine } from "react-icons/ri";
import { VscHubot } from "react-icons/vsc";

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

const Sidebar = () => {
  const menu = [
    { icon: <FiHome size={20} />, label: "Dashboard Utama", active: false },
    { icon: <FaRegUser size={20} />, label: "Pimpinan", active: false },
    { icon: <LuGraduationCap size={20} />, label: "Akademik", active: false },
    { icon: <TbDeviceDesktopAnalytics size={20} />, label: "Monitoring IKU", active: true },
    { icon: <IoSettingsOutline size={20} />, label: "Manajemen Sistem", active: false },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[200px] bg-white px-[20px] py-[33px]">
      <div className="flex items-center gap-[14px]">
        <div className="mb-11 flex items-center gap-3">
          <img src={Logo} alt="logo" className="h-[36px] w-[36px]" />

          <div className="flex flex-1 flex-col items-start px-0 pb-0 pt-[0px]">
            <div className="flex flex-col items-start justify-center self-stretch">
              <h2 className="m-0 text-[20px] font-semibold leading-none text-black">
                Satu Data
              </h2>

              <div className="mt-1 text-[9px] font-medium tracking-[1px] text-black">
                PERGURUAN TINGGI
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-[20px] flex flex-col gap-[3px]">
        {menu.map((item) => (
          <div
            key={item.label}
            className={`flex h-[60px] items-center gap-[16px] rounded-[8px] px-[14px] text-[14px] font-medium ${
              item.active ? "bg-[#155EEF] text-white" : "text-[#111827]"
            }`}
          >
            <div className="flex items-center justify-center">{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

const Navbar = () => {
  return (
    <header className="flex h-[96px] items-start justify-between px-[17px] pt-[22px]">
      <h1 className="text-[24px] font-semibold leading-none text-[#0B3478]">
        Dashboard Monitoring IKU
      </h1>

      <div className="flex items-start gap-[10px]">
        <div className="w-[255px]">
          <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
            Tahun Akademik
          </div>
          <div className="flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium text-[#C5CBD5]">
            <span>Pilih tahun akademik</span>
            <span className="text-[20px]">⌄</span>
          </div>
        </div>

        <div className="w-[207px]">
          <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
            Semester
          </div>
          <div className="flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium text-[#C5CBD5]">
            <span>Pilih semester</span>
            <span className="text-[20px]">⌄</span>
          </div>
        </div>

        <div className="flex items-center gap-[15px] pt-[27px]">
          <FaRegBell className="h-5 w-5 text-[#111827]" />
          <FaRegCircleUser className="h-6 w-6 text-[#155EEF]" />
          <div className="w-[74px] text-[12px] font-medium leading-[14px] text-[#111827]">
            <div>Pimpinan</div>
            <div className="font-semibold text-[#0B3478]">Rektor</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const KpiIKUPlaceholder = ({
  icon,
  title,
  value,
  change,
  description,
  tone = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  description: string;
  tone?: "blue" | "yellow" | "green" | "red" | "darkgrey";
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
          <FiInfo className="h-4 w-4 text-black" />
        </div>

        <div className="mt-[3px] text-[25px] font-semibold leading-[31px] text-black">
          {value}
        </div>

        <div
          className={`mt-[1px] flex items-center gap-1 text-[10px] font-semibold ${
            tone === "red" || tone === "yellow" ? "text-[#155EEF]" : "text-[#00C853]"
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
  return (
    <div className="h-15 rounded-[10px] bg-white px-[12px] py-[12px]">
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

      <button className="mt-[10px] flex h-[31px] w-full items-center justify-center gap-[8px] rounded-[7px] bg-[#D7E6FF] text-[10px] font-semibold text-[#155EEF]">
        Lihat Rekomendasi Lengkap
        <FaArrowRight className="h-3 w-3" />
      </button>
    </div>
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
  return (
    <div className="min-h-screen bg-[#EAF2FF] font-['SF_Pro',Inter,Arial,sans-serif]">
      <Sidebar />

      <main className="min-h-screen ml-[240px]">
        <Navbar />

        <div className="px-[16px] pb-[28px]">
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
              />
            </EmbedBox>
          </section>

          <section className="mt-[10px] grid grid-cols-[1fr_1fr_200px] gap-[10px]">
            <EmbedBox
              src={trendIkuUrl}
              title="Tren Capaian IKU Institusi"
              className="h-[300px]"
            >
              <ChartFallback title="Tren Capaian IKU Institusi" />
            </EmbedBox>

            <EmbedBox
              src={perspektifIkuUrl}
              title="Capaian IKU per Perspektif"
              className="h-[300px]"
            >
              <ChartFallback title="Capaian IKU per Perspektif" />
            </EmbedBox>

            <InsightOtomatis />
          </section>

          <section className="mt-[10px] grid grid-cols-[1.48fr_1fr] gap-[10px]">
            <EmbedBox
              src={indikatorTableUrl}
              title="Capaian per Indikator Kinerja Utama"
              className="h-[308px]"
            >
              <ChartFallback title="Capaian per Indikator Kinerja Utama" />
            </EmbedBox>

            <EmbedBox
              src={perbandinganUrl}
              title="Perbandingan Capaian"
              className="h-[308px]"
            >
              <ChartFallback title="Perbandingan Capaian" />
            </EmbedBox>
          </section>
        </div>

        <button className="fixed bottom-[30px] right-[31px] flex h-[54px] w-[54px] items-center justify-center rounded-[9px] bg-[#155EEF] text-[25px] text-white shadow-lg">
          <VscHubot className="h-10 w-10 text-white" />
        </button>
      </main>
    </div>
  );
};

export default DashboardIKU;

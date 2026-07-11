// frontend/src/pages/DashboardSistem.tsx
import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import { FiEdit2, FiFilter, FiSearch, FiTrash2, FiUserCheck, FiUsers, FiLock } from "react-icons/fi";
import { FaRegUser, FaLink } from "react-icons/fa6";
import { LuPencil, LuShieldCheck } from "react-icons/lu";
import { TbDatabase, TbTrash } from "react-icons/tb";
import { IoAnalyticsOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FiChevronDown, FiRefreshCw, FiCalendar, FiClock, FiChevronRight } from "react-icons/fi";
import { BsBuilding, BsBook, BsCloud, BsCloudArrowUp } from "react-icons/bs";
import { TbDeviceAnalytics } from "react-icons/tb";
import { HiOutlineSave } from "react-icons/hi";
import { MdDashboard, MdOutlineApi, MdOutlineEmail, MdOutlineVpnKey } from "react-icons/md";
import { ImLibrary } from "react-icons/im";
import { RiGraduationCapLine } from "react-icons/ri";

type UserRole = "Admin" | "Operator" | "Akademik" | "Viewer" | "Pimpinan";
type UserStatus = "Aktif" | "Nonaktif";

type User = {
  id: number | string;
  initials: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
};

const mockUsers: User[] = [
  {
    id: 1,
    initials: "SA",
    name: "Siti Nur Aisyah",
    email: "aisyah.nur@universitas.ac.id",
    role: "Admin",
    status: "Aktif",
    lastLogin: "14 Mei 2025, 09:23",
  },
  {
    id: 2,
    initials: "BS",
    name: "Budi Santoso",
    email: "budi.santoso@universitas.ac.id",
    role: "Operator",
    status: "Aktif",
    lastLogin: "14 Mei 2025, 08:11",
  },
  {
    id: 3,
    initials: "RA",
    name: "Rina Adi",
    email: "rina.adi@universitas.ac.id",
    role: "Akademik",
    status: "Aktif",
    lastLogin: "14 Mei 2025, 07:45",
  },
  {
    id: 4,
    initials: "HM",
    name: "Hendra Maulana",
    email: "hendra.maulana@universitas.ac.id",
    role: "Viewer",
    status: "Nonaktif",
    lastLogin: "10 Mei 2025, 16:30",
  },
  {
    id: 5,
    initials: "DP",
    name: "Dewi Pratiwi",
    email: "dewi.pratiwi@universitas.ac.id",
    role: "Operator",
    status: "Aktif",
    lastLogin: "14 Mei 2025, 09:10",
  },
  {
    id: 6,
    initials: "YK",
    name: "Yusuf Khair",
    email: "yusuf.khair@universitas.ac.id",
    role: "Pimpinan",
    status: "Aktif",
    lastLogin: "14 Mei 2025, 09:02",
  },
  {
    id: 7,
    initials: "NA",
    name: "Nadia Aulia",
    email: "nadia.aulia@universitas.ac.id",
    role: "Viewer",
    status: "Nonaktif",
    lastLogin: "8 Mei 2025, 12:11",
  },
];

const roleClass: Record<UserRole, string> = {
  Admin: "bg-[#D7E6FF] text-[#155EEF]",
  Operator: "bg-[#DCFCE7] text-[#16A34A]",
  Akademik: "bg-[#EEE7FF] text-[#7C3AED]",
  Viewer: "bg-[#F3F4F6] text-[#4B5563]",
  Pimpinan: "bg-[#EEE7FF] text-[#7C3AED]",
};

const statusClass: Record<UserStatus, string> = {
  Aktif: "bg-[#DCFCE7] text-[#16A34A]",
  Nonaktif: "bg-[#FFE7E7] text-[#EF4444]",
};

const SummaryCard = ({
  icon,
  title,
  value,
  desc,
  tone,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  desc: string;
  tone: string;
  onClick?: () => void;
}) => {
  return (
<<<<<<< HEAD
    <div 
      className="relative flex h-[82px] items-center gap-3 rounded-[10px] bg-white px-4 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="flex w-full items-center gap-3 blur-[3px] opacity-50 pointer-events-none select-none">
        <div
          className={`flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full ${tone}`}
        >
          {icon}
        </div>
=======
    <div className="flex h-[82px] items-center gap-3 rounded-[10px] bg-white px-4 border border-slate-100 shadow-sm">
      <div
        className={`flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-full ${tone}`}
      >
        {icon}
      </div>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf

        <div className="min-w-0">
          <div className="text-[11px] font-medium text-black">{title}</div>
          <div className="text-[20px] font-semibold leading-[30px] text-black">
            {value}
          </div>
          <div className="mt-[2px] text-[9px] leading-[11px] text-[#0B3478]">
            {desc}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[1px] hover:bg-white/30 transition-colors">
        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[4px] shadow-sm">
          <FiLock className="h-[14px] w-[14px] text-[#155EEF]" />
        </div>
        <span className="text-[10px] font-bold text-[#0B3478]">Tidak Tersedia</span>
      </div>
    </div>
  );
};

const systemCards = [
  {
    title: "Total Pengguna",
    value: "128",
    desc: "Semua pengguna terdaftar",
    icon: <FaRegUser className="h-6 w-6" />,
    tone: "bg-[#D7E6FF] text-[#155EEF]",
  },
  {
    title: "Pengguna Aktif",
    value: "128",
    desc: "75% dari total pengguna",
    icon: <FiUserCheck className="h-6 w-6" />,
    tone: "bg-[#DCFCE7] text-[#22C55E]",
  },
  {
    title: "Role Aktif",
    value: "12",
    desc: "Hak akses terkonfigurasi",
    icon: <LuShieldCheck className="h-6 w-6" />,
    tone: "bg-[#EEE7FF] text-[#7C3AED]",
  },
  {
    title: "Integrasi Aktif",
    value: "5",
    desc: "Sistem Terhubung",
    icon: <TbDatabase className="h-6 w-6" />,
    tone: "bg-[#FFF4D8] text-[#F59E0B]",
  },
  {
    title: "Status Sistem",
    value: "Sehat",
    desc: "Semua layanan berjalan normal",
    icon: <IoCheckmarkCircleOutline className="h-7 w-7" />,
    tone: "bg-[#DCFCE7] text-[#22C55E]",
  },
];

const monitoringCards = [
  {
    title: "Total Sumber Data",
    value: "12",
    desc: "Sumber Data Terdaftar",
    icon: <FaRegUser className="h-6 w-6" />,
    tone: "bg-[#D7E6FF] text-[#155EEF]",
  },
  {
    title: "Sync Berhasil",
    value: "10",
    desc: "83,3% Berhasil",
    icon: <FiUserCheck className="h-6 w-6" />,
    tone: "bg-[#DCFCE7] text-[#22C55E]",
  },
  {
    title: "Sync Gagal",
    value: "2",
    desc: "16,7% Gagal",
    icon: <LuShieldCheck className="h-6 w-6" />,
    tone: "bg-[#EEE7FF] text-[#7C3AED]",
  },
  {
    title: "Rata rata Delay",
    value: "00:15:32",
    desc: "Waktu Keterlambatan",
    icon: <TbDatabase className="h-6 w-6" />,
    tone: "bg-[#FFF4D8] text-[#F59E0B]",
  },
  {
    title: "Terakhir Refresh",
    value: "9:30 WIB",
    desc: "5 Menit Yang Lalu",
    icon: <IoCheckmarkCircleOutline className="h-7 w-7" />,
    tone: "bg-[#DCFCE7] text-[#22C55E]",
  },
];

const DashboardSistem = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Manajemen User");
  const [selectedRole, setSelectedRole] = useState("Admin");
<<<<<<< HEAD
  const [openGroups, setOpenGroups] = useState({ Dashboard: true, "Manajemen Sistem": true, });
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  const currentCards =
    activeTab === "Monitoring Data" || activeTab === "Integrasi Dashboard" ? monitoringCards : systemCards;
  // Sementara masih pakai mock data karena backend belum punya endpoint user.
  // Nanti kalau endpoint sudah ada, bagian ini bisa diganti fetch API.
=======
  const [openGroups, setOpenGroups] = useState({ Dashboard: true, "Manajemen Sistem": true });

  const currentCards =
    activeTab === "Monitoring Data" || activeTab === "Integrasi Dashboard" ? monitoringCards : systemCards;

>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group as keyof typeof prev],
    }));
  };

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.role.toLowerCase().includes(keyword)
    );
  }, [search, users]);

  return (
    <Layout title="Manajemen Sistem" active="Manajemen Sistem" showFilters={false}>
      {/* TOP KPI CARDS */}
      <section className="grid grid-cols-5 gap-[10px]">
        {currentCards.map((card) => (
          <SummaryCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
            desc={card.desc}
            tone={card.tone}
            onClick={() => setShowPremiumPopup(true)}
          />
        ))}
      </section>

      {/* CORE FEATURE AREA */}
      <section className="mt-[14px] rounded-[12px] bg-white px-[24px] pb-[24px] pt-[12px] shadow-[0_8px_18px_rgba(15,23,42,0.04)] border border-slate-100">
        <div className="mb-[24px] flex items-center gap-[30px] border-b border-[#E5EAF3] bg-white">
          {[
<<<<<<< HEAD
            {
              label: "Manajemen User",
              icon: <FiUsers className="h-4 w-4" />,
            },
            {
              label: "Manajemen Role",
              icon: <AiOutlineSafetyCertificate className="h-4 w-4" />,
            },
            {
              label: "Monitoring Data",
              icon: <IoAnalyticsOutline className="h-4 w-4" />,
            },
            {
              label: "Integrasi Dashboard",
              icon: <FaLink className="h-4 w-4" />,
            }
=======
            { label: "Manajemen User", icon: <FiUsers className="h-4 w-4" /> },
            { label: "Manajemen Role", icon: <AiOutlineSafetyCertificate className="h-4 w-4" /> },
            { label: "Monitoring Data", icon: <IoAnalyticsOutline className="h-4 w-4" /> },
            { label: "Integrasi Dashboard", icon: <FaLink className="h-4 w-4" /> }
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-[8px] h-[42px] bg-white border-b-2 text-[13px] font-bold transition-all ${activeTab === tab.label
                  ? "border-[#155EEF] text-[#155EEF]"
                  : "border-transparent text-[#64748B] hover:text-[#155EEF]"
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: MANAJEMEN USER */}
        {activeTab === "Manajemen User" && (
          <div className="relative cursor-pointer" onClick={() => setShowPremiumPopup(true)}>
            <div className="blur-[4px] opacity-60 pointer-events-none select-none rounded-[10px] bg-white p-[1px]">
              <>
            <div className="mb-[26px] flex items-start justify-between">
              <div>
                <h2 className="text-[22px] font-semibold leading-none text-[#111827]">
                  Manajemen User
                </h2>
                <p className="mt-[8px] text-[12px] text-[#64748B]">
                  Kelola pengguna sistem, status akun, dan role akses.
                </p>
              </div>

              <div className="flex items-center gap-[10px]">
                <div className="flex h-[38px] w-[280px] items-center rounded-[8px] bg-white px-[14px] outline outline-1 outline-[#D0D5DD] transition-all focus-within:outline-[#155EEF] focus-within:ring-2 focus-within:ring-[#D7E6FF]">
<<<<<<< HEAD
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Cari nama atau email..."
                    className="flex-1 border-0 bg-transparent text-[12px] text-[#111827] outline-none focus:outline-none placeholder:text-[#94A3B8]"
                  />
                  <FiSearch className="h-4 w-4 shrink-0 text-[#94A3B8]" />
=======
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Cari nama atau email..."
                      className="flex-1 border-0 bg-transparent text-[12px] text-[#111827] outline-none focus:outline-none placeholder:text-[#94A3B8]"
                    />
                    <FiSearch className="h-4 w-4 shrink-0 text-[#94A3B8]" />
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                </div>

                <button
                  className="flex h-[38px] items-center gap-[8px] rounded-[8px] outline outline-1 outline-[#D0D5DD] bg-white px-[14px] text-[12px] font-medium text-[#111827] shadow-sm transition-all hover:border-[#155EEF] hover:bg-[#EEF4FF] hover:text-[#155EEF]"
                >
                  <FiFilter className="h-4 w-4" />
                  Filter
                </button>

                <button className="h-[36px] rounded-[7px] bg-[#155EEF] px-[18px] text-[12px] font-semibold text-white transition hover:bg-[#0B4FDA]">
                  + Tambah User
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[830px] border-collapse">
                <thead>
                  <tr className="border-b border-[#E5EAF3] text-left text-[10px] font-semibold uppercase tracking-[1.2px] text-[#94A3B8]">
                    <th className="pb-[12px] pl-[14px]">Nama</th>
                    <th className="pb-[12px]">Email</th>
                    <th className="pb-[12px]">Role</th>
                    <th className="pb-[12px]">Status</th>
                    <th className="pb-[12px]">Terakhir Login</th>
                    <th className="pb-[12px] text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#F1F5F9] text-[12px] text-[#64748B] transition hover:bg-[#F8FAFC]"
                    >
                      <td className="py-[11px] pl-[14px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#D7E6FF] text-[11px] font-semibold text-[#155EEF]">
                            {user.initials}
                          </div>
                          <span className="font-medium text-[#334155]">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-[11px]">{user.email}</td>

                      <td className="py-[11px]">
                        <span
                          className={`rounded-[5px] px-[9px] py-[4px] text-[10px] font-semibold ${roleClass[user.role] ?? roleClass.Viewer
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="py-[11px]">
                        <span
                          className={`rounded-[6px] px-[12px] py-[4px] text-[10px] font-semibold ${statusClass[user.status] ?? statusClass.Nonaktif
                            }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="py-[11px]">{user.lastLogin}</td>

                      <td className="py-[11px]">
                        <div className="flex items-center justify-center gap-[8px]">
                          <button className="flex h-[25px] w-[25px] items-center justify-center rounded-[5px] border border-[#E2E8F0] text-[#94A3B8] transition hover:border-[#155EEF] hover:text-[#155EEF]">
                            <FiEdit2 className="h-3.5 w-3.5" />
                          </button>

                          <button className="flex h-[25px] w-[25px] items-center justify-center rounded-[5px] border border-[#E2E8F0] text-[#94A3B8] transition hover:border-[#EF4444] hover:text-[#EF4444]">
                            <FiTrash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!isLoading && filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-[13px] text-[#94A3B8]">
                        Tidak ada data pengguna yang sesuai.
                      </td>
                    </tr>
                  )}

                  {isLoading && (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-[13px] text-[#94A3B8]">
                        Memuat data pengguna...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-[18px] flex items-center justify-between text-[12px] text-[#94A3B8]">
              <span>
                {isLoading
                  ? "Memuat data pengguna..."
<<<<<<< HEAD
                  : `Menampilkan 1-${filteredUsers.length} dari ${users.length || mockUsers.length
                  } pengguna`}
=======
                  : `Menampilkan 1-${filteredUsers.length} dari ${users.length} pengguna`}
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
              </span>

              <div className="flex items-center gap-[16px]">
                <button className="text-[#94A3B8]">‹</button>
                <button className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-[#155EEF] font-semibold text-white">
                  1
                </button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>19</button>
                <button className="text-[#94A3B8]">›</button>
              </div>
            </div>
              </>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] hover:bg-white/30 transition-colors rounded-[10px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[8px] shadow-sm">
                <FiLock className="h-[20px] w-[20px] text-[#155EEF]" />
              </div>
              <span className="text-[14px] font-bold text-[#0B3478]">Fitur Premium - Tidak Tersedia</span>
            </div>
          </div>
        )}

        {/* TAB 2: MANAJEMEN ROLE */}
        {activeTab === "Manajemen Role" && (
          <div className="relative cursor-pointer" onClick={() => setShowPremiumPopup(true)}>
            <div className="blur-[4px] opacity-60 pointer-events-none select-none bg-white rounded-[10px] p-[1px]">
              <div className="grid grid-cols-[300px_1fr]">
            <div className="border-r border-[#E5EAF3] pr-[20px]">
              <div className="mb-[18px] flex items-start justify-between">
                <div>
                  <h2 className="text-[22px] font-semibold leading-none text-[#111827]">
                    Daftar Role
                  </h2>
                  <p className="mt-[10px] text-[12px] text-[#64748B]">
                    Kelola role dan hak akses pengguna.
                  </p>
                </div>

                <button className="mt-[12px] flex h-[35px] items-center whitespace-nowrap rounded-[7px] bg-[#155EEF] px-[14px] text-[12px] font-semibold text-white transition hover:bg-[#0B4FDA]">
                  + Tambah Role
                </button>
              </div>

              <div className="flex flex-col gap-[10px]">
                {[
                  { code: "AD", name: "Admin", desc: "Super Administrator", users: 8, color: "bg-[#D7E6FF] text-[#155EEF]" },
                  { code: "PI", name: "Pimpinan", desc: "Akses pimpinan", users: 5, color: "bg-[#FFE7E7] text-[#EF4444]" },
                  { code: "BA", name: "Biro Akademik", desc: "Kelola data akademik", users: 12, color: "bg-[#EEE7FF] text-[#7C3AED]" },
                  { code: "UM", name: "Unit Jaminan Mutu", desc: "Monitoring & evaluasi", users: 6, color: "bg-[#DCFCE7] text-[#16A34A]" },
                  { code: "OP", name: "Operator", desc: "Operator sistem", users: 15, color: "bg-[#DCFCE7] text-[#16A34A]" },
                ].map((role) => (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`flex items-center gap-[12px] rounded-[10px] border p-[12px] text-left transition-all ${selectedRole === role.name
                        ? "border-[#155EEF] bg-[#EAF2FF]"
                        : "border-[#E5EAF3] bg-white hover:border-[#155EEF]"
                      }`}
                  >
                    <div className={`flex h-[38px] w-[38px] items-center justify-center rounded-[8px] text-[13px] font-semibold ${role.color}`}>
                      {role.code}
                    </div>

                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-[#111827]">{role.name}</div>
                      <div className="text-[10px] text-[#64748B]">{role.desc}</div>
                    </div>

                    <div className="text-[9px] text-[#94A3B8]">{role.users} pengguna</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pl-[28px]">
              <div className="mb-[28px] flex items-center justify-between">
                <div>
                  <h2 className="text-[24px] font-semibold text-[#111827]">
                    Role Anda: {selectedRole}
                  </h2>
                  <p className="mt-[6px] text-[12px] text-[#64748B]">
                    Atur hak akses untuk role ini.
                  </p>
                </div>

                <div className="flex gap-[10px]">
                  <button className="flex h-[38px] items-center gap-[8px] rounded-[8px] outline outline-1 outline-[#D0D5DD] bg-white px-[14px] text-[12px] font-medium text-[#111827] shadow-sm">
                    <LuPencil /> Edit Role
                  </button>

                  <button className="flex h-[38px] items-center gap-[8px] rounded-[8px] outline outline-1 outline-[#FECACA] bg-white px-[18px] py-[9px] text-[12px] font-medium text-[#EF4444] shadow-sm">
                    <TbTrash /> Hapus Role
                  </button>
                </div>
              </div>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-[10px] font-semibold uppercase tracking-[1px] text-[#94A3B8]">
                    <th className="pb-[12px]">Menu / Fitur</th>
                    <th className="pb-[12px] text-center">Lihat</th>
                    <th className="pb-[12px] text-center">Tambah</th>
                    <th className="pb-[12px] text-center">Ubah</th>
                    <th className="pb-[12px] text-center">Hapus</th>
                    <th className="pb-[12px] text-center">Ekspor</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    { group: "Dashboard", items: ["Dashboard Utama", "Dashboard Pimpinan", "Dashboard Akademik", "Dashboard IKU"] },
                    { group: "Manajemen Sistem", items: ["Manajemen User", "Manajemen Role", "Monitoring Data"] },
                  ].map((group) => (
                    <div key={group.group} className="contents">
                      <tr className="bg-[#F8FAFC]">
                        <td colSpan={6} className="py-[10px]">
                          <button
                            onClick={() => toggleGroup(group.group)}
                            className="flex items-center gap-[6px] text-[12px] font-semibold text-[#111827]"
                          >
                            <FiChevronDown
<<<<<<< HEAD
                              className={`transition-transform duration-300 ${openGroups[group.group as keyof typeof openGroups]
                                  ? "rotate-0"
                                  : "-rotate-90"
                                }`}
=======
                              className={`transition-transform duration-300 ${
                                openGroups[group.group as keyof typeof openGroups] ? "rotate-0" : "-rotate-90"
                              }`}
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                            />
                            {group.group}
                          </button>
                        </td>
                      </tr>

                      {openGroups[group.group as keyof typeof openGroups] &&
                        group.items.map((item) => (
<<<<<<< HEAD
                          <tr
                            key={item}
                            className="border-b border-[#F1F5F9] text-[12px] text-[#475569]"
                          >
                            <td className="py-[12px] pl-[30px]">{item}</td>

                            {["lihat", "tambah", "ubah", "hapus", "ekspor"].map(
                              (access, index) => (
                                <td key={access} className="py-[12px] text-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      index !== 3 || item === "Dashboard Utama"
                                    }
                                    className="h-[14px] w-[14px] accent-[#155EEF]"
                                  />
                                </td>
                              )
                            )}
                          </tr>
                        ))}
                    </>
=======
                        <tr key={item} className="border-b border-[#F1F5F9] text-[12px] text-[#475569]">
                          <td className="py-[12px] pl-[30px]">{item}</td>
                          {["lihat", "tambah", "ubah", "hapus", "ekspor"].map((access, index) => (
                            <td key={access} className="py-[12px] text-center">
                              <input
                                type="checkbox"
                                defaultChecked={index !== 3 || item === "Dashboard Utama"}
                                className="h-[14px] w-[14px] accent-[#155EEF]"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </div>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-span-2 mt-[20px] flex items-center justify-between rounded-b-[12px] bg-[#EAF2FF] px-[16px] py-[14px]">
              <p className="text-[11px] text-[#155EEF]">
                Perubahan hak akses akan diterapkan secara real-time untuk semua pengguna dengan role ini.
              </p>

              <button className="flex items-center gap-[8px] rounded-[7px] bg-[#155EEF] px-[26px] py-[11px] text-[12px] font-semibold text-white">
                <HiOutlineSave className="h-4 w-4" /> Simpan Perubahan
              </button>
            </div>
              </div>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] hover:bg-white/30 transition-colors rounded-[10px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[8px] shadow-sm">
                <FiLock className="h-[20px] w-[20px] text-[#155EEF]" />
              </div>
              <span className="text-[14px] font-bold text-[#0B3478]">Fitur Premium - Tidak Tersedia</span>
            </div>
          </div>
        )}

        {/* TAB 3: MONITORING DATA */}
        {activeTab === "Monitoring Data" && (
<<<<<<< HEAD
          <div className="relative cursor-pointer" onClick={() => setShowPremiumPopup(true)}>
            <div className="blur-[4px] opacity-60 pointer-events-none select-none">
              <div>
=======
          <div>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
            {/* BARIS ATAS */}
            <div className="grid grid-cols-[1.45fr_0.75fr] gap-[20px]">
              {/* KIRI: Status Sumber Data */}
              <div className="overflow-hidden rounded-[10px] border border-[#E5EAF3] bg-white">
                <div className="flex items-start justify-between border-b border-[#E5EAF3] px-[12px] py-[10px]">
                  <div>
                    <h2 className="text-[14px] font-semibold leading-none text-[#111827]">
                      Status Sumber Data
                    </h2>
                    <p className="mt-[5px] text-[10px] text-[#64748B]">
                      Pantau status sinkronisasi dan kesehatan data.
                    </p>
                  </div>

                  <div className="flex gap-[8px]">
                    <button className="flex h-[30px] items-center gap-[6px] rounded-[6px] border border-[#D0D5DD] bg-white px-[10px] text-[10px] font-medium text-[#475569]">
<<<<<<< HEAD
                      Semua Sumber Data
                      <FiChevronDown className="h-3 w-3 text-[#64748B]" />
                    </button>

                    <button className="flex h-[30px] items-center gap-[6px] rounded-[6px] border border-[#D0D5DD] bg-white px-[10px] text-[10px] font-medium text-[#475569]">
                      <FiRefreshCw className="h-3 w-3" />
                      Refresh Data
=======
                      Semua Sumber Data <FiChevronDown className="h-3 w-3 text-[#64748B]" />
                    </button>
                    <button className="flex h-[30px] items-center gap-[6px] rounded-[6px] border border-[#D0D5DD] bg-white px-[10px] text-[10px] font-medium text-[#475569]">
                      <FiRefreshCw className="h-3 w-3" /> Refresh Data
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                    </button>
                  </div>
                </div>

                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5EAF3] bg-[#FAFCFF] text-left text-[9px] font-semibold uppercase tracking-[0.8px] text-[#94A3B8]">
                      <th className="px-[12px] py-[9px]">Sumber Data</th>
                      <th className="py-[9px]">Status</th>
                      <th className="py-[9px]">Terakhir Sync</th>
                      <th className="py-[9px]">Next Sync</th>
                      <th className="py-[9px]">Delay</th>
                      <th className="py-[9px]">Freq</th>
                      <th className="py-[9px] text-center">Aksi</th>
                    </tr>
                  </thead>
<<<<<<< HEAD

                  <tbody>
                    {[
                      {
                        name: "PDDikti",
                        desc: "Data Nasional",
                        status: "Berhasil",
                        last: "14 Mei 2025\n09:25",
                        next: "14 Mei 2025\n10:00",
                        delay: "00:06:12",
                        freq: "15m",
                        color: "green",
                        icon: <BsBuilding className="h-3.5 w-3.5" />,
                      },
                      {
                        name: "Data Akademik",
                        desc: "SIAKAD",
                        status: "Berhasil",
                        last: "14 Mei 2025\n09:20",
                        next: "14 Mei 2025\n10:00",
                        delay: "00:03:45",
                        freq: "10m",
                        color: "green",
                        icon: <BsBook className="h-3.5 w-3.5" />,
                      },
                      {
                        name: "Superset",
                        desc: "Visualisasi",
                        status: "Gagal",
                        last: "14 Mei 2025\n08:50",
                        next: "14 Mei 2025\n09:50",
                        delay: "01:10:22",
                        freq: "1j",
                        color: "red",
                        icon: <TbDeviceAnalytics className="h-3.5 w-3.5" />,
                      },
                      {
                        name: "External API",
                        desc: "Kemenristek",
                        status: "Gagal",
                        last: "14 Mei 2025\n07:30",
                        next: "14 Mei 2025\n09:30",
                        delay: "02:00:45",
                        freq: "2j",
                        color: "red",
                        icon: <BsCloud className="h-3.5 w-3.5" />,
                      },
                    ].map((item) => (
                      <tr
                        key={item.name}
                        className="border-b border-[#F1F5F9] text-[10px] text-[#334155]"
                      >
=======
                  <tbody>
                    {[
                      { name: "PDDikti", desc: "Data Nasional", status: "Berhasil", last: "14 Mei 2025\n09:25", next: "14 Mei 2025\n10:00", delay: "00:06:12", freq: "15m", color: "green", icon: <BsBuilding className="h-3.5 w-3.5" /> },
                      { name: "Data Akademik", desc: "SIAKAD", status: "Berhasil", last: "14 Mei 2025\n09:20", next: "14 Mei 2025\n10:00", delay: "00:03:45", freq: "10m", color: "green", icon: <BsBook className="h-3.5 w-3.5" /> },
                      { name: "Superset", desc: "Visualisasi", status: "Gagal", last: "14 Mei 2025\n08:50", next: "14 Mei 2025\n09:50", delay: "01:10:22", freq: "1j", color: "red", icon: <TbDeviceAnalytics className="h-3.5 w-3.5" /> },
                      { name: "External API", desc: "Kemenristek", status: "Gagal", last: "14 Mei 2025\n07:30", next: "14 Mei 2025\n09:30", delay: "02:00:45", freq: "2j", color: "red", icon: <BsCloud className="h-3.5 w-3.5" /> },
                    ].map((item) => (
                      <tr key={item.name} className="border-b border-[#F1F5F9] text-[10px] text-[#334155]">
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                        <td className="px-[12px] py-[8px]">
                          <div className="flex items-center gap-[8px]">
                            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-[#EAF2FF] text-[#155EEF]">
                              {item.icon}
                            </div>
<<<<<<< HEAD

                            <div>
                              <div className="text-[11px] font-semibold leading-none text-[#334155]">
                                {item.name}
                              </div>
                              <div className="mt-[4px] text-[9px] text-[#94A3B8]">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={`rounded-full px-[8px] py-[3px] text-[9px] font-semibold ${item.color === "green"
                                ? "bg-[#DCFCE7] text-[#16A34A]"
                                : "bg-[#FFE7E7] text-[#EF4444]"
                              }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="whitespace-pre-line text-[#475569]">
                          {item.last}
                        </td>
                        <td className="whitespace-pre-line text-[#475569]">
                          {item.next}
                        </td>

                        <td
                          className={`font-semibold ${item.color === "green"
                              ? "text-[#00C853]"
                              : "text-[#EF4444]"
                            }`}
                        >
                          {item.delay}
                        </td>

                        <td>{item.freq}</td>

=======
                            <div>
                              <div className="text-[11px] font-semibold leading-none text-[#334155]">{item.name}</div>
                              <div className="mt-[4px] text-[9px] text-[#94A3B8]">{item.desc}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`rounded-full px-[8px] py-[3px] text-[9px] font-semibold ${item.color === "green" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FFE7E7] text-[#EF4444]"}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-pre-line text-[#475569]">{item.last}</td>
                        <td className="whitespace-pre-line text-[#475569]">{item.next}</td>
                        <td className={`font-semibold ${item.color === "green" ? "text-[#00C853]" : "text-[#EF4444]"}`}>{item.delay}</td>
                        <td>{item.freq}</td>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                        <td className="text-center">
                          <button className="text-[#94A3B8] transition hover:text-[#155EEF]">
                            <FiRefreshCw className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-[12px] py-[10px] text-[10px] text-[#94A3B8]">
                  <span>1 - 4 dari 12 sumber data</span>
<<<<<<< HEAD

                  <div className="flex items-center gap-[6px]">
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] border border-[#D0D5DD] text-[#94A3B8]">
                      ‹
                    </button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] bg-[#155EEF] font-semibold text-white">
                      1
                    </button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center text-[#64748B]">
                      2
                    </button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] border border-[#D0D5DD] text-[#94A3B8]">
                      ›
                    </button>
=======
                  <div className="flex items-center gap-[6px]">
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] border border-[#D0D5DD] text-[#94A3B8]">‹</button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] bg-[#155EEF] font-semibold text-white">1</button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center text-[#64748B]">2</button>
                    <button className="flex h-[24px] w-[24px] items-center justify-center rounded-[5px] border border-[#D0D5DD] text-[#94A3B8]">›</button>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                  </div>
                </div>
              </div>

              {/* KANAN: Log Aktivitas */}
              <div className="overflow-hidden rounded-[10px] border border-[#E5EAF3] bg-white">
                <div className="flex items-center justify-between border-b border-[#E5EAF3] px-[16px] py-[14px]">
<<<<<<< HEAD
                  <h2 className="text-[14px] font-semibold text-[#111827]">
                    Log Aktivitas
                  </h2>

                  <button className="flex h-[30px] items-center gap-[6px] rounded-[6px] border border-[#D0D5DD] bg-white px-[10px] text-[10px] font-medium text-[#64748B]">
                    Semua
                    <FiChevronDown className="h-3 w-3" />
=======
                  <h2 className="text-[14px] font-semibold text-[#111827]">Log Aktivitas</h2>
                  <button className="flex h-[30px] items-center gap-[6px] rounded-[6px] border border-[#D0D5DD] bg-white px-[10px] text-[10px] font-medium text-[#64748B]">
                    Semua <FiChevronDown className="h-3 w-3" />
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                  </button>
                </div>

                <div className="space-y-[2px] px-[16px] py-[16px]">
                  {[
<<<<<<< HEAD
                    {
                      title: "Sinkronisasi PDDikti berhasil",
                      time: "14 Mei 2025, 09:25:12",
                      status: "Berhasil",
                      color: "green",
                    },
                    {
                      title: "Data Akademik berhasil diperbarui",
                      time: "14 Mei 2025, 09:20:45",
                      status: "Berhasil",
                      color: "blue",
                    },
                    {
                      title: "Koneksi Superset timeout",
                      time: "14 Mei 2025, 08:50:22",
                      status: "Peringatan",
                      color: "yellow",
                    },
                    {
                      title: "Retry sinkronisasi Superset",
                      time: "14 Mei 2025, 08:58:11",
                      status: "Gagal",
                      color: "red",
                    },
                  ].map((log) => (
                    <div key={log.title} className="flex items-start gap-[12px]">
                      <div className="flex flex-col items-center">
                        <span
                          className={`mt-[4px] h-[8px] w-[8px] rounded-full ${log.color === "green"
                              ? "bg-[#10B981]"
                              : log.color === "blue"
                                ? "bg-[#3B82F6]"
                                : log.color === "yellow"
                                  ? "bg-[#F59E0B]"
                                  : "bg-[#F43F5E]"
                            }`}
                        />
                        <div className="mt-[2px] h-[28px] w-[1px] bg-[#E5EAF3]" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-[8px]">
                          <div className="text-[11px] font-medium leading-[16px] text-[#111827]">
                            {log.title}
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-[8px] py-[3px] text-[8px] font-semibold ${log.color === "red"
                                ? "bg-[#FFE7E7] text-[#EF4444]"
                                : log.color === "yellow"
                                  ? "bg-[#FFF4D8] text-[#F59E0B]"
                                  : "bg-[#DCFCE7] text-[#16A34A]"
                              }`}
                          >
                            {log.status}
                          </span>
                        </div>

                        <div className="mt-[5px] text-[9px] text-[#94A3B8]">
                          {log.time}
                        </div>
=======
                    { title: "Sinkronisasi PDDikti berhasil", time: "14 Mei 2025, 09:25:12", status: "Berhasil", color: "green" },
                    { title: "Data Akademik berhasil diperbarui", time: "14 Mei 2025, 09:20:45", status: "Berhasil", color: "blue" },
                    { title: "Koneksi Superset timeout", time: "14 Mei 2025, 08:50:22", status: "Peringatan", color: "yellow" },
                    { title: "Retry sinkronisasi Superset", time: "14 Mei 2025, 08:58:11", status: "Gagal", color: "red" },
                  ].map((log) => (
                    <div key={log.title} className="flex items-start gap-[12px]">
                      <div className="flex flex-col items-center">
                        <span className={`mt-[4px] h-[8px] w-[8px] rounded-full ${log.color === "green" ? "bg-[#10B981]" : log.color === "blue" ? "bg-[#3B82F6]" : log.color === "yellow" ? "bg-[#F59E0B]" : "bg-[#F43F5E]"}`} />
                        <div className="mt-[2px] h-[28px] w-[1px] bg-[#E5EAF3]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-[8px]">
                          <div className="text-[11px] font-medium leading-[16px] text-[#111827]">{log.title}</div>
                          <span className={`shrink-0 rounded-full px-[8px] py-[3px] text-[8px] font-semibold ${log.color === "red" ? "bg-[#FFE7E7] text-[#EF4444]" : log.color === "yellow" ? "bg-[#FFF4D8] text-[#F59E0B]" : "bg-[#DCFCE7] text-[#16A34A]"}`}>
                            {log.status}
                          </span>
                        </div>
                        <div className="mt-[5px] text-[9px] text-[#94A3B8]">{log.time}</div>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#D0D5DD] bg-white p-[14px]">
                  <button className="flex h-[34px] w-full items-center justify-center gap-[8px] rounded-[7px] border border-[#D0D5DD] bg-white text-[11px] font-semibold text-[#155EEF] transition hover:bg-[#EEF4FF]">
<<<<<<< HEAD
                    Lihat semua aktivitas
                    <span>→</span>
=======
                    Lihat semua aktivitas <span>→</span>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                  </button>
                </div>
              </div>
            </div>

            {/* BARIS BAWAH FULL WIDTH */}
            <div className="mt-[14px] grid grid-cols-[1fr_1fr] gap-[14px]">
              {/* Jadwal Sinkronisasi */}
              <div className="rounded-[10px] border border-[#E5EAF3] bg-white p-[16px]">
                <div className="mb-[18px] flex items-center justify-between">
                  <div className="flex items-start gap-[10px]">
                    <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[7px] bg-[#EAF2FF] text-[#155EEF]">
                      <FiCalendar className="h-4 w-4" />
                    </div>
<<<<<<< HEAD

                    <div className="flex flex-col justify-start gap-1 pt-[1px]">
                      <h3 className="m-0 text-[14px] font-semibold leading-[14px] text-[#111827]">
                        Jadwal Sinkronisasi
                      </h3>
                      <p className="m-0 text-[10px] leading-[12px] text-[#64748B]">
                        Atur jadwal sinkronisasi otomatis.
                      </p>
                    </div>
                  </div>

                  <button className="h-[30px] rounded-[7px] border border-[#D0D5DD] bg-white px-[12px] text-[10px] font-medium text-[#475569]">
                    Kelola Jadwal
                  </button>
=======
                    <div className="flex flex-col justify-start gap-1 pt-[1px]">
                      <h3 className="m-0 text-[14px] font-semibold leading-[14px] text-[#111827]">Jadwal Sinkronisasi</h3>
                      <p className="m-0 text-[10px] leading-[12px] text-[#64748B]">Atur jadwal sinkronisasi otomatis.</p>
                    </div>
                  </div>
                  <button className="h-[30px] rounded-[7px] border border-[#D0D5DD] bg-white px-[12px] text-[10px] font-medium text-[#475569]">Kelola Jadwal</button>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                </div>

                <div className="space-y-[8px]">
                  <div className="flex items-center gap-[10px] rounded-[9px] bg-[#F8FAFC] px-[12px] py-[11px]">
                    <FiClock className="h-4 w-4 text-[#475569]" />
                    <div>
<<<<<<< HEAD
                      <div className="text-[11px] font-semibold text-[#111827]">
                        Sinkronisasi Otomatis Aktif
                      </div>
                      <div className="mt-[3px] text-[10px] text-[#64748B]">
                        Sistem akan melakukan sinkronisasi sesuai jadwal.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-[9px] bg-[#F8FAFC] px-[12px] py-[11px]">
                    <div className="flex items-center gap-[10px]">
                      <FiClock className="h-4 w-4 text-[#475569]" />
                      <div>
                        <div className="text-[11px] font-semibold text-[#111827]">
                          Jam Operasional Sinkronisasi
                        </div>
                        <div className="mt-[3px] text-[10px] text-[#64748B]">
                          00:00 - 23:59 WIB setiap hari
                        </div>
                      </div>
                    </div>

=======
                      <div className="text-[11px] font-semibold text-[#111827]">Sinkronisasi Otomatis Aktif</div>
                      <div className="mt-[3px] text-[10px] text-[#64748B]">Sistem akan melakukan sinkronisasi sesuai jadwal.</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-[9px] bg-[#F8FAFC] px-[12px] py-[11px]">
                    <div className="flex items-center gap-[10px]">
                      <FiClock className="h-4 w-4 text-[#475569]" />
                      <div>
                        <div className="text-[11px] font-semibold text-[#111827]">Jam Operasional Sinkronisasi</div>
                        <div className="mt-[3px] text-[10px] text-[#64748B]">00:00 - 23:59 WIB setiap hari</div>
                      </div>
                    </div>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
                    <FiChevronRight className="h-4 w-4 text-[#94A3B8]" />
                  </div>
                </div>
              </div>

              {/* Data Freshness */}
              <div className="rounded-[10px] border border-[#E5EAF3] bg-white p-[16px]">
                <div className="flex flex-col gap-[1px]">
<<<<<<< HEAD
                  <h3 className="text-[14px] font-semibold leading-[1px] text-[#111827]">
                    Data Freshness
                  </h3>
                  <p className="m-0 text-[10px] leading-[3px] text-[#64748B]">
                    Kondisi keterbaruan data secara keseluruhan.
                  </p>
                </div>

                <div className="mt-[18px] flex items-center justify-center gap-[36px]">
                  <div className="relative flex h-[116px] w-[116px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#10B981_0deg_299deg,#F59E0B_299deg_360deg,#EF4444_360deg_360deg)]">
                    <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white text-center">
                      <div className="text-[22px] font-semibold leading-none text-[#111827]">
                        83%
                      </div>
                      <div className="mt-[5px] text-[8px] font-semibold text-[#64748B]">
                        DATA FRESH
                      </div>
                    </div>
                  </div>

                  <div className="w-[280px] space-y-[8px] text-[10px]">
                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#10B981]" />
                        Fresh (&lt; 15 menit)
                      </div>
                      <span className="font-semibold text-[#10B981]">
                        10 sumber (83%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#F59E0B]" />
                        Delay (15 - 60 menit)
                      </div>
                      <span className="font-semibold text-[#F59E0B]">
                        2 sumber (17%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#EF4444]" />
                        Stale (&gt; 60 menit)
                      </div>
                      <span className="font-semibold text-[#EF4444]">
                        0 sumber (0%)
                      </span>
                    </div>

                    <p className="pt-[8px] text-[10px] text-[#94A3B8]">
                      Total 12 sumber data
                    </p>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] hover:bg-white/30 transition-colors rounded-[10px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[8px] shadow-sm">
                <FiLock className="h-[20px] w-[20px] text-[#155EEF]" />
              </div>
              <span className="text-[14px] font-bold text-[#0B3478]">Fitur Premium - Tidak Tersedia</span>
            </div>
          </div>
        )}
        {activeTab === "Integrasi Dashboard" && (
          <div className="relative cursor-pointer" onClick={() => setShowPremiumPopup(true)}>
            <div className="blur-[4px] opacity-60 pointer-events-none select-none">
              <div className="rounded-[10px] bg-white">
            <div className="mb-[18px] flex items-start justify-between">
              <div>
                <h2 className="m-0 text-[18px] font-semibold text-[#111827]">
                  Integrasi Dashboard
                </h2>
                <p className="m-0 mt-[6px] text-[11px] text-[#64748B]">
                  Kelola koneksi dan integrasi dengan sistem eksternal.
                </p>
              </div>

              <button className="h-[34px] rounded-[7px] bg-[#155EEF] px-[18px] text-[11px] font-semibold text-white transition hover:bg-[#0B4FDA]">
                + Tambah Integrasi
              </button>
            </div>

            <div className="grid grid-cols-4 gap-[14px]">
              {[
                {
                  name: "Superset Dashboard",
                  desc: "Data Visualisasi",
                  status: "Terhubung",
                  last: "Terakhir sync: 14 Mei 2025, 09:10",
                  color: "green",
                  icon: <MdDashboard className="h-5 w-5" />,
                  iconBg: "bg-[#F3E8FF] text-[#A855F7]",
                  button: "Kelola",
                },
                {
                  name: "API Akademik",
                  desc: "SIAKAD API Service",
                  status: "Terhubung",
                  last: "Terakhir sync: 14 Mei 2025, 09:05",
                  color: "green",
                  icon: <MdOutlineApi className="h-5 w-5" />,
                  iconBg: "bg-[#EAF2FF] text-[#155EEF]",
                  button: "Kelola",
                },
                {
                  name: "SSO Kampus",
                  desc: "Single Sign-On",
                  status: "Terhubung",
                  last: "Terakhir sync: 14 Mei 2025, 09:12",
                  color: "green",
                  icon: <MdOutlineVpnKey className="h-5 w-5" />,
                  iconBg: "bg-[#EEE7FF] text-[#7C3AED]",
                  button: "Kelola",
                },
                {
                  name: "PDDikti",
                  desc: "Data Nasional",
                  status: "Peringatan",
                  last: "Terakhir sync: 14 Mei 2025, 06:30",
                  color: "yellow",
                  icon: <ImLibrary className="h-5 w-5" />,
                  iconBg: "bg-[#DCFCE7] text-[#16A34A]",
                  button: "Kelola",
                },
                {
                  name: "Beasiswa",
                  desc: "Sistem Beasiswa",
                  status: "Terputus",
                  last: "Terakhir sync: -",
                  color: "red",
                  icon: <RiGraduationCapLine className="h-5 w-5" />,
                  iconBg: "bg-[#FFE7E7] text-[#EF4444]",
                  button: "Hubungkan",
                },
                {
                  name: "Email Service",
                  desc: "SMTP Service",
                  status: "Terhubung",
                  last: "Terakhir sync: 14 Mei 2025, 09:00",
                  color: "green",
                  icon: <MdOutlineEmail className="h-5 w-5" />,
                  iconBg: "bg-[#EAF2FF] text-[#155EEF]",
                  button: "Kelola",
                },
                {
                  name: "Backup Service",
                  desc: "Backup Otomatis",
                  status: "Aktif",
                  last: "Terakhir backup: 14 Mei 2025, 02:00",
                  color: "green",
                  icon: <BsCloudArrowUp className="h-5 w-5" />,
                  iconBg: "bg-[#EEE7FF] text-[#7C3AED]",
                  button: "Kelola",
                },
                {
                  name: "Storage Cloud",
                  desc: "Cloud Storage",
                  status: "Terhubung",
                  last: "Terakhir sync: 14 Mei 2025, 09:08",
                  color: "green",
                  icon: <BsCloud className="h-5 w-5" />,
                  iconBg: "bg-[#EAF2FF] text-[#155EEF]",
                  button: "Kelola",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="rounded-[8px] border border-[#E5EAF3] bg-white p-[14px] shadow-[0_4px_10px_rgba(15,23,42,0.03)] transition hover:border-[#155EEF] hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                  <div className="mb-[12px] flex items-start gap-[10px]">
                    <div
                      className={`flex h-[34px] w-[34px] items-center justify-center rounded-[6px] ${item.iconBg}`}>
                      {item.icon}
                    </div>

                    <div>
                      <h3 className="m-0 text-[12px] font-semibold leading-[14px] text-[#111827]">
                        {item.name}
                      </h3>
                      <p className="m-0 mt-[2px] text-[10px] leading-[12px] text-[#64748B]">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-block rounded-[4px] px-[8px] py-[3px] text-[9px] font-semibold ${item.color === "green"
                        ? "bg-[#DCFCE7] text-[#16A34A]"
                        : item.color === "yellow"
                          ? "bg-[#FFF4D8] text-[#F59E0B]"
                          : "bg-[#FFE7E7] text-[#EF4444]"
                      }`}>
                    {item.status}
                  </span>

                  <p className="mt-[8px] text-[9px] text-[#94A3B8]">{item.last}</p>

                  <div className="mt-[12px] flex items-center justify-between">
                    <button
                      className={`h-[28px] rounded-[5px] px-[12px] text-[10px] font-medium ${item.button === "Hubungkan"
                          ? "bg-[#155EEF] text-white"
                          : "border border-[#D0D5DD] bg-white text-[#155EEF]"
                        }`}>
                      {item.button}
                    </button>

                    <button className="text-[18px] leading-none text-[#64748B]">
                      ⋮
                    </button>
                  </div>
                </div>
              ))}
            </div>
              </div>
            </div>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px] hover:bg-white/30 transition-colors rounded-[10px]">
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#EAF1FF] mb-[8px] shadow-sm">
                <FiLock className="h-[20px] w-[20px] text-[#155EEF]" />
              </div>
              <span className="text-[14px] font-bold text-[#0B3478]">Fitur Premium - Tidak Tersedia</span>
            </div>
          </div>
        )}
      </section>

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
            <h3 style={{ margin: "0 0 16px", color: "#0F172A", fontSize: 22, fontWeight: 600 }}>Fitur Premium</h3>
            <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6, padding: "0 12px" }}>
              Insight indikator sistem ini adalah fitur eksklusif. Anda harus berlangganan paket Premium untuk membuka akses ke informasi ini.
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

=======
                  <h3 className="text-[14px] font-semibold text-[#111827]">Data Freshness</h3>
                  <p className="m-0 text-[10px] text-[#64748B]">Kondisi keterbaruan data secara keseluruhan.</p>
                </div>

                <div className="mt-[18px] flex items-center justify-center gap-[36px]">
                  <div className="relative flex h-[116px] w-[116px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#10B981_0deg_299deg,#F59E0B_299deg_360deg,#EF4444_360deg_360deg)]">
                    <div className="flex h-[76px] w-[76px] flex-col items-center justify-center rounded-full bg-white text-center">
                      <div className="text-[22px] font-semibold leading-none text-[#111827]">83%</div>
                      <div className="mt-[5px] text-[8px] font-semibold text-[#64748B]">DATA FRESH</div>
                    </div>
                  </div>

                  <div className="w-[280px] space-y-[8px] text-[10px]">
                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#10B981]" /> Fresh (&lt; 15 menit)
                      </div>
                      <span className="font-semibold text-[#10B981]">10 sumber (83%)</span>
                    </div>

                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#F59E0B]" /> Delay (15 - 60 menit)
                      </div>
                      <span className="font-semibold text-[#F59E0B]">2 sumber (17%)</span>
                    </div>

                    <div className="flex items-center justify-between gap-[10px]">
                      <div className="flex items-center gap-[8px] text-[#334155]">
                        <span className="h-[7px] w-[7px] rounded-full bg-[#EF4444]" /> Stale (&gt; 60 menit)
                      </div>
                      <span className="font-semibold text-[#EF4444]">0 sumber (0%)</span>
                    </div>

                    <p className="pt-[8px] text-[10px] text-[#94A3B8]">Total 12 sumber data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INTEGRASI DASHBOARD */}
        {activeTab === "Integrasi Dashboard" && (
          <div className="rounded-[10px] bg-white">
            <div className="mb-[18px] flex items-start justify-between">
              <div>
                <h2 className="m-0 text-[18px] font-semibold text-[#111827]">Integrasi Dashboard</h2>
                <p className="m-0 mt-[6px] text-[11px] text-[#64748B]">Kelola koneksi dan integrasi dengan sistem eksternal.</p>
              </div>
              <button className="h-[34px] rounded-[7px] bg-[#155EEF] px-[18px] text-[11px] font-semibold text-white transition hover:bg-[#0B4FDA]">
                + Tambah Integrasi
              </button>
            </div>

            <div className="grid grid-cols-4 gap-[14px]">
              {[
                { name: "Superset Dashboard", desc: "Data Visualisasi", status: "Terhubung", last: "Terakhir sync: 14 Mei 2025, 09:10", color: "green", icon: <MdDashboard className="h-5 w-5" />, iconBg: "bg-[#F3E8FF] text-[#A855F7]", button: "Kelola" },
                { name: "API Akademik", desc: "SIAKAD API Service", status: "Terhubung", last: "Terakhir sync: 14 Mei 2025, 09:05", color: "green", icon: <MdOutlineApi className="h-5 w-5" />, iconBg: "bg-[#EAF2FF] text-[#155EEF]", button: "Kelola" },
                { name: "SSO Kampus", desc: "Single Sign-On", status: "Terhubung", last: "Terakhir sync: 14 Mei 2025, 09:12", color: "green", icon: <MdOutlineVpnKey className="h-5 w-5" />, iconBg: "bg-[#EEE7FF] text-[#7C3AED]", button: "Kelola" },
                { name: "PDDikti", desc: "Data Nasional", status: "Peringatan", last: "Terakhir sync: 14 Mei 2025, 06:30", color: "yellow", icon: <ImLibrary className="h-5 w-5" />, iconBg: "bg-[#DCFCE7] text-[#16A34A]", button: "Kelola" },
                { name: "Beasiswa", desc: "Sistem Beasiswa", status: "Terputus", last: "Terakhir sync: -", color: "red", icon: <RiGraduationCapLine className="h-5 w-5" />, iconBg: "bg-[#FFE7E7] text-[#EF4444]", button: "Hubungkan" },
                { name: "Email Service", desc: "SMTP Service", status: "Terhubung", last: "Terakhir sync: 14 Mei 2025, 09:00", color: "green", icon: <MdOutlineEmail className="h-5 w-5" />, iconBg: "bg-[#EAF2FF] text-[#155EEF]", button: "Kelola" },
                { name: "Backup Service", desc: "Backup Otomatis", status: "Aktif", last: "Terakhir backup: 14 Mei 2025, 02:00", color: "green", icon: <BsCloudArrowUp className="h-5 w-5" />, iconBg: "bg-[#EEE7FF] text-[#7C3AED]", button: "Kelola" },
                { name: "Storage Cloud", desc: "Cloud Storage", status: "Terhubung", last: "Terakhir sync: 14 Mei 2025, 09:08", color: "green", icon: <BsCloud className="h-5 w-5" />, iconBg: "bg-[#EAF2FF] text-[#155EEF]", button: "Kelola" },
              ].map((item) => (
                <div key={item.name} className="rounded-[8px] border border-[#E5EAF3] bg-white p-[14px] shadow-[0_4px_10px_rgba(15,23,42,0.03)] transition hover:border-[#155EEF] hover:shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
                  <div className="mb-[12px] flex items-start gap-[10px]">
                    <div className={`flex h-[34px] w-[34px] items-center justify-center rounded-[6px] ${item.iconBg}`}>{item.icon}</div>
                    <div>
                      <h3 className="m-0 text-[12px] font-semibold leading-[14px] text-[#111827]">{item.name}</h3>
                      <p className="m-0 mt-[2px] text-[10px] leading-[12px] text-[#64748B]">{item.desc}</p>
                    </div>
                  </div>

                  <span className={`inline-block rounded-[4px] px-[8px] py-[3px] text-[9px] font-semibold ${item.color === "green" ? "bg-[#DCFCE7] text-[#16A34A]" : item.color === "yellow" ? "bg-[#FFF4D8] text-[#F59E0B]" : "bg-[#FFE7E7] text-[#EF4444]"}`}>
                    {item.status}
                  </span>
                  <p className="mt-[8px] text-[9px] text-[#94A3B8]">{item.last}</p>

                  <div className="mt-[12px] flex items-center justify-between">
                    <button className={`h-[28px] rounded-[5px] px-[12px] text-[10px] font-medium ${item.button === "Hubungkan" ? "bg-[#155EEF] text-white" : "border border-[#D0D5DD] bg-white text-[#155EEF]"}`}>
                      {item.button}
                    </button>
                    <button className="text-[18px] leading-none text-[#64748B]">⋮</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
>>>>>>> 2d3ebbd075766e3688be30287a94488496e4cbaf
    </Layout>
  );
};

export default DashboardSistem;
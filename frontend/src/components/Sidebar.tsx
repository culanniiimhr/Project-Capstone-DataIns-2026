import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";

type SidebarProps = {
  active:
    | "Dashboard Utama"
    | "Pimpinan"
    | "Akademik"
    | "Monitoring IKU"
    | "Manajemen Sistem";
};

const Sidebar = ({ active }: SidebarProps) => {
  const navigate = useNavigate();

  const menu = [
    { icon: <FiHome size={18} />, label: "Dashboard Utama", path: "/dashboard" },
    { icon: <FaRegUser size={18} />, label: "Pimpinan", path: "/dashboard/pimpinan" },
    { icon: <LuGraduationCap size={18} />, label: "Akademik", path: "/dashboard/akademik" },
    { icon: <TbDeviceDesktopAnalytics size={18} />, label: "Monitoring IKU", path: "/dashboard/iku" },
    { icon: <IoSettingsOutline size={18} />, label: "Manajemen Sistem", path: "/dashboard/system" },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[200px] bg-white px-[16px] py-[28px] shadow-[1px_0_0_#EEF2F7]">
      <div className="mb-[58px] flex items-center gap-3">
        <img src={Logo} alt="logo" className="h-[42px] w-[42px]" />

        <div>
          <h2 className="m-0 text-[18px] font-semibold leading-none text-black">
            Satu Data
          </h2>
          <div className="mt-1 text-[8.5px] font-medium tracking-[0.6px] text-black">
            PERGURUAN TINGGI
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-[12px]">
        {menu.map((item) => {
          const isActive = active === item.label;

          return (
            <button
              type="button"
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`group flex h-[42px] w-full items-center gap-[12px] rounded-[7px] px-[12px] text-left text-[13px] font-medium transition-all duration-200 ease-out ${
                isActive
                  ? "bg-[#155EEF] text-white shadow-[0_6px_14px_rgba(21,94,239,0.18)]"
                  : "bg-white text-[#111827] hover:translate-x-[3px] hover:bg-[#EEF4FF] hover:text-[#155EEF]"
              }`}
            >
              <div
                className={`flex h-[20px] w-[20px] items-center justify-center transition-transform duration-200 ${
                  isActive ? "text-white" : "group-hover:scale-110"
                }`}
              >
                {item.icon}
              </div>

              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
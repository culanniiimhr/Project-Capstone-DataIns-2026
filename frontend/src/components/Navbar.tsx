import { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  title: string;
  roleName?: string;
  rolePosition?: string;
  showFilters?: boolean;
};

const Navbar = ({
  title,
  roleName: propRoleName = "Pimpinan",
  rolePosition: propRolePosition = "Rektor",
  showFilters = true,
}: NavbarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState(propRoleName);
  const [profilePosition, setProfilePosition] = useState(propRolePosition);
  const [profileEmail, setProfileEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccount = localStorage.getItem("dummyAccount");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedAccount && isAuthenticated === "true") {
      const parsedAccount = JSON.parse(storedAccount);
      if (parsedAccount.name) setProfileName(parsedAccount.name);
      if (parsedAccount.position) setProfilePosition(parsedAccount.position);
      if (parsedAccount.email) setProfileEmail(parsedAccount.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <header className="flex h-[96px] items-start justify-between px-[17px] pt-[22px]">
      <h1 className="text-[24px] font-semibold leading-none text-[#0B3478]">
        {title}
      </h1>

      <div className="flex items-start gap-[10px]">
        {showFilters && (
          <>
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
          </>
        )}

        <div className="relative flex items-center gap-[15px] pt-[27px]">
          <FaRegBell className="h-5 w-5 text-[#111827]" />
          
          <div 
            className="flex items-center gap-[15px] cursor-pointer" 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FaRegCircleUser className="h-6 w-6 text-[#155EEF]" />

            <div className="w-[74px] text-[12px] font-medium leading-[14px] text-[#111827]">
              <div className="truncate">{profileName}</div>
              <div className="font-semibold text-[#0B3478] truncate">{profilePosition}</div>
            </div>
          </div>

          {/* Dropdown Profil */}
          {isProfileOpen && (
            <div className="absolute right-0 top-[65px] w-[220px] bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="text-[14px] font-semibold text-gray-800 m-0">{profileName}</p>
                <p className="text-[12px] text-gray-500 mt-1 mb-0">{profileEmail || "No Email"}</p>
                <p className="text-[12px] text-blue-600 font-medium mt-1 mb-0">{profilePosition}</p>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <button 
                  onClick={() => navigate("/profil")}
                  className="w-full text-left px-3 py-2 text-[14px] text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors font-medium cursor-pointer border-none bg-transparent"
                >
                  Lihat Profil
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-[14px] text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium cursor-pointer border-none bg-transparent"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

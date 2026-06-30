import { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaRegCircleUser, FaChevronDown, FaCheck } from "react-icons/fa6";
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
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedTahun, setSelectedTahun] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [isTahunOpen, setIsTahunOpen] = useState(false);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  
  const tahunOptions = ["2023/2024", "2024/2025", "2025/2026"];
  const semesterOptions = ["Ganjil", "Genap"];

  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = () => {
      const storedAccount = localStorage.getItem("dummyAccount");
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      if (storedAccount && isAuthenticated === "true") {
        const parsedAccount = JSON.parse(storedAccount);
        if (parsedAccount.name) setProfileName(parsedAccount.name);
        if (parsedAccount.position) setProfilePosition(parsedAccount.position);
        if (parsedAccount.email) setProfileEmail(parsedAccount.email);
        setProfileImage(parsedAccount.image || null);
      }
    };

    loadProfile();
    
    window.addEventListener("profileImageUpdated", loadProfile);
    return () => window.removeEventListener("profileImageUpdated", loadProfile);
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
            <div className="w-[255px] relative">
              <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
                Tahun Akademik
              </div>
              <div 
                onClick={() => { setIsTahunOpen(!isTahunOpen); setIsSemesterOpen(false); setIsProfileOpen(false); }}
                className={`flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium cursor-pointer border transition-all duration-200 ${isTahunOpen ? 'border-blue-500 ring-4 ring-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'} ${selectedTahun ? 'text-[#111827]' : 'text-[#C5CBD5]'}`}
              >
                <span>{selectedTahun || "Pilih tahun akademik"}</span>
                <FaChevronDown className={`text-[12px] text-gray-400 transition-transform duration-200 ${isTahunOpen ? 'rotate-180 text-blue-500' : ''}`} />
              </div>
              
              {isTahunOpen && (
                <div className="absolute top-[75px] left-0 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <ul className="py-1 m-0 list-none px-0">
                    {tahunOptions.map((tahun) => (
                      <li 
                        key={tahun}
                        onClick={() => { setSelectedTahun(tahun); setIsTahunOpen(false); }}
                        className={`px-4 py-2.5 text-[14px] cursor-pointer flex items-center justify-between transition-colors ${selectedTahun === tahun ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        {tahun}
                        {selectedTahun === tahun && <FaCheck className="text-blue-600 text-[14px]" />}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="w-[207px] relative">
              <div className="mb-[6px] text-[16px] font-medium leading-[18px] text-[#111827]">
                Semester
              </div>
              <div 
                onClick={() => { setIsSemesterOpen(!isSemesterOpen); setIsTahunOpen(false); setIsProfileOpen(false); }}
                className={`flex h-[43px] items-center justify-between rounded-[8px] bg-white px-[14px] text-[14px] font-medium cursor-pointer border transition-all duration-200 ${isSemesterOpen ? 'border-blue-500 ring-4 ring-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'} ${selectedSemester ? 'text-[#111827]' : 'text-[#C5CBD5]'}`}
              >
                <span>{selectedSemester || "Pilih semester"}</span>
                <FaChevronDown className={`text-[12px] text-gray-400 transition-transform duration-200 ${isSemesterOpen ? 'rotate-180 text-blue-500' : ''}`} />
              </div>

              {isSemesterOpen && (
                <div className="absolute top-[75px] left-0 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <ul className="py-1 m-0 list-none px-0">
                    {semesterOptions.map((semester) => (
                      <li 
                        key={semester}
                        onClick={() => { setSelectedSemester(semester); setIsSemesterOpen(false); }}
                        className={`px-4 py-2.5 text-[14px] cursor-pointer flex items-center justify-between transition-colors ${selectedSemester === semester ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                      >
                        {semester}
                        {selectedSemester === semester && <FaCheck className="text-blue-600 text-[14px]" />}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        <div className="relative flex items-center gap-2 pt-[18px]">
          <div className="p-2.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors relative">
            <FaRegBell className="h-5 w-5 text-[#4B5563]" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
          
          <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all duration-200 border ${isProfileOpen ? 'bg-blue-50 border-blue-100' : 'border-transparent hover:bg-gray-50 hover:border-gray-100'}`}
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsTahunOpen(false); setIsSemesterOpen(false); }}
          >
            {profileImage ? (
              <div className="relative">
                <img src={profileImage} alt="Profile" className="h-[40px] w-[40px] rounded-full object-cover shadow-sm ring-2 ring-white" />
                <div className="absolute bottom-0 right-0 h-[10px] w-[10px] bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
            ) : (
              <div className="relative h-[40px] w-[40px] rounded-full bg-blue-100 flex items-center justify-center shadow-sm ring-2 ring-white">
                <FaRegCircleUser className="h-5 w-5 text-[#155EEF]" />
                <div className="absolute bottom-0 right-0 h-[10px] w-[10px] bg-green-500 rounded-full ring-2 ring-white"></div>
              </div>
            )}

            <div className="hidden sm:block text-[13px] font-medium leading-[16px] text-[#111827] w-auto max-w-[180px] min-w-[80px]">
              <div className="truncate font-semibold text-gray-900">{profileName}</div>
              <div className="font-medium text-[#155EEF] truncate text-[11.5px] mt-0.5">{profilePosition}</div>
            </div>

            <FaChevronDown className={`text-[12px] text-gray-400 ml-1 transition-transform duration-200 hidden sm:block ${isProfileOpen ? 'rotate-180 text-[#155EEF]' : ''}`} />
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

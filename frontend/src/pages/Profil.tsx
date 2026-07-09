import { FunctionComponent, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { FaCamera, FaEdit, FaCheck, FaPen, FaTrash, FaUpload } from "react-icons/fa";
import { FiMail, FiBriefcase, FiMapPin, FiPhone } from "react-icons/fi";

const Profil: FunctionComponent = () => {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("Pimpinan");
  const [profileEmail, setProfileEmail] = useState("rektor@universitas.ac.id");
  const [profilePosition, setProfilePosition] = useState("Pimpinan");
  const [profileUnit, setProfileUnit] = useState("Rektorat");
  const [profilePhone, setProfilePhone] = useState("0812-3456-7890");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem("dummyAccount");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (storedAccount && isAuthenticated === "true") {
      const parsedAccount = JSON.parse(storedAccount);
      if (parsedAccount.name) setProfileName(parsedAccount.name);
      if (parsedAccount.email) setProfileEmail(parsedAccount.email);
      if (parsedAccount.position) setProfilePosition(parsedAccount.position);
      // Dummy values for unit and phone if not in local storage
      if (parsedAccount.unit) setProfileUnit(parsedAccount.unit);
      if (parsedAccount.phone) setProfilePhone(parsedAccount.phone);
      if (parsedAccount.image) setProfileImage(parsedAccount.image);
    }
  }, []);

  const handleEditName = () => {
    setTempName(profileName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    setProfileName(tempName);
    setIsEditingName(false);

    // update localStorage
    const storedAccount = localStorage.getItem("dummyAccount");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      parsedAccount.name = tempName;
      localStorage.setItem("dummyAccount", JSON.stringify(parsedAccount));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);

        // update localStorage
        const storedAccount = localStorage.getItem("dummyAccount");
        if (storedAccount) {
          const parsedAccount = JSON.parse(storedAccount);
          parsedAccount.image = base64String;
          localStorage.setItem("dummyAccount", JSON.stringify(parsedAccount));
        } else {
          localStorage.setItem("dummyAccount", JSON.stringify({ image: base64String }));
        }
        window.dispatchEvent(new Event("profileImageUpdated"));
        setIsImageMenuOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    const storedAccount = localStorage.getItem("dummyAccount");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      delete parsedAccount.image;
      localStorage.setItem("dummyAccount", JSON.stringify(parsedAccount));
    }
    window.dispatchEvent(new Event("profileImageUpdated"));
    setIsImageMenuOpen(false);
  };

  return (
    <Layout title="Profil Saya" active="Dashboard Utama" showFilters={false}>
      <div className="flex flex-col pb-8 mt-[-30px]">
        {/* Breadcrumb equivalent */}
        <div className="text-[13px] font-medium text-[#8A92A6] mb-6">
          Dashboard <span className="mx-1">{">"}</span> <span className="text-[#155EEF]">Profil Saya</span>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E4E7EC] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 max-w-[1000px] w-full relative overflow-hidden">
          {/* Subtle top gradient accent */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#155EEF] via-[#6366F1] to-[#8B5CF6]"></div>

          <div className="flex gap-[60px]">
            {/* Left Image Section */}
            <div className="w-[260px] h-[260px] bg-gradient-to-br from-[#155EEF] via-[#4F46E5] to-[#7C3AED] rounded-[24px] relative shrink-0 flex items-center justify-center shadow-lg group">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-[24px]" />
              ) : (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[24px]">
                  {/* Decorative inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  <span className="text-[110px] font-extrabold text-white opacity-95 drop-shadow-xl select-none">
                    {profileName ? profileName.charAt(0).toUpperCase() : "P"}
                  </span>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              
              {/* Edit Icon Button */}
              <button
                onClick={() => setIsImageMenuOpen(!isImageMenuOpen)}
                className="absolute bottom-5 right-5 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center text-gray-700 hover:text-[#155EEF] hover:bg-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/20 z-10"
              >
                <FaPen size={16} />
              </button>

              {/* Popup Menu */}
              {isImageMenuOpen && (
                <div className="absolute bottom-[75px] right-5 w-[160px] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-20 animate-in fade-in slide-in-from-bottom-2">
                  <button 
                    onClick={() => { setIsImageMenuOpen(false); fileInputRef.current?.click(); }}
                    className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <FaUpload size={14} className="text-gray-400" />
                    Unggah Foto
                  </button>
                  {profileImage && (
                    <button 
                      onClick={handleDeleteImage}
                      className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <FaTrash size={14} className="text-red-400" />
                      Hapus Foto
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Right Info Section */}
            <div className="flex-1 flex flex-col gap-5">
              {/* NAMA LENGKAP */}
              <div className="border-b-[1px] border-solid border-[#E4E7EC] pb-3">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-[#8A92A6] tracking-[1px] block uppercase m-0">NAMA LENGKAP</label>
                  {!isEditingName ? (
                    <button onClick={handleEditName} className="text-[#155EEF] hover:text-[#1048b8] cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5 text-[12px] font-semibold">
                      <FaEdit size={13} /> Edit
                    </button>
                  ) : (
                    <button onClick={handleSaveName} className="text-green-600 hover:text-green-700 cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5 text-[12px] font-semibold">
                      <FaCheck size={13} /> Simpan
                    </button>
                  )}
                </div>
                {!isEditingName ? (
                  <div className="text-[16px] font-bold text-[#111827]">{profileName}</div>
                ) : (
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full text-[16px] font-bold text-[#111827] border border-[#E4E7EC] rounded-md px-3 py-1.5 outline-none focus:border-[#155EEF] transition-colors"
                    autoFocus
                  />
                )}
              </div>

              {/* EMAIL */}
              <div className="border-b-[1px] border-solid border-[#E4E7EC] pb-3 transition-colors hover:border-[#155EEF]/30">
                <label className="text-[11px] font-bold text-[#8A92A6] tracking-[1px] mb-2 block uppercase">EMAIL</label>
                <div className="flex items-center gap-2.5 text-[16px] font-bold text-[#111827]">
                  <FiMail className="text-[#8A92A6]" size={18} />
                  {profileEmail}
                </div>
              </div>

              {/* ROLE */}
              <div className="border-b-[1px] border-solid border-[#E4E7EC] pb-3 transition-colors hover:border-[#155EEF]/30">
                <label className="text-[11px] font-bold text-[#8A92A6] tracking-[1px] mb-2 block uppercase">ROLE</label>
                <div className="flex items-center gap-2.5">
                  <FiBriefcase className="text-[#8A92A6]" size={18} />
                  <div className="inline-flex items-center px-4 py-1.5 bg-[#E7EFFE] text-[#155EEF] text-[13px] font-semibold rounded-full shadow-sm">
                    {profilePosition}
                  </div>
                </div>
              </div>

              {/* UNIT KERJA */}
              <div className="border-b-[1px] border-solid border-[#E4E7EC] pb-3 transition-colors hover:border-[#155EEF]/30">
                <label className="text-[11px] font-bold text-[#8A92A6] tracking-[1px] mb-2 block uppercase">UNIT KERJA</label>
                <div className="flex items-center gap-2.5 text-[16px] font-bold text-[#111827]">
                  <FiMapPin className="text-[#8A92A6]" size={18} />
                  {profileUnit}
                </div>
              </div>

              {/* NO. TELEPON */}
              <div className="border-b-[1px] border-solid border-[#E4E7EC] pb-3 transition-colors hover:border-[#155EEF]/30">
                <label className="text-[11px] font-bold text-[#8A92A6] tracking-[1px] mb-2 block uppercase">NO. TELEPON</label>
                <div className="flex items-center gap-2.5 text-[16px] font-bold text-[#111827]">
                  <FiPhone className="text-[#8A92A6]" size={18} />
                  {profilePhone}
                </div>
              </div>
            </div>
          </div>

          {/* Tentang Section */}
          <div className="mt-10 border-t-[1px] border-solid border-[#E4E7EC] pt-8">
            <div className="bg-[#F8FAFC] rounded-[16px] p-6 border border-[#F1F5F9] shadow-sm">
              <h3 className="text-[16px] font-bold text-[#111827] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#155EEF] rounded-full inline-block"></span>
                Tentang
              </h3>
              <p className="text-[14px] leading-[1.7] text-[#4B5563] max-w-[800px] m-0">
                Akun ini digunakan untuk mengakses dashboard pimpinan dan memantau kinerja perguruan tinggi
                secara keseluruhan. Melalui akses ini, pengguna dapat melihat integrasi data akademik, pemantauan
                IKU, dan laporan strategis yang diperlukan untuk pengambilan keputusan berbasis data di lingkungan
                Rektorat.
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-[#155EEF] hover:bg-[#1048b8] text-white font-semibold py-[14px] text-[15px] rounded-[8px] transition-colors cursor-pointer border-none"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profil;

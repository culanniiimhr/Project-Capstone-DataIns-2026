import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Wave1 from "../assets/Wave1.png";
import Wave2 from "../assets/Wave2.png";
import Wave3 from "../assets/Wave3.png";
import Wave4 from "../assets/Wave4.png";
import ForgotPassword from "../assets/ForgotPassword.png";
import IconGoogle from "../assets/IconGoogle.png";
import { FaChartLine } from "react-icons/fa6";
import { BsLightbulbFill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { GoLock } from "react-icons/go";
import { RiGraduationCapFill } from "react-icons/ri"
import { MdLockOutline, MdOutlineEmail, MdOutlineInfo, MdOutlineMarkEmailRead } from "react-icons/md";

const Login: FunctionComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [isResetSent, setIsResetSent] = useState(false);
  const navigate = useNavigate();

  // Initialize dummy account in local storage
  useEffect(() => {
    const dummyAccount = localStorage.getItem("dummyAccount");
    if (!dummyAccount) {
      localStorage.setItem(
        "dummyAccount",
        JSON.stringify({ 
          email: "admin@gmail.com", 
          password: "admin",
          name: "Admin Utama",
          position: "Super Admin"
        })
      );
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedAccount = localStorage.getItem("dummyAccount");
    if (storedAccount) {
      const parsedAccount = JSON.parse(storedAccount);
      if (
        email === parsedAccount.email &&
        password === parsedAccount.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      } else {
        alert("Email atau kata sandi salah!");
      }
    } else {
      alert("Akun percobaan tidak ditemukan di local storage!");
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      resetEmail,
    });

    setIsResetSent(true);

    // TODO: Integrasi API Forgot Password
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden bg-[#f7f7f7] font-['SF Pro Display']">
      {/* LEFT */}
      <div className="relative bg-[#eef3ff] px-10 pt-10 pb-0 flex flex-col overflow-hidden">
        {!isForgotPassword ? (
          <>
            {/* Background */}
            <img
              src="/assets/Vector1.svg"
              alt=""
              className="absolute bottom-0 left-0 w-full z-0"
            />

            <img
              src="/assets/Vector2.svg"
              alt=""
              className="absolute bottom-0 left-0 w-full z-0"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Logo */}
              <div className="flex items-center gap-3 mb-11">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-[36px] h-[36px]"
                />

                <div className="flex-1 flex flex-col items-start pt-[0px] px-0 pb-0">
                  <div className="self-stretch flex flex-col items-start justify-center">
                    <h2 className="m-0 text-[20px] font-semibold leading-none text-black">
                      Satu Data
                    </h2>

                    <div className="mt-1 text-[9px] tracking-[1px] font-medium text-black">
                      PERGURUAN TINGGI
                    </div>
                  </div>
                </div>
              </div>

              {/* Heading */}
              <section className="self-stretch flex flex-col items-start py-0 gap-[3px] mb-8 z-[1] shrink-0 text-left text-[30px] text-foundation-grey-dark font-['SF Pro Display']">
                <div className="self-stretch flex flex-col items-start gap-0">
                  <h1 className="m-0 w-[640px] h-[35px] relative text-[length:inherit] font-normal font-[inherit] inline-block mq450:text-[28px] mq825:text-[37px]">
                    Satu Data,
                  </h1>
                  <h2 className="m-0 w-[640px] h-[45px] relative text-[30px] font-bold font-[inherit] text-foundation-blue-normal-hover inline-block mq450:text-[28px] mq825:text-[30px]">
                    Satu Keputusan.
                  </h2>
                </div>
                <div className="w-[142px] h-3 relative border-foundation-blue-normal border-solid border-t-[2px] box-border" />
                <div className="self-stretch relative text-[13px] leading-[1.]">
                  Platform dashboard terpadu untuk monitoring kinerja
                  <br />
                  akademik dan institusi secara realtime, akurat dan
                  <br />
                  efisien
                </div>
              </section>

              <main className="flex flex-col items-start gap-[13px] w-full shrink-0">
                <section className="w-full h-[130px] flex flex-col items-start justify-center py-0 box-border gap-[7px] max-w-full z-[2] text-left text-[10px] text-foundation-blue-normal font-[Inter]">
                  <div className="self-stretch flex-1 flex items-center flex-wrap content-center gap-[13px]">
                    <div className="h-5 w-5 relative rounded-[7px] bg-[#fff]">
                      <div className="absolute top-[0px] left-[0px] rounded-[7px] bg-[#fff] w-full h-full hidden" />
                      <RiGraduationCapFill className="absolute top-[0px] left-[2px] w-[15px] h-5 z-[1]"/>
                    </div>
                    <div className="flex-1 relative font-medium inline-block min-w-[335px]">
                      Ringkasan KPI Utama
                    </div>
                  </div>
                  <div className="w-[301px] h-px relative border-foundation-grey-light-active border-solid border-t-[1px] box-border max-w-[180px]" />
                  <div className="self-stretch h-5 flex items-center flex-wrap content-center gap-[13px]">
                    <div className="h-5 w-5 relative rounded-[7px] bg-[#fff]">
                      <div className="absolute top-[0px] left-[0px] rounded-[7px] bg-[#fff] w-full h-full hidden" />
                      <FaChartLine className="absolute top-[2px] left-[2px] w-[15px] h-4 z-[1]" />
                    </div>
                    <div className="flex-1 relative font-medium inline-block min-w-[335px]">
                      Visualisasi Data Interaktif
                    </div>
                  </div>
                  <div className="w-[301px] h-px relative border-foundation-grey-light-active border-solid border-t-[1px] box-border max-w-[180px]" />
                  <div className="self-stretch h-5 flex items-center flex-wrap content-center gap-[13px]">
                    <div className="h-5 w-5 relative rounded-[7px] bg-[#fff]">
                      <div className="absolute top-[0px] left-[0px] rounded-[7px] bg-[#fff] w-full h-full hidden" />
                      <BsLightbulbFill className="absolute top-[2px] left-[2px] w-[15px] h-4 z-[1]" />
                    </div>
                    <div className="flex-1 relative font-medium inline-block min-w-[335px]">
                      Insight Otomatis berbasis AI
                    </div>
                  </div>
                  <div className="w-[301px] h-px relative border-foundation-grey-light-active border-solid border-t-[1px] box-border max-w-[180px]" />
                  <div className="self-stretch h-5 flex items-center flex-wrap content-center gap-[13px]">
                    <div className="h-5 w-5 relative rounded-[7px] bg-[#fff]">
                      <div className="absolute top-[0px] left-[0px] rounded-[7px] bg-[#fff] w-full h-full hidden" />
                      <AiFillSafetyCertificate className="absolute top-[2px] left-[2px] w-[15px] h-4 z-[1]" />
                    </div>
                    <div className="flex-1 relative font-medium inline-block min-w-[335px]">
                      Akses cepat dan Aman
                    </div>
                  </div>
                  <div className="w-[301px] h-px relative border-foundation-grey-light-active border-solid border-t-[1px] box-border max-w-[180px]" />
                </section>
                <div className="relative">
                  <img
                    className="absolute top-[-45px] left-[-50px] w-[665px] h-[346px] shrink-0"
                    alt=""
                    src={Wave1}
                  />
                  <img
                    className="absolute left-[-40px] w-[720px] h-[245px] shrink-0"
                    loading="lazy"
                    alt=""
                    src={Wave2}
                  />
                </div>
              </main>
            </div>
          </>
        ) : (
          <>
            {/* Forgot Left Content */}
            <div className="relative z-10 flex h-full flex-col">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="logo"
                  className="w-[36px] h-[36px]"
                />

                <div>
                  <h2 className="m-0 text-[20px] font-semibold leading-none text-black">
                    Satu Data
                  </h2>

                  <div className="mt-1 text-[9px] tracking-[1px] font-medium text-black">
                    PERGURUAN TINGGI
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
                <img
                  src={ForgotPassword}
                  alt="forgot password"
                  className="w-[520px] max-w-full object-contain mb-7"
                />

                <h2 className="text-[20px] font-bold text-black mb-2">
                  Lupa Kata Sandi?
                </h2>

                <p className="text-[12px] text-[#2b2b2b] mt-1">
                  Reset kata sandi akun anda dengan aman untuk mengakses sistem.
                </p>
              </div>

              <div className="relative z-0">
                <img
                  className="absolute top-[-500px] left-[-40px] w-[720px] h-[600px] shrink-0"
                  alt=""
                  src={Wave3}
                />
                <img
                  className="absolute top-[-350px] left-[-40px] w-[680px] h-[443px] shrink-0"
                  loading="lazy"
                  alt=""
                  src={Wave4}
                />
              </div>

              <p className="text-[12px] text-[#2b2b2b] mb-10 pl-20 self-start">
                ©2026 Satu Data Perguruan Tinggi. All rights reserved.
              </p>
            </div>
          </>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col justify-between bg-[#fafafa] overflow-hidden">
        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-8 py-7">
          <div className="w-full max-h-[480px] max-w-[280px] bg-white rounded-[28px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] px-8 py-7">
            {!isForgotPassword ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#dce7ff] flex items-center justify-center">
                    <GoLock className="w-4 h-4" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-1">
                  <h2 className="text-[24px] font-semibold text-[#2b2b2b] mb-3">
                    Selamat Datang
                  </h2>

                  <p className="text-[#a5a5a5] text-[15px] leading-[1.2] mt-0">
                    Login untuk mengakses Dashboard Satu Data
                    Perguruan Tinggi
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleLogin} className="flex flex-col gap-1">
                  {/* Email */}
                  <div>
                    <label className="block text-[15px] font-semibold mb-2 text-[#2b2b2b]">
                      Email
                    </label>

                    <div className="self-stretch h-[54px] rounded-[10px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center py-2.5 px-[10px] gap-3">
                      <MdOutlineEmail className="w-5 h-5" />

                      <input
                        type="email"
                        placeholder="Masukan email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="[border:none] [outline:none] font-small font-['SF_Pro'] text-lg bg-[transparent] h-[21px] relative text-foundation-grey-normal text-left inline-block min-w-[107px] p-0"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[15px] font-semibold mb-2 text-[#2b2b2b]">
                      Kata sandi
                    </label>

                    <div className="self-stretch h-[54px] rounded-[10px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center py-2.5 px-[10px] gap-3">
                      <MdLockOutline className="w-5 h-5" />

                      <input
                        type="password"
                        placeholder="Masukan kata sandi"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="[border:none] [outline:none] font-small font-['SF_Pro'] text-lg bg-[transparent] h-[21px] relative text-foundation-grey-normal text-left inline-block min-w-[107px] p-0"
                        required
                      />

                    </div>
                  </div>

                  {/* Forgot */}
                  <div className="flex justify-end mt-1">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="border-none bg-transparent p-0 text-[#1d5be3] text-[13px] font-semibold cursor-pointer"
                    >
                      Lupa Kata Sandi?
                    </button>
                  </div>

                  {/* Login */}
                  <button
                    type="submit"
                    className="h-[40px] rounded-[10px] bg-[#1d5be3] hover:bg-[#174bc0] transition text-white text-[15px] font-semibold mt-1"
                  >
                    Masuk
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="h-px w-[70px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />

                    <span className="text-[13px] font-medium text-[#444] mt-1">
                      ATAU DENGAN
                    </span>

                    <div className="h-px w-[70px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />
                  </div>

                  {/* Google */}
                  <button
                    type="button"
                    className="h-[40px] border border-[#404040] rounded-[10px] flex items-center justify-center gap-4 bg-white hover:bg-gray-100 transition mt-1"
                  >
                    <img
                      src={IconGoogle}
                      alt=""
                      className="w-5 h-5"
                    />

                    <span className="text-[13px] font-semibold text-[#2b2b2b]">
                      Login dengan Google
                    </span>
                  </button>
                </form>
              </>
            ) : !isResetSent ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#dce7ff] flex items-center justify-center">
                    <GoLock className="w-4 h-4" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="text-[22px] font-semibold text-[#2b2b2b] mb-2">
                    Atur Ulang Kata Sandi
                  </h2>

                  <p className="text-[#a5a5a5] text-[14px] leading-[1.2] mt-1">
                    Masukkan email terdaftar untuk menerima
                    <br />
                    link reset password
                  </p>
                </div>

                <form
                  onSubmit={handleForgotPassword}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label className="block text-[15px] font-semibold mb-2 text-[#2b2b2b]">
                      Email
                    </label>

                    <div className="self-stretch h-[44px] rounded-[10px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center px-[10px] gap-3">
                      <MdOutlineEmail className="w-5 h-5" />

                      <input
                        type="email"
                        placeholder="Masukan email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="[border:none] [outline:none] bg-transparent text-[14px] flex-1"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="h-[44px] rounded-[10px] bg-[#1d5be3] hover:bg-[#174bc0] transition text-white text-[14px] font-semibold"
                  >
                    Kirim
                  </button>

                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-[80px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />

                    <span className="text-[12px] font-medium text-[#444]">
                      ATAU
                    </span>

                    <div className="h-px w-[80px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="border-none bg-transparent p-0 text-[#1d5be3] text-[14px] font-semibold cursor-pointer"
                  >
                    Kembali login
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#dce7ff] flex items-center justify-center">
                    <MdOutlineMarkEmailRead className="w-4 h-4 text-[#1d5be3]" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-5">
                  <h2 className="text-[22px] font-semibold text-[#2b2b2b] mb-2 mt-1">
                    Email Terkirim
                  </h2>

                  <p className="text-[#a5a5a5] text-[14px] leading-[1.2]">
                    Kami telah mengirimkan instruksi reset
                    <br />
                    password ke email Anda
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-[15px] font-semibold mb-2 text-[#2b2b2b]">
                      Email
                    </label>

                    <div className="self-stretch h-[44px] rounded-[10px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center px-[10px] gap-3">
                      <MdOutlineEmail className="w-5 h-5" />

                      <input
                        type="email"
                        value={resetEmail}
                        readOnly
                        className="[border:none] [outline:none] bg-transparent text-[14px] flex-1"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="rounded-[8px] bg-[#dce7ff] px-3 py-2 flex items-start gap-2">
                    <MdOutlineInfo className="text-[#1d5be3] w-4 h-4" />

                    <p className="text-[11px] text-[#2b2b2b] leading-[1.3] m-0">
                      Silahkan cek inbox atau Spam jika instruksi
                      <br />
                      tidak ditemukan
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-[80px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />

                    <span className="text-[12px] font-medium text-[#444]">
                      ATAU
                    </span>

                    <div className="h-px w-[80px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />
                  </div>

                  {/* Back */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setIsResetSent(false);
                    }}
                    className="border-none bg-transparent p-0 text-[#1d5be3] text-[14px] font-semibold cursor-pointer"
                  >
                    Kembali Halaman login
                  </button>
                </div>
              </>
            )}  
          </div>
        </div>

        {!isForgotPassword && (
          <div className="border-t border-[#cfcfcf] py-0">
            <div className="h-px w-[700px] relative border-foundation-grey-normal border-solid border-t-[1px] box-border mt-1" />
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 mt-1">
                <AiFillSafetyCertificate className="w-3.5 h-3.5" />

                <span className="text-[15px] font-semibold text-[#2b2b2b] mt-0">
                  Keamanan data adalah prioritas kami.
                </span>
              </div>

              <p className="text-[13px] text-[#666] mt-0">
                ©2026 Satu Data Perguruan Tinggi. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
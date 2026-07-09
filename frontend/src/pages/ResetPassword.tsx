import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Wave3 from "../assets/Wave3.png";
import Wave4 from "../assets/Wave4.png";
import SuccessIcon from "../assets/Success.png";
import ResetPasswordIcon from "../assets/ResetPassword.png";
import { RiLockPasswordLine } from "react-icons/ri";

const ResetPassword: FunctionComponent = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Konfirmasi kata sandi tidak sama");
      return;
    }

    console.log({
      newPassword,
      confirmPassword,
    });

    setIsSuccess(true);

    // TODO: Integrasi API reset password
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden bg-[#f7f7f7] font-['SF Pro Display']">
      {/* LEFT */}
      <div className="relative bg-[#eef3ff] px-10 pt-10 pb-0 flex flex-col overflow-hidden">
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

          {/* Illustration */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
            <img
              src={ResetPasswordIcon}
              alt="reset password"
              className="w-[420px] max-w-full object-contain mb-5"
            />

            <h2 className="text-[18px] font-bold text-black mb-2 mt-1">
              Buat Kata Sandi Baru
            </h2>

            <p className="text-[11px] text-[#2b2b2b] mt-1">
              Buat kata sandi baru anda
            </p>
          </div>

          {/* Background Vector */}
          <div className="relative z-0">
            <img
                className="absolute top-[-500px] left-[-40px] w-[650px] h-[680px] shrink-0"
                alt=""
                src={Wave3}
            />
            <img
                className="absolute top-[-330px] left-[-40px] w-[680px] h-[410px] shrink-0"
                loading="lazy"
                alt=""
                src={Wave4}
            />
          </div>

          <p className="text-[11px] text-[#2b2b2b] mb-10 pl-6 self-start">
            ©2026 Satu Data Perguruan Tinggi. All rights reserved.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col justify-center items-center bg-[#fafafa] overflow-hidden">
        <div className="w-full max-w-[330px] bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] px-8 py-7">
          {/* Icon */}
          {!isSuccess && (
            <div className="flex justify-center mb-5">
                <div className="w-[36px] h-[36px] rounded-full bg-[#dce7ff] flex items-center justify-center">
                <RiLockPasswordLine className="w-4 h-4 text-[#1d5be3]" />
                </div>
            </div>
            )}

          {/* Header */}
          {!isSuccess && (
            <div className="text-center mb-5">
                <h2 className="text-[20px] font-semibold text-[#2b2b2b] mb-2 mt-1">
                Buat Kata Sandi Baru
                </h2>

                <p className="text-[#a5a5a5] text-[12px] leading-[1.2]">
                Masukkan password baru Anda yang kuat
                <br />
                dan mudah Anda ingat
                </p>
            </div>
            )}

          {!isSuccess ? (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div>
                <label className="block text-[12px] font-semibold mb-2 text-[#2b2b2b]">
                    Kata Sandi Baru
                </label>

                <div className="self-stretch h-[40px] rounded-[8px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center px-[10px] gap-3">
                    <input
                    type="password"
                    placeholder="Masukan kata sandi baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="[border:none] [outline:none] bg-transparent text-[12px] flex-1"
                    required
                    />
                </div>
                </div>

                <div>
                <label className="block text-[12px] font-semibold mb-2 text-[#2b2b2b]">
                    Konfirmasi Kata Sandi
                </label>

                <div className="self-stretch h-[40px] rounded-[8px] border-foundation-grey-normal border-solid border-[1px] box-border flex items-center px-[10px] gap-3">
                    <input
                    type="password"
                    placeholder="Masukan ulang kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="[border:none] [outline:none] bg-transparent text-[12px] flex-1"
                    required
                    />
                </div>
                </div>

                <button
                type="submit"
                className="h-[42px] rounded-[8px] bg-[#1d5be3] hover:bg-[#174bc0] transition text-white text-[13px] font-semibold mt-2"
                >
                Atur Ulang Kata Sandi
                </button>
            </form>
            ) : (
            <>
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <img
                        src={SuccessIcon}
                        alt="success"
                        className="w-[72px] h-[72px] object-contain"
                    />
                </div>

                {/* Success Header */}
                <div className="text-center mb-7">
                <h2 className="text-[20px] font-semibold text-[#2b2b2b] mb-3">
                    Kata Sandi Berhasil di Atur Ulang
                </h2>

                <p className="text-[#777] text-[12px] leading-[1.3]">
                    Kata Sandi Anda telah berhasil diubah.
                    <br />
                    Silahkan login ulang dengan kata sandi baru
                    <br />
                    Anda.
                </p>
                </div>

                {/* Button */}
                <button
                type="button"
                onClick={() => navigate("/login")}
                className="h-[42px] w-full rounded-[8px] bg-[#1d5be3] hover:bg-[#174bc0] transition text-white text-[13px] font-semibold"
                >
                kembali ke Login
                </button>
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
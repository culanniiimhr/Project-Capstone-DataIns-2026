import { useState } from "react";
import { VscHubot } from "react-icons/vsc";
import { TbSend } from "react-icons/tb";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const prompts = [
    "Ringkasan Performa Perguruan Tinggi",
    "Bagaimana Tren Rata-rata IPK Bulan ini?",
    "Tren IPK 3 Semester Terakhir",
    "Performa Studi dengan Kelulusan Tertinggi",
  ];

  return (
    <>
      <style>
        {`
          @keyframes slideUpFade {
            from { opacity: 0; transform: translateY(12px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-chat-window {
            animation: slideUpFade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>
      <div className="fixed bottom-[30px] right-[31px] z-[9999] flex flex-col items-end">
        {/* Chat Window */}
        {isOpen && (
          <div className="animate-chat-window mb-4 flex w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#E2E8F0]">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#155EEF]">
                <VscHubot className="text-[26px] text-white" />
              </div>
              <div>
                <div className="text-[14.5px] font-bold text-[#1E293B]">CHATBOT AI</div>
                <div className="text-[13px] text-[#64748B]">Halo! Ada yang bisa dibantu?</div>
              </div>
            </div>

            {/* Prompts */}
            <div className="flex flex-col gap-2.5 px-4 pb-4">
              {prompts.map((text, idx) => (
                <button
                  key={idx}
                  className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#334155] transition-all hover:bg-[#F8FAFC] hover:border-[#94A3B8] hover:shadow-sm"
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 pt-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Tanyakan Sesuatu..."
                  className="w-full rounded-[10px] bg-[#E0EFFF] py-[14px] pl-4 pr-12 text-[13px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#93C5FD] transition-shadow"
                />
                <button className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-lg text-[#64748B] hover:text-[#155EEF] transition-colors">
                  <TbSend className="h-[18px] w-[18px] -translate-y-[1px]" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-[#155EEF] shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <VscHubot className="text-[28px] text-white" />
        </button>
      </div>
    </>
  );
}

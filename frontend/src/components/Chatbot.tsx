import { useState, useRef, useEffect } from "react";
import { VscHubot, VscClose } from "react-icons/vsc";
import { TbSend } from "react-icons/tb";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prompts = [
    "Ringkasan Performa Perguruan Tinggi",
    "Bagaimana Tren Rata-rata IPK Bulan ini?",
    "Tren IPK 3 Semester Terakhir",
    "Performa Studi dengan Kelulusan Tertinggi",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseOrBack = () => {
    if (messages.length > 0) {
      setMessages([]);
      setInput("");
      setIsTyping(false);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

<<<<<<< HEAD
  // 🚀 INTEGRASI FETCH N8N - FIX URL NGROK & BYPASS WARNING
  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
=======
  const handleSend = (text: string) => {
    if (!text.trim()) return;
>>>>>>> 1e0e680da448d42e6ee8aec6aef77397f9416ffa

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

<<<<<<< HEAD
    try {
      // ✅ JALUR UTAMA WAJIB TEMBAK NGROK LU, BUKAN LOCALHOST!
      const response = await fetch("https://michale-noninfluential-aracelis.ngrok-free.dev/webhook-test/fab7a9d3-d3b5-4cd0-8736-4a5f119fb806", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // 🔥 Supaya ngrok free gak nampilin halaman warning ke temen lu
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung ke n8n");
      }

      const data = await response.json();
      
      let aiReply = "Maaf, chatbot tidak memberikan respon.";

      if (data) {
        const targetData = Array.isArray(data) ? data[0] : data;

        if (typeof targetData === "string") {
          aiReply = targetData;
        } else if (targetData && typeof targetData === "object") {
          if (targetData.text && typeof targetData.text === "string") {
            aiReply = targetData.text;
          } else if (targetData.text && typeof targetData.text === "object") {
            aiReply = targetData.text.text || JSON.stringify(targetData.text);
          } else {
            const values = Object.values(targetData);
            const firstString = values.find(v => typeof v === "string");
            aiReply = firstString ? (firstString as string) : JSON.stringify(targetData);
          }
        }
      }

=======
    // Simulate AI response
    setTimeout(() => {
>>>>>>> 1e0e680da448d42e6ee8aec6aef77397f9416ffa
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
<<<<<<< HEAD
          content: String(aiReply) 
        },
      ]);
    } catch (error) {
      console.error("Error chatbot n8n:", error);
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "Maaf, koneksi ke AI terputus. Pastikan n8n lu aktif." 
        },
      ]);
    } finally {
      setIsTyping(false);
    }
=======
          content: "Ini adalah balasan simulasi lokal AI. Integrasi dengan N8N saat ini belum aktif, ini hanya tampilan sementara." 
        },
      ]);
      setIsTyping(false);
    }, 1000);
>>>>>>> 1e0e680da448d42e6ee8aec6aef77397f9416ffa
  };

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
          .imessage-user {
            position: relative;
            background-color: #155EEF;
            color: white;
            border-radius: 18px;
          }
          .imessage-user::before {
            content: "";
            position: absolute;
            z-index: 0;
            bottom: 0;
            right: -8px;
            height: 20px;
            width: 20px;
            background: #155EEF;
            border-bottom-left-radius: 15px;
          }
          .imessage-user::after {
            content: "";
            position: absolute;
            z-index: 1;
            bottom: 0;
            right: -10px;
            width: 10px;
            height: 20px;
            background: #F8FAFC;
            border-bottom-left-radius: 10px;
          }
          .imessage-assistant {
            position: relative;
            background-color: #E9E9EB;
            color: #1E293B;
            border-radius: 18px;
          }
          .imessage-assistant::before {
            content: "";
            position: absolute;
            z-index: 0;
            bottom: 0;
            left: -8px;
            height: 20px;
            width: 20px;
            background: #E9E9EB;
            border-bottom-right-radius: 15px;
          }
          .imessage-assistant::after {
            content: "";
            position: absolute;
            z-index: 1;
            bottom: 0;
            left: -10px;
            width: 10px;
            height: 20px;
            background: #F8FAFC;
            border-bottom-right-radius: 10px;
          }
        `}
      </style>
      <div className="fixed bottom-[30px] right-[31px] z-[9999] flex flex-col items-end">
        {/* Chat Window */}
        {isOpen && (
          <div className="animate-chat-window mb-4 flex w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#E2E8F0]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E2E8F0] shadow-sm z-10 relative bg-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#155EEF]">
                  <VscHubot className="text-[26px] text-white" />
                </div>
                <div>
                  <div className="text-[14.5px] font-bold text-[#1E293B]">CHATBOT AI</div>
                  <div className="text-[13px] text-[#64748B]">Halo! Ada yang bisa dibantu?</div>
                </div>
              </div>
              <button 
                onClick={handleCloseOrBack}
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                title={messages.length > 0 ? "Kembali ke Akses Cepat" : "Tutup"}
              >
                <VscClose className="text-[20px]" />
              </button>
            </div>

            {/* Chat Area */}
            <div className={`flex flex-col overflow-y-auto bg-[#F8FAFC] p-4 gap-3 relative transition-all duration-300 ${messages.length === 0 ? '' : 'h-[320px]'}`}>
              {messages.length === 0 ? (
                // Prompts
                <div className="flex flex-col gap-2.5">
                  {prompts.map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(text)}
                      className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#334155] transition-all hover:bg-[#F0F5FF] hover:text-[#155EEF] hover:border-[#93C5FD] hover:shadow-sm"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              ) : (
                // Message List
                <>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end pr-2" : "justify-start pl-2"}`}
                    >
                      <div
<<<<<<< HEAD
                        className={`max-w-[75%] px-3.5 py-2 text-[13.5px] leading-[1.4] shadow-sm whitespace-pre-wrap ${
=======
                        className={`max-w-[75%] px-3.5 py-2 text-[13.5px] leading-[1.4] shadow-sm ${
>>>>>>> 1e0e680da448d42e6ee8aec6aef77397f9416ffa
                          msg.role === "user"
                            ? "imessage-user"
                            : "imessage-assistant"
                        }`}
                      >
                        <span className="relative z-10">{msg.content}</span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start pl-2">
                      <div className="imessage-assistant shadow-sm px-4 py-2 flex gap-1.5 items-center min-h-[34px]">
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce relative z-10" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce relative z-10" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#94A3B8] rounded-full animate-bounce relative z-10" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-[#E2E8F0]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
<<<<<<< HEAD
                    if (e.key === "Enter" && input.trim() && !isTyping) {
                      handleSend(input);
                    }
=======
                    if (e.key === "Enter") handleSend(input);
>>>>>>> 1e0e680da448d42e6ee8aec6aef77397f9416ffa
                  }}
                  placeholder="Ketik pertanyaan..."
                  className="w-full rounded-[10px] bg-[#F1F5F9] py-[12px] pl-4 pr-12 text-[13px] text-[#334155] placeholder:text-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#155EEF] focus:bg-white transition-all border border-transparent focus:border-[#155EEF]"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-lg text-[#155EEF] hover:bg-[#E0EFFF] disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
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
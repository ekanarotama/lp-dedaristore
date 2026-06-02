import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search, HandCoins } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Hubungi Kami",
    desc: "Chat via WhatsApp, kirim detail iPhone-mu (atau lihat katalog kalau mau beli).",
    color: "#3BAFA0",
  },
  {
    n: "02",
    icon: Search,
    title: "Pengecekan & Grading",
    desc: "Kami cek kondisi unit secara jujur dan kasih harga adil sesuai grade.",
    color: "#E0A526",
  },
  {
    n: "03",
    icon: HandCoins,
    title: "Transaksi Aman",
    desc: "Deal harga, uang cair (penjual) atau unit sampai ke tangan (pembeli). Selesai.",
    color: "#1F3A5F",
  },
];

export function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      data-testid="how-section"
      className="relative bg-pearl-warm py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E0A526] uppercase mb-4">
            Cara Kerja
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Gampang, Cuma 3 Langkah.
          </h2>
          <p className="mt-4 text-base text-[#4A5568]">
            Dari chat pertama sampai transaksi selesai, semua jelas dan tanpa drama.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          {/* Connecting dashed line for desktop */}
          <svg
            aria-hidden
            className="hidden lg:block absolute top-12 left-[16%] right-[16%] w-[68%] h-2 pointer-events-none"
            viewBox="0 0 800 8"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="4"
              x2="800"
              y2="4"
              stroke="#E0A526"
              strokeWidth="2"
              strokeDasharray="6 8"
              opacity="0.5"
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  data-testid={`step-${s.n}`}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-gray-100 text-center hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div className="flex justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white relative"
                      style={{ background: s.color, boxShadow: `0 12px 24px -10px ${s.color}` }}
                    >
                      <Icon size={26} />
                      <span
                        className="absolute -top-2 -right-2 text-[10px] font-extrabold bg-white text-[#1F3A5F] rounded-full w-7 h-7 flex items-center justify-center shadow-md border border-gray-100"
                      >
                        {s.n}
                      </span>
                    </div>
                  </div>
                  <h3
                    className="mt-5 text-xl sm:text-2xl font-bold text-[#1F3A5F]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-[#4A5568] leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

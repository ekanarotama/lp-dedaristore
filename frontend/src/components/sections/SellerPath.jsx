import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, MessageCircle } from "lucide-react";
import { Calculator } from "@/components/sections/Calculator";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

const cards = [
  {
    id: "putus",
    icon: Zap,
    badge: "Cepat Cair",
    title: "Jual Putus",
    desc: "Butuh uang cepat? Kami beli langsung iPhone-mu. Uang cair di hari yang sama setelah pengecekan. Praktis, tanpa nunggu.",
    bullets: [
      "Cocok untuk yang butuh dana cepat",
      "Harga sedikit di bawah Titip Jual",
      "Langsung cair, hari yang sama",
    ],
    accent: "#E0A526",
    bg: "bg-white",
  },
  {
    id: "titip",
    icon: TrendingUp,
    badge: "Harga Maksimal",
    title: "Titip Jual",
    desc: "Mau harga paling tinggi? Titipkan iPhone-mu ke kami. Kami carikan pembeli dengan harga terbaik, kamu cukup tunggu. Komisi kecil, hasil maksimal.",
    bullets: [
      "Cocok untuk yang tidak buru-buru",
      "Harga tertinggi, komisi kecil",
      "Kami yang carikan pembeli",
    ],
    accent: "#3BAFA0",
    bg: "bg-white",
  },
];

export function SellerPath() {
  return (
    <section
      id="penjual"
      data-testid="seller-section"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E0A526] uppercase mb-4">
            Untuk Penjual
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Untuk Kamu yang Mau Jual iPhone
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5568]">
            Pilih cara yang paling cocok buat kamu:
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                data-testid={`seller-card-${c.id}`}
                className={`${c.bg} rounded-3xl p-7 sm:p-9 border border-gray-100 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(31,58,95,0.18)] transition-all duration-300 relative overflow-hidden group`}
              >
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ background: c.accent }}
                />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                    style={{ background: c.accent, boxShadow: `0 8px 20px -6px ${c.accent}80` }}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="mt-5 inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full"
                    style={{ background: `${c.accent}15`, color: c.accent }}>
                    {c.badge}
                  </div>
                  <h3
                    className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#1F3A5F]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[#4A5568] leading-relaxed">{c.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {c.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: c.accent }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 lg:mt-16">
          <Calculator />
        </div>

        <div className="mt-10 flex flex-col items-center">
          <a
            href={waLink(WA_MESSAGES.jualUmum)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="seller-consult-btn"
            className="inline-flex items-center justify-center gap-2 bg-[#1F3A5F] hover:bg-[#152842] text-white font-semibold rounded-full px-7 py-4 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle size={18} />
            Konsultasi & Jual Sekarang via WhatsApp
          </a>
          <p className="text-xs text-[#4A5568] mt-3">Respon cepat · Tanpa biaya konsultasi</p>
        </div>
      </div>
    </section>
  );
}

export default SellerPath;

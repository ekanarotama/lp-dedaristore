import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const left = [
  "Harga ditekan 50-60% dari pasaran",
  "Tidak ada transparansi grading",
  "Cepat tapi rugi besar",
  "Kamu tidak tahu unit dijual ke siapa",
];
const right = [
  "Harga adil 75-90% dari pasaran",
  "Sistem grading A/B/C/D transparan",
  "Tetap cepat & aman",
  "Pembeli juga terverifikasi",
];

export function Problem() {
  return (
    <section
      id="masalah"
      data-testid="problem-section"
      className="relative bg-[#F5F6F8] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#3BAFA0] uppercase mb-4">
            Kenapa Dedari Berbeda
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Jangan Jual iPhone-mu 50% di Bawah Harga.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#4A5568] leading-relaxed">
            Banyak penjual iPhone di Bali terpaksa melepas unitnya ke makelar atau toko dengan harga
            ditekan habis — kadang sampai setengah dari harga pasaran second. Padahal iPhone-mu masih
            sangat layak. Kami hadir sebagai jembatan yang adil: kamu dapat harga pantas, pembeli
            dapat unit terpercaya.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            data-testid="card-makelar"
            className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-red-100 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-red-50" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <XCircle size={14} /> Jual ke Makelar
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#1A1A1A]">
                Cepat, tapi rugi besar.
              </h3>
              <ul className="mt-6 space-y-3">
                {left.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[#4A5568]">
                    <XCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="card-dedari"
            className="bg-[#1F3A5F] text-white rounded-3xl p-7 sm:p-8 relative overflow-hidden shadow-xl"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#E0A526]/20 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-[#3BAFA0]/20 text-[#3BAFA0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#3BAFA0]/30">
                <CheckCircle2 size={14} /> Lewat Dedari Store
              </div>
              <h3 className="mt-5 text-2xl font-bold">Adil, transparan, & tetap cepat.</h3>
              <ul className="mt-6 space-y-3">
                {right.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/85">
                    <CheckCircle2 size={18} className="text-[#3BAFA0] mt-0.5 flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Problem;

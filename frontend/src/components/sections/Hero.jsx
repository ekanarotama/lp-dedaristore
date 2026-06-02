import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, BatteryFull, MapPin, ArrowDown } from "lucide-react";

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 lg:pb-32 overflow-hidden"
    >
      {/* Subtle Balinese ornament texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #1F3A5F 0%, transparent 40%), radial-gradient(circle at 80% 70%, #3BAFA0 0%, transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "radial-gradient(circle, #E0A526 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#3BAFA0]/10 border border-[#3BAFA0]/20 text-[#1F3A5F] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-7"
        >
          <span className="w-2 h-2 rounded-full bg-[#3BAFA0] animate-pulse" />
          Perantara iPhone Second Tepercaya di Bali
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-extrabold tracking-tight text-[#1F3A5F] text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-4xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Jual iPhone-mu di Harga yang{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Layak</span>
            <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-3 sm:h-4 bg-[#E0A526]/40 -z-0 -skew-x-3" />
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-[#4A5568] max-w-2xl leading-relaxed"
        >
          Stop dijual murah ke makelar. Di Dedari Store Bali, kamu bisa jual iPhone second-mu
          dengan harga <span className="font-semibold text-[#1F3A5F]">75%–90% dari pasaran</span>.
          Dan kalau kamu mau beli, semua unit sudah kami verifikasi keasliannya.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <button
            onClick={() => scrollTo("penjual")}
            data-testid="hero-cta-jual"
            className="group inline-flex items-center justify-center gap-2 bg-[#1F3A5F] hover:bg-[#152842] text-white font-semibold rounded-full px-7 py-4 text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Saya Mau Jual iPhone
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("pembeli")}
            data-testid="hero-cta-beli"
            className="group inline-flex items-center justify-center gap-2 bg-[#E0A526] hover:bg-[#C28E20] text-white font-semibold rounded-full px-7 py-4 text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Saya Mau Beli iPhone
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#4A5568]"
        >
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#3BAFA0]" />
            iPhone Terdaftar Resmi
          </span>
          <span className="inline-flex items-center gap-2">
            <BatteryFull size={18} className="text-[#3BAFA0]" />
            Battery Health Min 80%
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={18} className="text-[#3BAFA0]" />
            Area Sarbagita, Bali
          </span>
        </motion.div>

        {/* Decorative gold ornament line */}
        <div className="mt-16 lg:mt-20 flex items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E0A526]/40 to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0A526]" />
          <span className="h-px w-24 bg-[#E0A526]/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0A526]" />
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#E0A526]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

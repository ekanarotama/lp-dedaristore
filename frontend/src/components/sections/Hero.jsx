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
      className="relative pt-24 sm:pt-28 lg:pt-36 pb-16 lg:pb-28 overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* TEXT COLUMN */}
          <div className="lg:col-span-7 order-1 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#3BAFA0]/10 border border-[#3BAFA0]/20 text-[#1F3A5F] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#3BAFA0] animate-pulse" />
              Perantara iPhone Second Tepercaya di Bali
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="font-extrabold tracking-tight text-[#1F3A5F] text-[2.4rem] leading-[1.05] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] max-w-2xl"
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
              className="mt-5 sm:mt-6 text-base sm:text-lg text-[#4A5568] max-w-xl leading-relaxed"
            >
              Stop dijual murah ke makelar. Di Dedari Store Bali, kamu bisa jual iPhone second-mu
              dengan harga <span className="font-semibold text-[#1F3A5F]">75%–90% dari pasaran</span>.
              Dan kalau kamu mau beli, semua unit sudah kami verifikasi keasliannya.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
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
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#4A5568]"
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
          </div>

          {/* IMAGE COLUMN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 order-2 lg:order-2 relative max-w-md mx-auto lg:max-w-none w-full"
            data-testid="hero-image-wrap"
          >
            {/* Decorative glows behind image */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2.5rem] opacity-50 blur-2xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(224,165,38,0.25), transparent 60%), radial-gradient(circle at 70% 80%, rgba(59,175,160,0.25), transparent 60%)",
              }}
            />
            <div className="relative rounded-[1.75rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(31,58,95,0.35)] ring-1 ring-black/5 bg-[#0e1320]">
              <img
                src="/hero.png"
                alt="Jual Beli iPhone Resmi dan Original — Dedari Store Bali"
                className="w-full h-full object-cover block aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]"
                loading="eager"
                fetchpriority="high"
              />
              {/* Subtle gradient veil at bottom for premium feel */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(14,19,32,0.45), transparent)",
                }}
              />
            </div>

            {/* Floating badge — top right of image */}
            <motion.div
              initial={{ opacity: 0, y: 10, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="hidden sm:flex absolute -top-3 -right-3 lg:-top-4 lg:-right-4 items-center gap-2 bg-white rounded-2xl shadow-xl px-4 py-2.5 border border-gray-100"
            >
              <span className="w-2 h-2 rounded-full bg-[#3BAFA0] animate-pulse" />
              <span className="text-xs font-bold text-[#1F3A5F] uppercase tracking-wider">
                100% Original
              </span>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 10, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="hidden sm:block absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-[#1F3A5F] text-white rounded-2xl shadow-xl px-4 py-2.5"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#E0A526] font-bold">
                Harga Adil
              </p>
              <p className="text-sm font-bold">75–90% Pasaran</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative gold ornament line */}
        <div className="mt-14 lg:mt-20 flex items-center gap-3" aria-hidden>
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

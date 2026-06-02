import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Instagram, MapPin } from "lucide-react";
import config from "@/data/config.json";

export function Testimoni() {
  const items = config.testimoni || [];
  const [active, setActive] = useState(0);

  const goTo = (idx) => setActive(((idx % items.length) + items.length) % items.length);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  if (items.length === 0) return null;

  const current = items[active];

  return (
    <section
      id="testimoni"
      data-testid="testimoni-section"
      className="relative bg-ivory py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative glows */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 w-[450px] h-[450px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #E0A526 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.10] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3BAFA0 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E0A526] uppercase mb-4">
            Testimoni
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cerita Langsung dari Customer Bali.
          </h2>
          <p className="mt-4 text-base text-[#4A5568]">
            Lebih dari 200+ unit sudah berpindah tangan via Dedari Store. Ini cerita beberapa di antaranya.
          </p>
        </motion.div>

        {/* MAIN: featured testimoni (mobile-first carousel, desktop split) */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <motion.div
            key={`img-${current.id}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#E0A526]/15 to-[#3BAFA0]/15 rounded-[2rem] blur-xl pointer-events-none" />
              <div className="relative rounded-[1.5rem] overflow-hidden ring-1 ring-black/5 shadow-[0_25px_60px_-15px_rgba(31,58,95,0.25)] bg-[#111]">
                <img
                  src={current.foto}
                  alt={`Testimoni ${current.nama}`}
                  className="w-full h-auto block aspect-[9/16] object-cover"
                  loading="lazy"
                  data-testid={`testimoni-img-${current.id}`}
                />
                {/* Instagram-style sticker */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur rounded-full px-3 py-1 shadow-md">
                  <Instagram size={12} className="text-[#E1306C]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1F3A5F]">
                    IG Story
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote + meta */}
          <motion.div
            key={`txt-${current.id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <Quote size={48} className="text-[#E0A526]/40 mb-4" />

            <p
              className="text-xl sm:text-2xl lg:text-[1.7rem] text-[#1A1A1A] leading-snug font-medium"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              data-testid={`testimoni-quote-${current.id}`}
            >
              "{current.quote}"
            </p>

            <div className="mt-6 flex items-center gap-1">
              {Array.from({ length: current.rating || 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-[#E0A526] fill-[#E0A526]" />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1F3A5F] to-[#3BAFA0] text-white flex items-center justify-center font-extrabold text-sm">
                {current.inisial}
              </div>
              <div>
                <p className="font-bold text-[#1F3A5F]">{current.nama}</p>
                <p className="text-xs text-[#4A5568] flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#3BAFA0]" />
                  {current.lokasi} · {current.tanggal}
                </p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified · {current.model}
              </span>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                aria-label="Previous testimoni"
                data-testid="testimoni-prev"
                className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#1F3A5F] text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimoni"
                data-testid="testimoni-next"
                className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#1F3A5F] text-[#1F3A5F] hover:bg-[#1F3A5F] hover:text-white transition-colors flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>

              {/* Dots */}
              <div className="ml-4 flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Testimoni ${i + 1}`}
                    data-testid={`testimoni-dot-${i}`}
                    className={`h-2 rounded-full transition-all ${
                      i === active ? "w-8 bg-[#1F3A5F]" : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <span className="ml-auto text-xs text-[#4A5568] font-semibold tracking-wider hidden sm:inline">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </div>

        {/* THUMB STRIP - quick navigation */}
        <div className="mt-12 lg:mt-16 grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => goTo(i)}
              data-testid={`testimoni-thumb-${it.id}`}
              className={`relative rounded-xl overflow-hidden aspect-[9/16] group transition-all ${
                i === active
                  ? "ring-2 ring-[#E0A526] shadow-lg scale-[1.02]"
                  : "ring-1 ring-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={it.foto}
                alt={`Testimoni ${it.nama}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                <p className="text-[10px] sm:text-xs font-bold text-white leading-tight">
                  {it.nama}
                </p>
                <p className="text-[9px] text-white/75 hidden sm:block">{it.model}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimoni;

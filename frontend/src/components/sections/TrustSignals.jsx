import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck, Scale, BatteryFull, MapPin, Tag, MessageCircle,
} from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "Cuma iPhone Terdaftar", desc: "Tidak ada unit abal-abal atau IMEI bermasalah." },
  { icon: Scale, title: "Harga Adil & Transparan", desc: "75–90% pasaran untuk penjual, bukan harga makelar." },
  { icon: BatteryFull, title: "Battery Health Terjamin", desc: "Minimal 80%, dicek di depan kamu." },
  { icon: MapPin, title: "Lokal Bali (Sarbagita)", desc: "Bisa COD di Denpasar, Badung, Gianyar, Tabanan." },
  { icon: Tag, title: "Grading Jujur", desc: "Kamu tahu persis kondisi unit sebelum deal." },
  { icon: MessageCircle, title: "Respon Cepat", desc: "Langsung via WhatsApp, no ribet, no bot." },
];

export function TrustSignals() {
  return (
    <section data-testid="trust-section" className="relative bg-ivory py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#3BAFA0] uppercase mb-4">
            Kenapa Dedari Store
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Kenapa Pilih Dedari Store Bali?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5568]">
            Enam alasan kenapa ratusan orang Bali memilih kami untuk transaksi iPhone-nya.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                data-testid={`trust-${i}`}
                className="bg-[#F5F6F8] rounded-3xl p-6 sm:p-7 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(31,58,95,0.15)] transition-all border border-transparent hover:border-gray-100 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-[#3BAFA0] group-hover:bg-[#3BAFA0] group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3
                  className="mt-5 text-lg sm:text-xl font-bold text-[#1F3A5F]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {it.title}
                </h3>
                <p className="mt-2 text-sm text-[#4A5568] leading-relaxed">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustSignals;

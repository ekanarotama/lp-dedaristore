import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

const GRADES = [
  {
    grade: "A",
    title: "Like New",
    color: "#3BAFA0",
    fisik: "Mulus, tanpa lecet/dent",
    battery: "≥ 90%",
    riwayat: "Original, belum pernah service",
    kelengkapan: "Fullset (box + charger)",
  },
  {
    grade: "B",
    title: "Very Good",
    color: "#E0A526",
    fisik: "Lecet halus tipis, tanpa penyok",
    battery: "≥ 85%",
    riwayat: "Belum pernah ganti part inti",
    kelengkapan: "Box ada, charger opsional",
  },
  {
    grade: "C",
    title: "Good",
    color: "#D97706",
    fisik: "Lecet wajar, dent kecil",
    battery: "≥ 80%",
    riwayat: "Pernah service ringan resmi",
    kelengkapan: "Sebagian / unit only",
  },
  {
    grade: "D",
    title: "Functional",
    color: "#6B7280",
    fisik: "Lecet/penyok terlihat, retak minor",
    battery: "≥ 80% (wajib)",
    riwayat: "Pernah ganti part",
    kelengkapan: "Unit only",
  },
];

export function Grading() {
  return (
    <section id="grading" data-testid="grading-section" className="relative bg-light-glow py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#3BAFA0] uppercase mb-4">
            Sistem Grading
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Sistem Grade yang Transparan.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5568] leading-relaxed">
            Setiap iPhone kami beri grade berdasarkan kondisi nyata. Jadi kamu tahu persis apa yang
            kamu beli — atau seberapa layak iPhone-mu untuk dijual.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GRADES.map((g, i) => (
            <motion.div
              key={g.grade}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-testid={`grade-card-${g.grade}`}
              className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(31,58,95,0.15)] transition-all hover:-translate-y-1 relative overflow-hidden group"
            >
              <span
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
                style={{ background: g.color }}
              />
              <div className="flex items-center justify-between">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl"
                  style={{ background: g.color, boxShadow: `0 12px 24px -10px ${g.color}` }}
                >
                  {g.grade}
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ background: `${g.color}15`, color: g.color }}
                >
                  {g.title}
                </span>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Fisik" value={g.fisik} />
                <Row label="Battery" value={g.battery} highlight color={g.color} />
                <Row label="Riwayat" value={g.riwayat} />
                <Row label="Kelengkapan" value={g.kelengkapan} />
              </dl>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 rounded-2xl bg-[#E0A526]/8 border border-[#E0A526]/30 px-5 py-4 flex items-start gap-3"
          style={{ background: "rgba(224,165,38,0.08)" }}
        >
          <ShieldAlert className="text-[#E0A526] flex-shrink-0 mt-0.5" size={20} />
          <p className="text-sm sm:text-base text-[#1F3A5F]">
            <span className="font-bold">Syarat wajib semua unit:</span> terdaftar resmi atau inter
            bercukai/IMEI terdaftar, dan battery health minimal 80%. Unit di bawah standar ini tidak
            kami terima — demi keamanan kamu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value, highlight, color }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-[#4A5568]">{label}</dt>
      <dd
        className="text-[#1A1A1A] mt-0.5"
        style={highlight ? { color, fontWeight: 600 } : {}}
      >
        {value}
      </dd>
    </div>
  );
}

export default Grading;

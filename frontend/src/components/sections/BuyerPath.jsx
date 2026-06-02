import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, BatteryMedium, ShieldCheck, Smartphone, HardDrive, Palette } from "lucide-react";
import config from "@/data/config.json";
import { waKatalog, formatRupiah } from "@/lib/whatsapp";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const GRADE_STYLES = {
  A: { bg: "bg-[#3BAFA0]/12", text: "text-[#2E8B7F]", border: "border-[#3BAFA0]/30", dot: "#3BAFA0" },
  B: { bg: "bg-[#E0A526]/12", text: "text-[#A87913]", border: "border-[#E0A526]/30", dot: "#E0A526" },
  C: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", dot: "#EA580C" },
  D: { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200", dot: "#6B7280" },
};

const HARGA_RANGES = [
  { label: "Semua harga", value: "all" },
  { label: "< Rp 5 juta", value: "lt5", max: 5_000_000 },
  { label: "Rp 5 - 8 juta", value: "5to8", min: 5_000_000, max: 8_000_000 },
  { label: "Rp 8 - 12 juta", value: "8to12", min: 8_000_000, max: 12_000_000 },
  { label: "> Rp 12 juta", value: "gt12", min: 12_000_000 },
];

export function BuyerPath() {
  const [filterModel, setFilterModel] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterHarga, setFilterHarga] = useState("all");

  // Only show available stock (ready stock)
  const readyStock = useMemo(
    () => config.katalog.filter((u) => u.status === "tersedia"),
    []
  );

  const allModels = useMemo(
    () => Array.from(new Set(readyStock.map((x) => x.model))),
    [readyStock]
  );

  const items = useMemo(() => {
    return readyStock.filter((u) => {
      if (filterModel !== "all" && u.model !== filterModel) return false;
      if (filterGrade !== "all" && u.grade !== filterGrade) return false;
      if (filterHarga !== "all") {
        const r = HARGA_RANGES.find((x) => x.value === filterHarga);
        if (r?.min && u.harga < r.min) return false;
        if (r?.max && u.harga >= r.max) return false;
      }
      return true;
    });
  }, [readyStock, filterModel, filterGrade, filterHarga]);

  return (
    <section
      id="pembeli"
      data-testid="buyer-section"
      className="relative bg-pearl-cool py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#3BAFA0] uppercase mb-4">
            Ready Stock · Untuk Pembeli
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            iPhone Second Terverifikasi, Siap Pakai.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5568] leading-relaxed">
            Semua unit sudah kami cek: terdaftar resmi (ex-iBox/Blibli/Digimap) atau inter bercukai
            & IMEI terdaftar, battery health minimal 80%, dan punya grade kondisi yang jelas.
            <span className="block mt-2 text-sm text-[#4A5568]/80 italic">
              Mau lihat foto unit & detail lengkap? Tanya admin via WhatsApp — kami kirim
              langsung ke chat.
            </span>
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center"
        >
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F3A5F] sm:mr-2">
            Filter
          </span>
          <FilterSelect
            value={filterModel}
            onChange={setFilterModel}
            placeholder="Semua model"
            testId="filter-model"
            options={[{ label: "Semua model", value: "all" }, ...allModels.map((m) => ({ label: m, value: m }))]}
          />
          <FilterSelect
            value={filterGrade}
            onChange={setFilterGrade}
            placeholder="Semua grade"
            testId="filter-grade"
            options={[
              { label: "Semua grade", value: "all" },
              { label: "Grade A", value: "A" },
              { label: "Grade B", value: "B" },
              { label: "Grade C", value: "C" },
              { label: "Grade D", value: "D" },
            ]}
          />
          <FilterSelect
            value={filterHarga}
            onChange={setFilterHarga}
            placeholder="Semua harga"
            testId="filter-harga"
            options={HARGA_RANGES.map((r) => ({ label: r.label, value: r.value }))}
          />
          <div className="sm:ml-auto text-xs sm:text-sm text-[#4A5568]" data-testid="catalog-count">
            <span className="font-bold text-[#1F3A5F]">{items.length}</span> unit ready stock
          </div>
        </motion.div>

        {/* Stock list */}
        <div className="mt-7 flex flex-col gap-4">
          {items.map((u, i) => (
            <StockRow key={u.id} unit={u} index={i} />
          ))}
          {items.length === 0 && (
            <div className="text-center py-14 text-[#4A5568] bg-white/60 rounded-2xl border border-gray-100" data-testid="catalog-empty">
              Belum ada unit yang cocok dengan filter ini. Coba ubah filter atau tanya stok terbaru via WhatsApp.
            </div>
          )}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 text-center text-sm text-[#4A5568] italic"
        >
          Stok update real-time. Untuk foto, video kondisi unit, dan info garansi — chat admin
          langsung via WhatsApp.
        </motion.p>
      </div>
    </section>
  );
}

function FilterSelect({ value, onChange, placeholder, options, testId }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        data-testid={testId}
        className="h-11 min-w-[160px] rounded-xl border-gray-200 bg-white text-sm"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function StockRow({ unit, index }) {
  const g = GRADE_STYLES[unit.grade] || GRADE_STYLES.D;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      data-testid={`product-card-${unit.id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(31,58,95,0.04)] hover:shadow-[0_18px_40px_-15px_rgba(31,58,95,0.18)] hover:-translate-y-0.5 transition-all overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5 md:gap-6 p-5 sm:p-6 md:items-center">
        {/* Left: model + specs */}
        <div className="flex flex-col gap-3">
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {unit.model}{" "}
              <span className="font-semibold text-[#4A5568]">{unit.kapasitas}</span>
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${g.bg} ${g.text} ${g.border}`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: g.dot }} />
              Grade {unit.grade}
            </span>
            <span className="inline-flex items-center text-[10px] font-semibold bg-[#1F3A5F]/8 text-[#1F3A5F] px-2 py-1 rounded-full border border-[#1F3A5F]/15">
              {unit.asal}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Ready Stock
            </span>
          </div>

          {/* Spec grid */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#4A5568]">
            <SpecItem icon={<Palette size={14} className="text-[#3BAFA0]" />} label="Warna" value={unit.warna} />
            <SpecItem icon={<HardDrive size={14} className="text-[#3BAFA0]" />} label="Kapasitas" value={unit.kapasitas} />
            <SpecItem
              icon={<BatteryMedium size={14} className="text-[#3BAFA0]" />}
              label="Battery"
              value={`${unit.batteryHealth}%`}
            />
            <SpecItem icon={<ShieldCheck size={14} className="text-[#3BAFA0]" />} label="Status" value="Verified" />
          </div>

          {unit.highlight && (
            <p className="text-xs sm:text-sm text-[#4A5568] italic">"{unit.highlight}"</p>
          )}
        </div>

        {/* Right: price + CTA */}
        <div className="flex flex-col items-start md:items-end gap-3 md:min-w-[240px] md:border-l md:border-gray-100 md:pl-6">
          <div className="md:text-right">
            <p className="text-[10px] uppercase tracking-wider text-[#4A5568] font-semibold">Harga</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#1F3A5F]">
              {formatRupiah(unit.harga)}
            </p>
          </div>
          <a
            href={waKatalog(unit)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`product-wa-btn-${unit.id}`}
            className="inline-flex items-center justify-center gap-2 bg-[#1F3A5F] text-white hover:bg-[#152842] font-semibold rounded-full px-5 py-2.5 text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 w-full md:w-auto"
          >
            <MessageCircle size={15} />
            Tanya Detail Admin
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function SpecItem({ icon, label, value }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span className="text-[11px] uppercase tracking-wider text-[#4A5568]/70 font-semibold">{label}:</span>
      <span className="text-[#1A1A1A] font-medium">{value}</span>
    </span>
  );
}

export default BuyerPath;

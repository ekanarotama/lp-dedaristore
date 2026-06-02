import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, BatteryMedium, ShieldCheck, ImageOff } from "lucide-react";
import config from "@/data/config.json";
import { waKatalog, formatRupiah } from "@/lib/whatsapp";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const GRADE_STYLES = {
  A: "bg-[#3BAFA0]/12 text-[#2E8B7F] border-[#3BAFA0]/30",
  B: "bg-[#E0A526]/12 text-[#A87913] border-[#E0A526]/30",
  C: "bg-orange-100 text-orange-700 border-orange-200",
  D: "bg-gray-100 text-gray-700 border-gray-200",
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

  const allModels = useMemo(
    () => Array.from(new Set(config.katalog.map((x) => x.model))),
    []
  );

  const items = useMemo(() => {
    return config.katalog.filter((u) => {
      if (filterModel !== "all" && u.model !== filterModel) return false;
      if (filterGrade !== "all" && u.grade !== filterGrade) return false;
      if (filterHarga !== "all") {
        const r = HARGA_RANGES.find((x) => x.value === filterHarga);
        if (r?.min && u.harga < r.min) return false;
        if (r?.max && u.harga >= r.max) return false;
      }
      return true;
    });
  }, [filterModel, filterGrade, filterHarga]);

  return (
    <section
      id="pembeli"
      data-testid="buyer-section"
      className="relative bg-[#F5F6F8] py-20 lg:py-28"
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
            Untuk Pembeli
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            iPhone Second Terverifikasi, Siap Pakai.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A5568] leading-relaxed">
            Semua iPhone di Dedari Store sudah kami cek: terdaftar resmi (ex-iBox/Blibli/Digimap) atau
            inter yang sudah bercukai & IMEI terdaftar, battery health minimal 80%, dan punya grade
            kondisi yang jelas. Tidak ada kejutan.
          </p>
        </motion.div>

        {/* Filter bar */}
        <div className="mt-10 bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
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
            {items.length} unit ditampilkan
          </div>
        </div>

        {/* Grid */}
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((u, i) => (
            <ProductCard key={u.id} unit={u} index={i} />
          ))}
          {items.length === 0 && (
            <div className="col-span-full text-center py-14 text-[#4A5568]" data-testid="catalog-empty">
              Belum ada unit yang cocok dengan filter ini. Coba ubah filter.
            </div>
          )}
        </div>
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

function ProductCard({ unit, index }) {
  const terjual = unit.status === "terjual";
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      data-testid={`product-card-${unit.id}`}
      className={`group bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-3 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,58,95,0.18)] ${
        terjual ? "opacity-70" : ""
      }`}
    >
      <div className="relative aspect-square rounded-xl bg-gradient-to-br from-[#F5F6F8] to-[#E8EBF0] overflow-hidden">
        {!imgErr ? (
          <img
            src={unit.foto}
            alt={`${unit.model} ${unit.kapasitas} ${unit.warna}`}
            loading="lazy"
            onError={() => setImgErr(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              terjual ? "" : "group-hover:scale-105"
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#4A5568]/60">
            <ImageOff size={32} />
            <span className="text-xs mt-2">Foto unit</span>
          </div>
        )}
        {terjual && (
          <div className="absolute inset-0 bg-[#1F3A5F]/70 flex items-center justify-center">
            <span className="bg-white text-[#1F3A5F] font-extrabold text-sm tracking-[0.25em] px-4 py-2 rounded-full uppercase">
              Terjual
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={`inline-flex items-center text-[10px] sm:text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${GRADE_STYLES[unit.grade] || GRADE_STYLES.D}`}
          >
            Grade {unit.grade}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center text-[10px] font-semibold bg-white/95 backdrop-blur text-[#1F3A5F] px-2 py-1 rounded-full border border-gray-100 shadow-sm">
            {unit.asal}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="font-bold text-[#1F3A5F] leading-tight">
          {unit.model} <span className="font-medium text-[#4A5568]">{unit.kapasitas}</span>
        </h3>
        <p className="text-xs text-[#4A5568] mt-0.5">Warna {unit.warna}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-[#4A5568]">
          <span className="inline-flex items-center gap-1.5">
            <BatteryMedium size={14} className="text-[#3BAFA0]" />
            BH {unit.batteryHealth}%
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-[#3BAFA0]" />
            Verified
          </span>
        </div>

        {unit.highlight && (
          <p className="mt-3 text-xs text-[#4A5568] italic line-clamp-2">"{unit.highlight}"</p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#4A5568] font-semibold">Harga</p>
            <p className="text-xl font-extrabold text-[#1F3A5F]">{formatRupiah(unit.harga)}</p>
          </div>
        </div>

        <a
          href={terjual ? "#" : waKatalog(unit)}
          target={terjual ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-disabled={terjual}
          onClick={(e) => terjual && e.preventDefault()}
          data-testid={`product-wa-btn-${unit.id}`}
          className={`mt-4 inline-flex items-center justify-center gap-2 font-semibold rounded-full px-4 py-2.5 text-sm transition-all ${
            terjual
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#1F3A5F] text-white hover:bg-[#152842] shadow-sm hover:shadow-md"
          }`}
        >
          <MessageCircle size={15} />
          {terjual ? "Sudah Terjual" : "Tanya Unit Ini"}
        </a>
      </div>
    </motion.div>
  );
}

export default BuyerPath;

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator as CalcIcon, MessageCircle, AlertTriangle, Sparkles } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hitungEstimasi, getModelList, getKapasitasList } from "@/lib/pricing";
import { waCalculator, formatRupiah } from "@/lib/whatsapp";

const KONDISI_OPTS = ["Mulus", "Lecet Halus", "Lecet Wajar", "Lecet & Dent"];
const RIWAYAT_OPTS = ["Original", "Service Ringan Resmi", "Pernah Ganti Part"];
const KELENGKAPAN_OPTS = ["Fullset", "Box saja", "Unit only"];

export function Calculator() {
  const models = getModelList();
  const [model, setModel] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [bh, setBh] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [kelengkapan, setKelengkapan] = useState("");

  const kapasitasOpts = getKapasitasList(model);

  const result = useMemo(() => {
    const bhNum = Number(bh);
    if (!model || !kapasitas || !bh || !kondisi || !riwayat || !kelengkapan) return null;
    if (isNaN(bhNum) || bhNum <= 0) return null;
    return hitungEstimasi({
      model, kapasitas, batteryHealth: bhNum, kondisi, riwayat, kelengkapan,
    });
  }, [model, kapasitas, bh, kondisi, riwayat, kelengkapan]);

  const onWa = () => {
    if (!result || result.ditolak) return;
    const url = waCalculator({
      model, kapasitas, bh,
      kondisi, kelengkapan,
      estimasiTitip: formatRupiah(result.titipJual),
      estimasiPutus: formatRupiah(result.jualPutus),
    });
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      data-testid="calculator-card"
      className="relative bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-[0_20px_60px_-20px_rgba(31,58,95,0.18)] overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#E0A526]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#3BAFA0]/10 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-2xl bg-[#1F3A5F] text-white flex items-center justify-center shadow-lg">
            <CalcIcon size={20} />
          </div>
          <div>
            <h3
              className="text-2xl sm:text-3xl font-extrabold text-[#1F3A5F] tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Kalkulator Estimasi Harga
            </h3>
            <p className="text-sm text-[#4A5568] mt-0.5">Isi 6 langkah singkat. Gratis & tanpa daftar.</p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="1. Model iPhone">
            <Select value={model} onValueChange={(v) => { setModel(v); setKapasitas(""); }}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white" data-testid="calc-model">
                <SelectValue placeholder="Pilih model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m} value={m} data-testid={`calc-model-opt-${m}`}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="2. Kapasitas">
            <Select value={kapasitas} onValueChange={setKapasitas} disabled={!model}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white" data-testid="calc-kapasitas">
                <SelectValue placeholder={model ? "Pilih kapasitas" : "Pilih model dulu"} />
              </SelectTrigger>
              <SelectContent>
                {kapasitasOpts.map((k) => (
                  <SelectItem key={k} value={k} data-testid={`calc-kapasitas-opt-${k}`}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="3. Battery Health (%)">
            <Input
              type="number"
              min={1}
              max={100}
              placeholder="Contoh: 88"
              value={bh}
              onChange={(e) => setBh(e.target.value)}
              data-testid="calc-bh"
              className="h-12 rounded-xl border-gray-200 bg-white"
            />
          </Field>

          <Field label="4. Kondisi Fisik">
            <Select value={kondisi} onValueChange={setKondisi}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white" data-testid="calc-kondisi">
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                {KONDISI_OPTS.map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="5. Riwayat Service">
            <Select value={riwayat} onValueChange={setRiwayat}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white" data-testid="calc-riwayat">
                <SelectValue placeholder="Pilih riwayat" />
              </SelectTrigger>
              <SelectContent>
                {RIWAYAT_OPTS.map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="6. Kelengkapan">
            <Select value={kelengkapan} onValueChange={setKelengkapan}>
              <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white" data-testid="calc-kelengkapan">
                <SelectValue placeholder="Pilih kelengkapan" />
              </SelectTrigger>
              <SelectContent>
                {KELENGKAPAN_OPTS.map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Result */}
        <div className="mt-7" data-testid="calc-result">
          {!result && (
            <div className="bg-[#F5F6F8] rounded-2xl p-6 text-center text-[#4A5568] text-sm">
              Lengkapi semua kolom di atas untuk melihat estimasi harga.
            </div>
          )}

          {result?.ditolak && (
            <div data-testid="calc-rejected" className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-3">
              <AlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="font-semibold text-red-700">Maaf, belum bisa kami terima.</p>
                <p className="text-red-600/80 mt-1">
                  Battery Health di bawah 80% tidak memenuhi standar kami. Demi kualitas dan kepercayaan
                  pembeli, kami hanya menerima unit dengan battery health minimal 80%.
                </p>
              </div>
            </div>
          )}

          {result && !result.ditolak && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="bg-gradient-to-br from-[#F5F6F8] to-white border border-gray-100 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A5568]">
                  <Sparkles size={14} className="text-[#3BAFA0]" /> Jual Putus
                </div>
                <p className="mt-2 text-3xl font-extrabold text-[#1F3A5F]" data-testid="calc-result-putus">
                  {formatRupiah(result.jualPutus)}
                </p>
                <p className="mt-1 text-xs text-[#4A5568]">Cepat cair · hari yang sama</p>
              </div>
              <div className="bg-[#1F3A5F] text-white rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#E0A526]/20 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E0A526]">
                    <Sparkles size={14} /> Titip Jual (Maksimal)
                  </div>
                  <p className="mt-2 text-3xl font-extrabold" data-testid="calc-result-titip">
                    {formatRupiah(result.titipJual)}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    Grade {result.grade} · harga tertinggi
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {result && !result.ditolak && (
            <>
              <p className="text-xs text-[#4A5568] italic mt-4">
                Ini estimasi awal. Harga final ditentukan setelah pengecekan fisik unit. Hubungi kami via
                WhatsApp untuk penawaran pasti.
              </p>
              <button
                onClick={onWa}
                data-testid="calc-wa-btn"
                className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E0A526] hover:bg-[#C28E20] text-white font-semibold rounded-full px-7 py-4 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Lanjut via WhatsApp
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <Label className="text-sm font-semibold text-[#1F3A5F] mb-2 block">{label}</Label>
      {children}
    </div>
  );
}

export default Calculator;

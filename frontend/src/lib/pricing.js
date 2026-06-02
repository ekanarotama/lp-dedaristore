import config from "@/data/config.json";

/**
 * Tentukan grade otomatis berdasarkan kombinasi input.
 * Logika sederhana, transparan, mudah diubah.
 */
export function tentukanGrade({ batteryHealth, kondisi, riwayat, kelengkapan }) {
  if (batteryHealth < 80) return null; // ditolak

  // skor awal
  let skor = 0;

  // battery
  if (batteryHealth >= 90) skor += 3;
  else if (batteryHealth >= 85) skor += 2;
  else if (batteryHealth >= 80) skor += 1;

  // kondisi fisik
  if (kondisi === "Mulus") skor += 3;
  else if (kondisi === "Lecet Halus") skor += 2;
  else if (kondisi === "Lecet Wajar") skor += 1;
  else if (kondisi === "Lecet & Dent") skor += 0;

  // riwayat
  if (riwayat === "Original") skor += 2;
  else if (riwayat === "Service Ringan Resmi") skor += 1;
  else skor += 0;

  // kelengkapan
  if (kelengkapan === "Fullset") skor += 2;
  else if (kelengkapan === "Box saja") skor += 1;
  else skor += 0;

  // total maksimum: 10. Mapping:
  if (skor >= 9) return "A";
  if (skor >= 7) return "B";
  if (skor >= 5) return "C";
  return "D";
}

export function hitungEstimasi({ model, kapasitas, batteryHealth, kondisi, riwayat, kelengkapan }) {
  if (!model || !kapasitas) return null;

  const pasaran = config.hargaPasaran?.[model]?.[kapasitas];
  if (!pasaran) return null;

  if (batteryHealth < 80) {
    return { ditolak: true };
  }

  const grade = tentukanGrade({ batteryHealth, kondisi, riwayat, kelengkapan });
  if (!grade) return { ditolak: true };

  const multTitip = config.multiplierTitipJual[grade];
  const titipJual = Math.round((pasaran * multTitip) / 50000) * 50000; // round to 50rb
  const jualPutus = Math.round((titipJual * (1 - config.potonganJualPutus)) / 50000) * 50000;

  return {
    ditolak: false,
    grade,
    pasaran,
    titipJual,
    jualPutus,
  };
}

export function getModelList() {
  return Object.keys(config.hargaPasaran);
}

export function getKapasitasList(model) {
  if (!model || !config.hargaPasaran[model]) return [];
  return Object.keys(config.hargaPasaran[model]);
}

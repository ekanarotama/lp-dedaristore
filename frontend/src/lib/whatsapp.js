import config from "@/data/config.json";

const WA_NUMBER = config.kontak.whatsapp;

/**
 * Build a WhatsApp wa.me URL with pre-filled message.
 * @param {string} message - plain message (will be URL-encoded)
 */
export function waLink(message = "Halo Dedari Store, saya mau tanya-tanya.") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

export const WA_MESSAGES = {
  general: "Halo Dedari Store, saya mau tanya-tanya.",
  jualUmum: "Halo Dedari Store, saya mau jual iPhone saya. Boleh info lebih lanjut?",
  beliUmum: "Halo Dedari Store, saya mau tanya soal iPhone yang tersedia.",
};

export function waCalculator({ model, kapasitas, bh, kondisi, kelengkapan, estimasiTitip, estimasiPutus }) {
  const msg =
    `Halo Dedari Store, saya mau jual iPhone saya:\n` +
    `• Model: ${model}\n` +
    `• Kapasitas: ${kapasitas}\n` +
    `• Battery Health: ${bh}%\n` +
    `• Kondisi: ${kondisi}\n` +
    `• Kelengkapan: ${kelengkapan}\n\n` +
    `Estimasi yang muncul:\n` +
    `- Titip Jual: ${estimasiTitip}\n` +
    `- Jual Putus: ${estimasiPutus}\n\n` +
    `Mohon penawaran pastinya. Terima kasih!`;
  return waLink(msg);
}

export function waKatalog(unit) {
  const msg =
    `Halo Dedari Store, saya tertarik dengan unit ini:\n` +
    `• ${unit.model} ${unit.kapasitas} ${unit.warna}\n` +
    `• Grade ${unit.grade} - ${unit.asal}\n` +
    `• Battery Health: ${unit.batteryHealth}%\n` +
    `• Harga: ${formatRupiah(unit.harga)}\n\n` +
    `Apakah masih tersedia?`;
  return waLink(msg);
}

export function formatRupiah(n) {
  if (typeof n !== "number" || isNaN(n)) return "Rp 0";
  return "Rp " + n.toLocaleString("id-ID");
}

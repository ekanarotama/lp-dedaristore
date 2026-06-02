import React from "react";
import { Instagram, MessageCircle, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import config from "@/data/config.json";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-testid="site-footer" className="relative bg-[#1F3A5F] text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(circle, #E0A526 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E0A526]/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          <div>
            <Logo size={48} light />
            <p className="mt-5 text-white/70 text-sm leading-relaxed max-w-xs">
              Perantara jual-beli iPhone second original & terdaftar resmi di Bali. Harga adil untuk
              penjual, unit terverifikasi untuk pembeli.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#E0A526]">Kontak</h3>
            <div className="mt-5 space-y-3">
              <a
                href={waLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-wa-link"
                className="flex items-center gap-3 text-white/85 hover:text-white transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <MessageCircle size={16} />
                </span>
                WhatsApp +{config.kontak.whatsapp}
              </a>
              <a
                href={config.kontak.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-ig-link"
                className="flex items-center gap-3 text-white/85 hover:text-white transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Instagram size={16} />
                </span>
                Instagram {config.kontak.instagramHandle}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#E0A526]">Info</h3>
            <div className="mt-5 space-y-3 text-sm text-white/85">
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} />
                </span>
                <div>
                  <p className="font-semibold">Area Layanan</p>
                  <p className="text-white/70 text-sm">{config.info.area}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} />
                </span>
                <div>
                  <p className="font-semibold">Jam Operasional</p>
                  <p className="text-white/70 text-sm">{config.info.jamOperasional}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {year} Dedari Store Bali. Semua hak dilindungi.</p>
          <p>Dibuat dengan ❤︎ di Bali</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

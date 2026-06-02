import React, { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { label: "Untuk Penjual", id: "penjual" },
  { label: "Untuk Pembeli", id: "pembeli" },
  { label: "Cara Kerja", id: "cara-kerja" },
  { label: "FAQ", id: "faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-100 shadow-[0_2px_20px_rgba(31,58,95,0.04)]"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex h-20 sm:h-28 items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="cursor-pointer" data-testid="logo-home-btn" aria-label="Beranda">
            <Logo size={52} />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((it) => (
              <button
                key={it.id}
                onClick={() => scrollTo(it.id)}
                data-testid={`nav-link-${it.id}`}
                className="text-sm font-medium text-[#1A1A1A]/80 hover:text-[#1F3A5F] transition-colors relative group"
              >
                {it.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E0A526] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="header-wa-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#E0A526] hover:bg-[#C28E20] text-white font-semibold text-sm rounded-full px-5 py-2.5 transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              Chat WhatsApp
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 text-[#1F3A5F]"
              aria-label="Menu"
              data-testid="mobile-menu-toggle"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-gray-100 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-2 bg-white">
          {NAV_ITEMS.map((it) => (
            <button
              key={it.id}
              onClick={() => scrollTo(it.id)}
              data-testid={`mobile-nav-${it.id}`}
              className="text-left px-3 py-3 rounded-xl text-[#1F3A5F] font-medium hover:bg-[#F5F6F8]"
            >
              {it.label}
            </button>
          ))}
          <a
            href={waLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mobile-header-wa-btn"
            className="mt-2 inline-flex items-center justify-center gap-2 bg-[#E0A526] text-white font-semibold rounded-full px-5 py-3"
          >
            <MessageCircle size={16} /> Chat WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

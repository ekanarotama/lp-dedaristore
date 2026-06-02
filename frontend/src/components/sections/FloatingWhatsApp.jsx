import React, { useEffect, useState } from "react";
import { waLink, WA_MESSAGES } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={waLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-wa-btn"
      aria-label="Chat WhatsApp"
      className={`fixed z-50 bottom-5 right-5 sm:right-6 sm:bottom-6 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 transition-transform">
        <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor" aria-hidden>
          <path d="M19.11 17.34c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.13-.61.13-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.13-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.32.4-.48.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.48-.07-.13-.61-1.46-.83-2-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.84.13.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.53-.08 1.6-.65 1.83-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.02 4.06c-6.62 0-12 5.38-12 12 0 2.11.55 4.16 1.6 5.96L4 28l6.16-1.61c1.74.95 3.7 1.45 5.7 1.45h.01c6.62 0 12-5.38 12-12s-5.39-12.01-11.85-12.01zm0 21.95c-1.77 0-3.5-.47-5.02-1.36l-.36-.21-3.65.96.98-3.56-.23-.37c-.97-1.54-1.48-3.32-1.48-5.16C6.26 10.99 10.7 6.56 16.02 6.56 21.34 6.56 25.78 10.99 25.78 16c0 5.41-4.44 10.01-9.76 10.01z" />
        </svg>
      </span>
    </a>
  );
}

export default FloatingWhatsApp;

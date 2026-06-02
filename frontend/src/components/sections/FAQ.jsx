import React from "react";
import { motion } from "framer-motion";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Apa bedanya Dedari Store dengan makelar?",
    a: "Kami kasih harga 75–90% dari pasaran second, transparan dengan sistem grading A/B/C/D yang jelas, dan tidak menekan harga seenaknya. Kamu tahu persis berapa nilai iPhone-mu.",
  },
  {
    q: "iPhone seperti apa yang diterima?",
    a: "iPhone yang terdaftar resmi (ex-iBox/Blibli/Digimap) atau inter yang sudah bercukai & IMEI-nya terdaftar di Kominfo, dengan battery health minimal 80%.",
  },
  {
    q: "Bagaimana kalau battery health di bawah 80%?",
    a: "Maaf, untuk menjaga kualitas dan kepercayaan pembeli, unit dengan battery health di bawah 80% belum bisa kami terima.",
  },
  {
    q: "Apa itu Jual Putus vs Titip Jual?",
    a: "Jual Putus = kami beli langsung iPhone-mu, uang cair di hari yang sama, harganya sedikit lebih rendah. Titip Jual = kami carikan pembeli, kamu dapat harga maksimal, tapi perlu sedikit menunggu.",
  },
  {
    q: "Apakah harga estimasi di kalkulator final?",
    a: "Belum. Itu perkiraan berdasarkan input kamu. Harga final ditentukan setelah pengecekan fisik unit di tempat. Tapi tenang, selisihnya biasanya kecil.",
  },
  {
    q: "Area mana saja yang dilayani?",
    a: "Sarbagita: Denpasar, Badung, Gianyar, dan Tabanan. Bisa COD di lokasi netral atau di tempat kami. Detail bisa diatur via WhatsApp.",
  },
  {
    q: "Apakah ada garansi untuk pembeli?",
    a: "Beberapa unit punya garansi resmi yang masih aktif. Untuk unit lain, kami berikan garansi toko terbatas. Hubungi kami via WhatsApp untuk info garansi tiap unit.",
  },
];

export function FAQ() {
  return (
    <section id="faq" data-testid="faq-section" className="bg-[#F5F6F8] py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E0A526] uppercase mb-4">
            FAQ
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F3A5F] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Pertanyaan yang Sering Diajukan.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 bg-white rounded-3xl p-3 sm:p-6 border border-gray-100"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b last:border-b-0 border-gray-100"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger
                  className="text-left text-base sm:text-lg font-semibold text-[#1F3A5F] py-5 px-3 sm:px-4 hover:no-underline hover:bg-[#F5F6F8]/60 rounded-xl"
                  data-testid={`faq-trigger-${i}`}
                >
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-4 pb-5 text-[#4A5568] leading-relaxed text-sm sm:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
